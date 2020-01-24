import React, { useEffect, useState } from 'react';

import FixedSpendingList from '../components/FixedSpendingList';
import { Prisma } from '../prisma-client';
import { useGlobalState } from '../state/useGlobalState';
import { ActionType } from '../state/reducer';

interface IFixedSpendingListContainerProps {
	api: string;
};

const FixedSpendingListContainer: React.FC<IFixedSpendingListContainerProps> = ({ api }) => {
	const { state, dispatch } = useGlobalState();
	const { fixedList, budgetedAmount, income } = state;
	const [newCostName, setNewCostName] = useState("");
	const [newCostAmount, setNewCostAmount] = useState(0);

	const prisma = new Prisma({
		endpoint: api
	});

	// Query costList on mount
	useEffect(() => {
		const fetchCostList = async () => {
			const currentCostList = await prisma.fixedCostCategories();
			currentCostList.forEach(cost => {
				dispatch({
					type: ActionType.AddFixedCategory,
					payload: cost
				})
			});
		};

		fetchCostList();
	}, [])

	const removeCostFromList = async (name: string) => {
		await prisma.deleteFixedCostCategory({ name: name });
		dispatch({
			type: ActionType.DeleteFixedCategory,
			payload: name
		});
	};

	const addNewCostToList = async () => {
		if (newCostName !== "" && newCostAmount !== 0) {
			const result = await prisma.createFixedCostCategory({ name: newCostName, amount: newCostAmount });
			dispatch({
				type: ActionType.AddFixedCategory,
				payload: result
			});
		}
	};

	return (
		<FixedSpendingList 
			budgetedAmount={budgetedAmount}
			costs={fixedList} 
			monthlyIncome={income.amount}
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