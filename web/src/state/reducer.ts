import { IGlobalState } from './initialState';

export enum ActionType {
	UpdateBudgetedAmount, // payload: number
};

export interface IAction {
	type: ActionType,
	payload: any
};

export const reducer = (state: IGlobalState, action: IAction) => {
	let newState = {...state};
	switch (action.type) {
		case ActionType.UpdateBudgetedAmount:
			newState.budgetedAmount = action.payload;
			return newState;
			
		default:
			console.log("Invalid action type:", action);
			return newState;
	}
}