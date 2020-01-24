import gql from 'graphql-tag'

export const GET_ALL_COSTS = gql`
  query {
    costs() {
      id
      amount
      description
      createdAt
      category {
        id
        name
        limit
      }
    }
  }
`;

export const GET_ALL_FLEX_CATEGORIES = gql`
  query {
    flexCostCategories() {
      id
      name
      limit
    }
  }
`;

export const GET_MONTHLY_INCOMES = gql`
  query {
    monthlyIncomes() {
      id
      amount
    }
  }
`;

