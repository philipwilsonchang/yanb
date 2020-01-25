import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/react-hooks";

import FixedSpendingList from '../components/FixedSpendingList';
import { CREATE_FIXED_CATEGORY, DELETE_FIXED_CATEGORY } from '../graphql/mutations';
import { GET_ALL_FIXED_CATEGORIES, FixedCostCategoriesReturn, GET_MONTHLY_INCOMES, MonthlyIncomesReturn } from '../graphql/queries';
import { useGlobalState } from '../state/useGlobalState';

interface IFixedSpendingListContainerProps {
	api: string;
};

const FixedSpendingListContainer: React.FC<IFixedSpendingListContainerProps> = ({ api }) => {
	const { state } = useGlobalState();
	const { budgetedAmount } = state;
	const [newCostName, setNewCostName] = useState("");
	const [newCostAmount, setNewCostAmount] = useState(0);

	const { data: fixedReturn } = useQuery<FixedCostCategoriesReturn>(GET_ALL_FIXED_CATEGORIES);
	const { data: incomeReturn } = useQuery<MonthlyIncomesReturn>(GET_MONTHLY_INCOMES);
	const [createFixedCategory] = useMutation(CREATE_FIXED_CATEGORY, {
		refetchQueries: ["fixedCostCategories"]
	});
	const [deleteFixedCategory] = useMutation(DELETE_FIXED_CATEGORY, {
		refetchQueries: ["fixedCostCategories"]
	});

	const removeCostFromList = (id: string) => {
		deleteFixedCategory({
			variables: {
				id: id
			}
		})
	};

	const addNewCostToList = () => {
		if (newCostName !== "" && newCostAmount !== 0) {
			createFixedCategory({
				variables: {
					cat: { name: newCostName, amount: newCostAmount }
				}
			})
		}
	};

	return (
		<FixedSpendingList 
			budgetedAmount={budgetedAmount}
			costs={fixedReturn ? fixedReturn.fixedCostCategories : []} 
			monthlyIncome={incomeReturn ? incomeReturn.monthlyIncomes[0].amount : 0}
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