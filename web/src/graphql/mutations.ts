import gql from 'graphql-tag'

export const CREATE_COST = gql`
  mutation createCost($newcost: CostCreateInput!) {
    createCost(data: $newcost) {
      id
      amount
      description
      createdAt
      category {
        id
        name
        monthlyLimit
        type
      }
    }
  }
`;

export const DELETE_COST = gql`
  mutation deleteCost($id: ID!) {
    deleteCost(id: $id) {
      id
      amount
      description
      createdAt
    }
  }
`;

export const CREATE_COST_CATEGORY = gql`
  mutation createCostCategory($cat: CostCategoryCreateInput!) {
    createCostCategory(data: $cat) {
      id
      name
      monthlyLimit
      type
    }
  }
`;

export const DELETE_COST_CATEGORY = gql`
  mutation deleteCostCategory($id: ID!) {
    deleteCostCategory(id: $id) {
      id
      name
      monthlyLimit
      type
    }
  }
`;

export const UPSERT_MONTHLY_INCOME = gql`
  mutation upsertMonthlyIncome($newincome: MonthlyIncomeCreateInput!, $updateincome: MonthlyIncomeUpdateInput!, $id: ID!) {
    upsertMonthlyIncome(newincome: $newincome, updateincome: $updateincome, id: $id) {
      id
      amount
    }
  }
`;