export interface IGlobalState {
	budgetedAmount: number,
	isLoggedIn: boolean,
	loginToken: string,
};

export const initialState: IGlobalState = {
	budgetedAmount: 0,
	isLoggedIn: false,
	loginToken: "",
};