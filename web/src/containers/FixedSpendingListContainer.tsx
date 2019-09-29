import React, { useEffect, useState } from 'react';

import FixedSpendingList from '../components/FixedSpendingList';
import { FixedCostCategory, Prisma } from '../prisma-client';

interface IFixedSpendingListContainerProps {
	api: string;
};

const FixedSpendingListContainer: React.FC<IFixedSpendingListContainerProps> = ({ api }) => {
	const [costList, setCostList] = useState([] as FixedCostCategory[]);
	const [newCostName, setNewCostName] = useState("");
	const [newCostAmount, setNewCostAmount] = useState(0);

	const prisma = new Prisma({
		endpoint: api
	});

	// Query costList on mount
	useEffect(() => {
		const fetchCostList = async () => {
			const currentCostList = await prisma.fixedCostCategories();
			setCostList(currentCostList);
		};

		fetchCostList();
	}, [])

	const removeCostFromList = async (name: string) => {
		const newCostList = costList.filter(cost => cost.name !== name);
		setCostList(newCostList);
		await prisma.deleteFixedCostCategory({ name: name });
	};

	const addNewCostToList = async () => {
		if (newCostName !== "" && newCostAmount !== 0) {
			const result = await prisma.createFixedCostCategory({ name: newCostName, amount: newCostAmount });
			const newCostList = [...costList, result];
			setCostList(newCostList);
		}
	};

	return (
		<FixedSpendingList 
			costs={costList} 
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