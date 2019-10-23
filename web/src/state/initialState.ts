import { SpentFlexCostCategory } from './stateTypes';
import { FixedCostCategory, Income } from '../prisma-client';
import { IncomeInterval } from '../components/IncomeInput';

export interface IGlobalState {
	categoryList: SpentFlexCostCategory[],
	fixedList: FixedCostCategory[],
	income: Income,
	budgetedAmount: number,
}

export const initialState: IGlobalState = {
	categoryList: [] as SpentFlexCostCategory[],
	fixedList: [] as FixedCostCategory[],
	income: { id: 'placeholder', amount: 0, frequency: IncomeInterval.Monthly },
	budgetedAmount: 0
};