import gql from 'graphql-tag'

export const CREATE_COST = gql`
  mutation newCost($newcost: CostCreateInput!) {
    createCost(data: $newcost) {
      id
      amount
      description
      createdAt
      category
    }
  }
`;

export const CREATE_FIXED_CATEGORY = gql`
  mutation newFixedCategory($cat: FixedCostCategoryCreateInput!) {
    createFixedCostCategory(data: $cat) {
      id
      name
      amount
    }
  }
`;

export const DELETE_FIXED_CATEGORY = gql`
  mutation deleteFixedCategory($id: ID!) {
    deleteFixedCostCategory(where: { id: $id }) {
      id
      name
      amount
    }
  }
`;

export const CREATE_FLEX_CATEGORY = gql`
  mutation createFlexCategory($cat: FlexCostCategoryCreateInput!) {
    createFlexCostCategory(data: $cat) {
      id
      name
      limit
    }
  }
`;

export const DELETE_FLEX_CATEGORY = gql`
  mutation deleteFlexCategory($id: ID!) {
    deleteFlexCostCategory(where: { id: $id }) {
      id
      name
      limit
    }
  }
`;

export const UPSERT_MONTHLY_INCOME = gql`
  mutation upsertIncome($newincome: MonthlyIncomeCreateInput!, $updateincome: MonthlyIncomeUpdateInput!, $id: ID!) {
    upsertMonthlyIncome(where: { id: $id }, create: $newincome, update: $updateincome) {
      id
      amount
    }
  }
`;