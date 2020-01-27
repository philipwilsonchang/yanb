import { IGlobalState } from './initialState';

export enum ActionType {
	AddFlexCategory,	// payload: FlexCostCategory
	DeleteFlexCategory, // payload: string
	AddFlexCost,		// payload: { name: string, amount: number }
	UpdateBudgetedAmount, // payload: number
};

export interface IAction {
	type: ActionType,
	payload: any
};

export const reducer = (state: IGlobalState, action: IAction) => {
	let newState = {...state};
	switch (action.type) {
		case ActionType.AddFlexCategory:
			newState.categoryList.push(action.payload);
			return newState;

		case ActionType.DeleteFlexCategory:
			newState.categoryList = state.categoryList.filter(cat => cat.id !== action.payload);
			return newState;

		case ActionType.AddFlexCost:
			const i = newState.categoryList.findIndex(cat => cat.name === action.payload.name);
			newState.categoryList[i].spent += action.payload.amount;
			return newState;

		case ActionType.UpdateBudgetedAmount:
			newState.budgetedAmount = action.payload;
			return newState;
			
		default:
			console.log("Invalid action type:", action);
			return newState;
	}
}