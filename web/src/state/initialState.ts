import { SpentFlexCostCategory } from './stateTypes';
import { FixedCostCategory, MonthlyIncome } from '../prisma-client';

export interface IGlobalState {
	categoryList: SpentFlexCostCategory[],
	fixedList: FixedCostCategory[],
	income: MonthlyIncome,
	budgetedAmount: number,
}

export const initialState: IGlobalState = {
	categoryList: [] as SpentFlexCostCategory[],
	fixedList: [] as FixedCostCategory[],
	income: { id: 'placeholder', amount: 0 },
	budgetedAmount: 0
};