import Cookies from 'js-cookie';

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
			const inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
			Cookies.set("yanb-token", action.payload, { expires: inFifteenMinutes })
			return newState;

		case ActionType.Logout:
			newState.isLoggedIn = false;
			return newState;

		default:
			console.log("Invalid action type:", action);
			return newState;
	}
}