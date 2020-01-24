import gql from 'graphql-tag'
import { Cost, FlexCostCategory, FixedCostCategory, MonthlyIncome } from '../state/stateTypes'

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

export const GET_ALL_COSTS_BETWEEN_TIMES = gql`
  query($timeStart: DateTime!, $timeEnd: DateTime!) {
    costs( where: { createdAt_gte: $timeStart, createAt_lte: $timeEnd }) {
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

export interface CostsReturn {
	costs: Cost[]
}

export const GET_ALL_FLEX_CATEGORIES = gql`
  query {
    flexCostCategories() {
      id
      name
      limit
    }
  }
`;

export interface FlexCostCategoriesReturn {
	flexCostCategories: FlexCostCategory[]
}

export const GET_ALL_FIXED_CATEGORIES = gql`
  query {
    fixedCostCategories() {
      id
      name
      amount
    }
  }
`;

export interface FixedCostCategoriesReturn {
  fixedCostCategories: FixedCostCategory[]
}

export const GET_MONTHLY_INCOMES = gql`
  query {
    monthlyIncomes() {
      id
      amount
    }
  }
`;

export interface MonthlyIncomesReturn {
  monthlyIncomes: MonthlyIncome[]
}
