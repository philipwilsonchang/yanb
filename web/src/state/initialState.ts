import { FlexCostCategory, FixedCostCategory, MonthlyIncome } from './stateTypes';

export interface IGlobalState {
	categoryList: FlexCostCategory[],
	income: MonthlyIncome,
	budgetedAmount: number,
}

export const initialState: IGlobalState = {
	categoryList: [] as FlexCostCategory[],
	income: { id: 'placeholder', amount: 0 },
	budgetedAmount: 0
};