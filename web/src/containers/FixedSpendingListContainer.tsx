import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from "@apollo/react-hooks";

import FixedSpendingList from '../components/FixedSpendingList';
import { CREATE_FIXED_CATEGORY, DELETE_FIXED_CATEGORY } from '../graphql/mutations';
import { 
	GET_ALL_FIXED_CATEGORIES, 
	FixedCostCategoriesReturn, 
	GET_MONTHLY_INCOMES, 
	MonthlyIncomesReturn,
	GET_ALL_FLEX_CATEGORIES, 
	FlexCostCategoriesReturn,
} from '../graphql/queries';
import { useGlobalState } from '../state/useGlobalState';
import { FixedCostCategory, FlexCostCategory } from '../state/stateTypes';
import { ActionType } from '../state/reducer';

const FixedSpendingListContainer: React.FC = () => {
	const { state, dispatch } = useGlobalState();
	const { budgetedAmount } = state;
	const [newCostName, setNewCostName] = useState("");
	const [newCostAmount, setNewCostAmount] = useState(0);

	const { data: fixedReturn } = useQuery<FixedCostCategoriesReturn>(GET_ALL_FIXED_CATEGORIES);
	const { data: flexReturn } = useQuery<FlexCostCategoriesReturn>(GET_ALL_FLEX_CATEGORIES);
	const { data: incomeReturn } = useQuery<MonthlyIncomesReturn>(GET_MONTHLY_INCOMES);
	const [createFixedCategory] = useMutation(CREATE_FIXED_CATEGORY, {
		refetchQueries: ["getAllFixedCategories"]
	});
	const [deleteFixedCategory] = useMutation(DELETE_FIXED_CATEGORY, {
		refetchQueries: ["getAllFixedCategories"]
	});
	
	// Calculate total budgetedAmount
	useEffect(() => {
		let totalBudgetedAmount = 0;
		if (flexReturn && fixedReturn) {
			flexReturn.flexCostCategories.forEach((cat: FlexCostCategory) => {
				totalBudgetedAmount += cat.limit;
			})
			fixedReturn.fixedCostCategories.forEach((cat: FixedCostCategory) => {
				totalBudgetedAmount += cat.amount;
			})
		}
		dispatch({
			type: ActionType.UpdateBudgetedAmount,
			payload: totalBudgetedAmount,
		})
	}, [flexReturn, fixedReturn, dispatch])

	const removeCostFromList = async (id: string) => {
		await deleteFixedCategory({
			variables: {
				id: id
			}
		});
	};

	const addNewCostToList = async () => {
		if (newCostName !== "" && newCostAmount !== 0) {
			await createFixedCategory({
				variables: {
					cat: { name: newCostName, amount: newCostAmount }
				}
			});
			setNewCostName("");
			setNewCostAmount(0);
		}
	};

	return (
		<FixedSpendingList 
			budgetedAmount={budgetedAmount}
			costs={fixedReturn ? fixedReturn.fixedCostCategories : []} 
			monthlyIncome={(incomeReturn && incomeReturn.monthlyIncomes.length > 0) ? incomeReturn.monthlyIncomes[0].amount : 0}
			newName={newCostName} 
			newAmount={newCostAmount} 
			changeNewName={setNewCostName} 
			changeNewAmount={setNewCostAmount} 
			removeCost={removeCostFromList} 
			submitCost={addNewCostToList} 
		/>
	);
};

export default FixedSpendingListContainer;