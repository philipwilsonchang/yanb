import gql from 'graphql-tag'
import { Cost, FlexCostCategory, FixedCostCategory, MonthlyIncome } from '../state/stateTypes'

export const GET_ALL_COSTS = gql`
  query getAllCosts {
    costs {
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
  query getAllCostsBetweenTimes($timeStart: DateTime!, $timeEnd: DateTime!) {
    costs( where: { createdAt_gte: $timeStart, createdAt_lte: $timeEnd }) {
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
  query getAllFlexCategories {
    flexCostCategories {
      id
      name
      limit
      costs {
        id
        amount
        description
      }
    }
  }
`;

export const GET_ALL_FLEX_CATEGORIES_BETWEEN_TIMES = gql`
  query getAllFlexCategoriesBetweenTimes($timeStart: DateTime!, $timeEnd: DateTime!) {
    flexCostCategories( where: { costs_every: { createdAt_gte: $timeStart, createdAt_lte: $timeEnd } } ) {
      id
      name
      limit
      costs {
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
  }
`

export interface FlexCostCategoriesReturn {
	flexCostCategories: FlexCostCategory[]
}

export const GET_ALL_FIXED_CATEGORIES = gql`
  query getAllFixedCategories {
    fixedCostCategories {
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
  query getMonthlyIncomes {
    monthlyIncomes {
      id
      amount
    }
  }
`;

export interface MonthlyIncomesReturn {
  monthlyIncomes: MonthlyIncome[]
}
