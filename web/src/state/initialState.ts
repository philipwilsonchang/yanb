import { SpentFlexCostCategory } from './stateTypes';

export interface IGlobalState {
	categoryList: SpentFlexCostCategory[],
}

export const initialState: IGlobalState = {
	categoryList: [] as SpentFlexCostCategory[],
};