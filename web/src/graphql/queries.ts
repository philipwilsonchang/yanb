import gql from 'graphql-tag'
import { FlexCostCategory, FixedCostCategory, MonthlyIncome } from '../state/stateTypes'

export const GET_ALL_FLEX_CATEGORIES_BETWEEN_TIMES = gql`
  query getAllFlexCategoriesBetweenTimes($timeStart: DateTime!, $timeEnd: DateTime!) {
    getAllFlexCategoriesBetweenTimes(timeStart: $timeStart, timeEnd: $timeEnd) {
      id
      name
      limit
      spent
    }
  }
`

export interface FlexCostCategoriesReturn {
	getAllFlexCategoriesBetweenTimes: FlexCostCategory[]
}

export const GET_ALL_FIXED_CATEGORIES = gql`
  query getAllFixedCategories {
    getAllFixedCategories {
      id
      name
      amount
    }
  }
`;

export interface FixedCostCategoriesReturn {
  getAllFixedCategories: FixedCostCategory[]
}

export const GET_MONTHLY_INCOMES = gql`
  query getMonthlyIncomes {
    getMonthlyIncomes {
      id
      amount
    }
  }
`;

export interface MonthlyIncomesReturn {
  getMonthlyIncomes: MonthlyIncome[]
}
