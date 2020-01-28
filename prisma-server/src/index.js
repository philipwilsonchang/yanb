const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const monthDiff = (dateFrom, dateTo) => {
  const result = dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear())) + 1;
  return result;
}

const resolvers = {
  Query: {
    getAllFlexCategoriesBetweenTimes: async (_, args, context, info) => {
      const flexCategories = await context.prisma.query.costCategories({
        where: {
          type: "FLEX"
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
      return context.prisma.query.costCategories({
        where: {
          type: "FIXED"
        }
      })
    },
    getAllRollingCategoriesBetweenTimes: async (_, args, context, info) => {
      // todo: design totalLimit calculation
      const rollingCats = await context.prisma.query.costCategories({
        where: {
          type: "ROLLING"
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
            createdAt_lte: firstDay.toISOString()
          }
        });
        const timedCostsPerCategory = await context.prisma.query.costs({
          where: {
            category: {
              id: category.id,
            },
            createdAt_gte: args.timeStart,
            createdAt_lte: args.timeEnd,
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
    getMonthlyIncomes: (_, args, context, info) => {
      return context.prisma.query.monthlyIncomes()
    }
  },

  Mutation: {
    createCost: async (_, args, context, info) => {
      const newCost = await context.prisma.mutation.createCost({
        data: args.data,
        info,
      });
      const costCategory = await context.prisma.query.costCategory({
        where: {
          id: args.data.category.connect.id
        }
      });
      return { ...newCost, category: costCategory };
    },
    deleteCost: async (_, args, context, info) => {
      const deletedCost = await context.prisma.mutation.deleteCost({
        where: {
          id: args.id,
        },
        info,
      });
      return deletedCost;
    },
    createCostCategory: async (_, args, context, info) => {
      const createdCategory = await context.prisma.mutation.createCostCategory({
        data: args.data,
        info,
      });
      return createdCategory;
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
    upsertMonthlyIncome: (_, args, context, info) => {
      return context.prisma.mutation.upsertMonthlyIncome({
        where: {
          id: args.id,
        },
        create: args.newincome,
        update: args.updateincome,
        info,
      })
    },
  }
}

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