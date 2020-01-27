import { FlexCostCategory } from './stateTypes';

export interface IGlobalState {
	budgetedAmount: number,
};

export const initialState: IGlobalState = {
	budgetedAmount: 0,
};