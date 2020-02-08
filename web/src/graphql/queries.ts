import gql from 'graphql-tag'
import { FlexCostCategory, FixedCostCategory, RollingCostCategory } from '../state/stateTypes'

export const GET_ALL_FLEX_CATEGORIES_BETWEEN_TIMES = gql`
  query getAllFlexCategoriesBetweenTimes($timeStart: DateTime!, $timeEnd: DateTime!) {
    getAllFlexCategoriesBetweenTimes(timeStart: $timeStart, timeEnd: $timeEnd) {
      id
      name
      monthlyLimit
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
      monthlyLimit
    }
  }
`;

export interface FixedCostCategoriesReturn {
  getAllFixedCategories: FixedCostCategory[]
}

export const GET_ALL_ROLLING_CATEGORIES_BETWEEN_TIMES = gql`
  query getAllRollingCategoriesBetweenTimes($timeStart: DateTime!, $timeEnd: DateTime!) {
    getAllRollingCategoriesBetweenTimes(timeStart: $timeStart, timeEnd: $timeEnd) {
      id
      name
      monthlyLimit
      totalLimit
      spent
    }
  }
`

export interface RollingCostCategoriesReturn {
  getAllRollingCategoriesBetweenTimes: RollingCostCategory[]
}

export const GET_MONTHLY_INCOME = gql`
  query getMonthlyIncome {
    getMonthlyIncome
  }
`;

export interface MonthlyIncomesReturn {
  getMonthlyIncome: number
}
