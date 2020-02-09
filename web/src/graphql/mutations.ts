import gql from 'graphql-tag'
import { AuthPayload } from '../state/stateTypes'

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

export const UPDATE_MONTHLY_INCOME = gql`
  mutation updateMonthlyIncome($newincome: Float!) {
    updateMonthlyIncome(newincome: $newincome)
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        id
      }
      token
    }
  }
`

export interface LoginResult {
  login: AuthPayload
}

export const SIGNUP = gql`
  mutation signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      user {
        id
      }
      token
    }
  }
`

export interface SignupResult {
  signup: AuthPayload
}