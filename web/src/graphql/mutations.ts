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
        limit
      }
    }
  }
`;

export const CREATE_FIXED_CATEGORY = gql`
  mutation createFixedCostCategory($cat: FixedCostCategoryCreateInput!) {
    createFixedCostCategory(data: $cat) {
      id
      name
      amount
    }
  }
`;

export const DELETE_FIXED_CATEGORY = gql`
  mutation deleteFixedCostCategory($id: ID!) {
    deleteFixedCostCategory(id: $id) {
      id
      name
      amount
    }
  }
`;

export const CREATE_FLEX_CATEGORY = gql`
  mutation createFlexCostCategory($cat: FlexCostCategoryCreateInput!) {
    createFlexCostCategory(data: $cat) {
      id
      name
      limit
    }
  }
`;

export const DELETE_FLEX_CATEGORY = gql`
  mutation deleteFlexCostCategory($id: ID!) {
    deleteFlexCostCategory(id: $id) {
      id
      name
      limit
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