import { IGlobalState } from './initialState';

export enum ActionType {
	AddFlexCategory,	// payload: FlexCostCategory
	DeleteFlexCategory, // payload: string
	AddFixedCategory,	// payload: FixedCostCategory
	DeleteFixedCategory,// payload: string
	AddFlexCost,		// payload: { name: string, amount: number }
	ChangeIncome		// payload: Income
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
			newState.budgetedAmount += action.payload.limit;
			return newState;

		case ActionType.DeleteFlexCategory:
			const categoryToDelete = state.categoryList.find(cat => (cat.name === action.payload));
			if (categoryToDelete) {
				newState.budgetedAmount -= categoryToDelete.limit;
			}
			newState.categoryList = state.categoryList.filter(cat => cat.name !== action.payload);
			return newState;

		case ActionType.AddFixedCategory:
			newState.fixedList.push(action.payload);
			newState.budgetedAmount += action.payload.amount;
			return newState;

		case ActionType.DeleteFixedCategory:
			const fixedToDelete = state.fixedList.find(cat => (cat.name === action.payload));
			if (fixedToDelete) {
				newState.budgetedAmount -= fixedToDelete.amount;
			}
			newState.fixedList = state.fixedList.filter(cat => cat.name !== action.payload);
			return newState;

		case ActionType.AddFlexCost:
			const i = newState.categoryList.findIndex(cat => cat.name === action.payload.name);
			newState.categoryList[i].spent += action.payload.amount;
			return newState;

		case ActionType.ChangeIncome:
			newState.income = action.payload;
			return newState;
			
		default:
			console.log("Invalid action type:", action);
			return newState;
	}
}