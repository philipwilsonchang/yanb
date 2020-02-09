import Cookies from 'js-cookie';

export interface IGlobalState {
	budgetedAmount: number,
	isLoggedIn: boolean,
};

export const initialState: IGlobalState = {
	budgetedAmount: 0,
	isLoggedIn: !!Cookies.get('yanb-token'),
};