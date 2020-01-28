const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    getAllFlexCategoriesBetweenTimes: async (_, args, context, info) => {
      const flexCategories = await context.prisma.query.flexCostCategories();
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
      return context.prisma.query.fixedCostCategories()
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
      const costCategory = await context.prisma.query.flexCostCategory({
        where: {
          id: args.data.category.connect.id
        }
      });
      return { ...newCost, category: costCategory };
    },
    createFixedCostCategory: (_, args, context, info) => {
      return context.prisma.mutation.createFixedCostCategory({
        data: args.data,
        info,
      })
    },
    deleteFixedCostCategory: (_, args, context, info) => {
      return context.prisma.mutation.deleteFixedCostCategory(
        {
          where: {
            id: args.id,
          },
          info,
        }
      )
    },
    createFlexCostCategory: (_, args, context, info) => {
      return context.prisma.mutation.createFlexCostCategory({
        data: args.data,
        info,
      })
    },
    deleteFlexCostCategory: (_, args, context, info) => {
      return context.prisma.mutation.deleteFlexCostCategory(
        {
          where: {
            id: args.id,
          },
          info,
        }
      )
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