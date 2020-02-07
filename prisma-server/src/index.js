const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uuid = require('uuid/v4')

/* **** UTILS **** */
const APP_SECRET = uuid();

const getUserId = (context) => {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET)
    return userId
  }

  throw new Error('Not authenticated')
}

const monthDiff = (dateFrom, dateTo) => {
  const result = dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear())) + 1;
  return result;
}

/* **** RESOLVERS **** */
const resolvers = {
  Query: {
    getAllFlexCategoriesBetweenTimes: async (_, args, context, info) => {
      const userId = getUserId(context)
      const flexCategories = await context.prisma.query.costCategories({
        where: {
          type: "FLEX",
          user: { id: userId },
        }
      });
      const spentFlexCategories = flexCategories.map( async (category) => {
        const costsPerCategory = await context.prisma.query.costs({
          where: {
            category: {
              id: category.id,
            },
            createdAt_gte: args.timeStart,
            createdAt_lte: args.timeEnd,
            user: { id: userId },
          }
        });
        const totalSpent = costsPerCategory.reduce((acc, cost) => {
          return acc + cost.amount;
        }, 0);
        return { ...category, spent: totalSpent }
      })
      return spentFlexCategories
    },
    getAllFixedCategories: (_, args, context, info) => {
      const userId = getUserId(context)
      return context.prisma.query.costCategories({
        where: {
          type: "FIXED",
          user: { id: userId },
        }
      })
    },
    getAllRollingCategoriesBetweenTimes: async (_, args, context, info) => {
      const userId = getUserId(context)
      const rollingCats = await context.prisma.query.costCategories({
        where: {
          type: "ROLLING",
          user: { id: userId },
        }
      });

      const today = new Date();
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      
      const spentRollingCats = rollingCats.map( async (category) => {
        const costsPerCategoryBeforeThisMonth = await context.prisma.query.costs({
          where: {
            category: {
              id: category.id,
            },
            createdAt_lte: firstDay.toISOString(),
            user: { id: userId },
          }
        });
        const timedCostsPerCategory = await context.prisma.query.costs({
          where: {
            category: {
              id: category.id,
            },
            createdAt_gte: args.timeStart,
            createdAt_lte: args.timeEnd,
            user: { id: userId },
          }
        });
        const totalSpentBeforeThisMonth = costsPerCategoryBeforeThisMonth.reduce((acc, cost) => {
          return acc + cost.amount;
        }, 0);
        const timedSpent = timedCostsPerCategory.reduce((acc, cost) => {
          return acc + cost.amount;
        }, 0);
        const monthxLimit = monthDiff(new Date(category.createdAt), new Date()) * category.monthlyLimit;
        return { ...category, totalLimit: monthxLimit - totalSpentBeforeThisMonth, spent: timedSpent }
      })
      return spentRollingCats;
    },
    getMonthlyIncome: async (_, args, context, info) => {
      const userId = getUserId(context)
      const user = await context.prisma.query.user({
        where: {
          id: userId,
        }
      });
      return (user.monthlyIncome || 0);
    }
  },

  Mutation: {
    createCost: async (_, args, context, info) => {
      const userId = getUserId(context)
      const newCost = await context.prisma.mutation.createCost({
        data: {...args.data, user: { connect: { id: userId }}},
        info,
      });
      const costCategory = await context.prisma.query.costCategory({
        where: {
          id: args.data.category.connect.id
        }
      });
      return { ...newCost, category: costCategory, user: userId };
    },
    deleteCost: async (_, args, context, info) => {
      const costToDelete = await context.prisma.query.cost({
        where: {
          id: args.id
        }
      });
      const deletedCost = await context.prisma.mutation.deleteCost({
        where: {
          id: args.id,
        },
        info,
      });
      return deletedCost;
    },
    createCostCategory: async (_, args, context, info) => {
      const userId = getUserId(context)
      const createdCategory = await context.prisma.mutation.createCostCategory({
        data: {...args.data, user: { connect: { id: userId }}},
        info,
      });
      return {...createdCategory, user: userId};
    },
    deleteCostCategory: async (_, args, context, info) => {
      const deletedCategory = await context.prisma.mutation.deleteCostCategory({
        where: {
          id: args.id,
        },
        info,
      })
      return deletedCategory;
    },
    updateMonthlyIncome: async (_, args, context, info) => {
      const userId = getUserId(context)
      const updatedUser = await context.prisma.mutation.updateUser({
        where: {
          id: userId,
        },
        data: {
          monthlyIncome: args.newincome
        }
      });
      return updatedUser.monthlyIncome;
    },
    signup: async (_, args, context, info) => {
      const password = await bcrypt.hash(args.password, 10);
      const user = await context.prisma.mutation.createUser({
        data: { ...args, password }
      });
      const token = jwt.sign({ userId: user.id, role: "bearer" }, APP_SECRET, { expiresIn: "15m" });
      return {
        token,
        user,
      };
    },
    login: async (_, args, context, info) => {
      const user = await context.prisma.query.user({ 
        where: {
          email: args.email 
        }
      });
      if (!user) {
        throw new Error('Invalid username or password');
      }
      const valid = await bcrypt.compare(args.password, user.password);
      if (!valid) {
        throw new Error('Invalid username or password');
      }
      const token = jwt.sign({ userId: user.id, role: "bearer" }, APP_SECRET, { expiresIn: "15m" });
      return {
        token,
        user,
      };
    }
  }
}

/* **** SERVER **** */
const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466',
    }),
  }),
})
server.start(() => console.log(`GraphQL server is running on http://localhost:4000`))