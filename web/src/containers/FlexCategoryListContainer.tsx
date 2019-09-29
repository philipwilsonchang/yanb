import React, { useEffect, useState } from 'react';

import FlexCategoryList from '../components/FlexCategoryList';
import { FlexCostCategory, Prisma } from '../prisma-client';

interface IFlexCategoryListContainerProps {
	api: string
};

const FlexCategoryListContainer: React.FC<IFlexCategoryListContainerProps> = ({ api }) => {
	const [costList, setCostList] = useState([] as FlexCostCategory[]);
	const [newCostName, setNewCostName] = useState("");
	const [newCostLimit, setNewCostLimit] = useState(0);

	const prisma = new Prisma({
		endpoint: api
	});

	// Query costList on mount
	useEffect(() => {
		const fetchCostList = async () => {
			const currentCostList = await prisma.flexCostCategories();
			setCostList(currentCostList);
		};

		fetchCostList();
	}, [])

	const removeCostFromList = async (name: string) => {
		const newCostList = costList.filter(cost => cost.name !== name);
		setCostList(newCostList);
		await prisma.deleteFlexCostCategory({ name: name });
	};

	const addNewCostToList = async () => {
		if (newCostName !== "" && newCostLimit !== 0) {
			const result = await prisma.createFlexCostCategory({ name: newCostName, limit: newCostLimit });
			const newCostList = [...costList, result];
			setCostList(newCostList);
		}
	};

	return (
		<FlexCategoryList
			categories={costList}
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