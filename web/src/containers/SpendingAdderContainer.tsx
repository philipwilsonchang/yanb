import React, { useEffect, useState } from 'react';

import SpendingAdder from '../components/SpendingAdder';
import { FlexCostCategory, Prisma } from '../prisma-client';

interface ISpendingAdderContainerProps {
	api: string,
};

const SpendingAdderContainer: React.FC<ISpendingAdderContainerProps> = ({ api }) => {
	const [categoryList, setCategoryList] = useState([] as FlexCostCategory[]);
	const [amount, setAmount] = useState(0);
	const [spent, setSpent] = useState(0);
	const [selectedCategory, setSelectedCategory] = useState({} as FlexCostCategory);

	const prisma = new Prisma({
		endpoint: api
	});

	useEffect(() => {
		const getCategoryList = async () => {
			const categories = await prisma.flexCostCategories();
			if (categories.length >= 1) {
				setCategoryList(categories);
				setSelectedCategory(categories[0]);
			}
		};

		getCategoryList();
	}, []);

	useEffect(() => {
		getCategorySpent(selectedCategory.name, new Date());
	}, [selectedCategory]);

	const getCategorySpent = async (name: string, selectedMonth: Date) => {
		const firstDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
		const lastDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);

		const costs = await prisma.costs({ where: { category: { name: name }, createdAt_gte: firstDay.toISOString(), createdAt_lte: lastDay.toISOString()}});
		if (costs.length === 0) {
			setSpent(0);
		} else {
			const spentToDate = costs.reduce((acc, cost) => ({...acc, amount: acc.amount + cost.amount }));
			setSpent(spentToDate.amount);
		}
	};

	const submitSpending = async () => {
		await prisma.createCost({ 
			amount: amount, 
			category: {
				connect: { 
					name: selectedCategory.name }
			}
		});
		clearInput();
	};

	const clearInput = () => {
		setAmount(0);
		setSelectedCategory(categoryList[0]);
	};

	return (
		<SpendingAdder
			categories={categoryList}
			selectedCategory={selectedCategory}
			amount={amount}
			categorySpent={spent}
			changeCategory={setSelectedCategory}
			changeAmount={setAmount}
			submitFunc={submitSpending}
		/>
	);
};

export default SpendingAdderContainer;