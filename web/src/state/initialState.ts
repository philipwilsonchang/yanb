import { FlexCostCategory, FixedCostCategory, MonthlyIncome } from './stateTypes';

export interface IGlobalState {
	categoryList: FlexCostCategory[],
	fixedList: FixedCostCategory[],
	income: MonthlyIncome,
	budgetedAmount: number,
}

export const initialState: IGlobalState = {
	categoryList: [] as FlexCostCategory[],
	fixedList: [] as FixedCostCategory[],
	income: { id: 'placeholder', amount: 0 },
	budgetedAmount: 0
};