import React, { useState } from 'react';

import FlexCategoryList from '../components/FlexCategoryList';
import { Prisma } from '../prisma-client';
import { useGlobalState } from '../state/useGlobalState';
import { ActionType } from '../state/reducer';

interface IFlexCategoryListContainerProps {
	api: string
};

const FlexCategoryListContainer: React.FC<IFlexCategoryListContainerProps> = ({ api }) => {
	const { state, dispatch } = useGlobalState();
	const { budgetedAmount, categoryList, income } = state;
	const [newCostName, setNewCostName] = useState("");
	const [newCostLimit, setNewCostLimit] = useState(0);

	const prisma = new Prisma({
		endpoint: api
	});

	const removeCostFromList = async (name: string) => {
		await prisma.deleteFlexCostCategory({ name: name });
		dispatch({
			type: ActionType.DeleteFlexCategory,
			payload: name
		});
	};

	const addNewCostToList = async () => {
		if (newCostName !== "" && newCostLimit !== 0) {
			await prisma.createFlexCostCategory({ name: newCostName, limit: newCostLimit });
			dispatch({
				type: ActionType.AddFlexCategory,
				payload: { name: newCostName, limit: newCostLimit, spent: 0 }
			});
		}
	};

	return (
		<FlexCategoryList
			budgetedAmount={budgetedAmount}
			categories={categoryList}
			monthlyIncome={income.amount}
			newName={newCostName}
			newLimit={newCostLimit}
			changeNewName={setNewCostName}
			changeNewLimit={setNewCostLimit}
			removeCategory={removeCostFromList}
			submitCategory={addNewCostToList}
		/>
	);
};

export default FlexCategoryListContainer;