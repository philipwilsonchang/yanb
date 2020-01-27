import { FlexCostCategory } from './stateTypes';

export interface IGlobalState {
	categoryList: FlexCostCategory[],
	budgetedAmount: number,
};

export const initialState: IGlobalState = {
	categoryList: [] as FlexCostCategory[],
	budgetedAmount: 0,
};