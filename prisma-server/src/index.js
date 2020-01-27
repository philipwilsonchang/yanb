const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    getAllFlexCategoriesBetweenTimes: (_, args, context, info) => {
      return context.prisma.query.flexCostCategories(
        {
          where: {
            costs_every: {
              createdAt_gte: args.timeStart,
              createdAt_lte: args.timeEnd,
            }
          },
          info,
        }
      )
    },
    getAllFixedCategories: (_, args, context, info) => {
      return context.prisma.query.fixedCostCategories()
    },
    getMonthlyIncomes: (_, args, context, info) => {
      return context.prisma.query.monthlyIncomes()
    }
  },
  Mutation: {
    createCost: (_, args, context, info) => {
      return context.prisma.mutation.createCost({
        data: args.newcost,
      })
    },
    createFixedCostCategory: (_, args, context, info) => {
      return context.prisma.mutation.createFixedCostCategory({
        data: args.cat,
      })
    },
    deleteFixedCostCategory: (_, args, context, info) => {
      return context.prisma.mutation.deleteFixedCategory(
        {
          where: {
            id: args.id,
          }
        }
      )
    },
    createFlexCostCategory: (_, args, context, info) => {
      return context.prisma.mutation.createFlexCostCategory(
        {
          data: args.cat,
        }
      )
    },
    deleteFlexCostCategory: (_, args, context, info) => {
      return context.prisma.mutation.deleteFlexCostCategory(
        {
          where: {
            id: args.id,
          }
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