import { IGlobalState } from './initialState';

export enum ActionType {
	UpdateBudgetedAmount, // payload: number
	Login, // payload: string (containing JWT)
	Logout, // payload: none
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

		case ActionType.Login:
			newState.isLoggedIn = true;
			newState.loginToken = action.payload;
			return newState;

		case ActionType.Logout:
			newState.isLoggedIn = false;
			newState.loginToken = "";
			return newState;

		default:
			console.log("Invalid action type:", action);
			return newState;
	}
}