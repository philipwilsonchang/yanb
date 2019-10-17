import React, { useEffect, useState } from 'react';

import CategoryDisplay from '../components/CategoryDisplay';
import { FlexCostCategory, Prisma } from '../prisma-client';

interface ICategoryHUDContainerProps {
	api: string,
};

type SpentToCategory = {
	categoryName: string,
	spent: number
};

interface SpentFlexCostCategory extends FlexCostCategory {
	spent?: number
}

const CategoryHUDContainer: React.FC<ICategoryHUDContainerProps> = ({ api }) => {
	const [categoryList, setCategoryList] = useState([] as FlexCostCategory[]);
	const [spentCategoryList, setSpentCategoryList] = useState([] as SpentFlexCostCategory[]);

	const prisma = new Prisma({
		endpoint: api
	});

	// Get all categories on component mount
	useEffect(() => {
		const getCategoryList = async () => {
			const categories = await prisma.flexCostCategories();
			if (categories.length >= 1) {
				setCategoryList(categories);
			}
		};

		getCategoryList();
	}, []);

	// Get all spent value of all categories when categoryList updates
	useEffect(() => {
		const getCategorySpent = async (name: string, firstDay: Date, lastDay: Date) => {
			const costs = await prisma.costs({ where: { category: { name: name }, createdAt_gte: firstDay.toISOString(), createdAt_lte: lastDay.toISOString()}});
			if (costs.length === 0) {
				return 0;
			} else {
				const spentToDate = costs.reduce((acc, cost) => ({...acc, amount: acc.amount + cost.amount }));
				return spentToDate.amount;
			}
		};

		const getSpentList = async () => {
			const updatedSpentList = [...categoryList] as SpentFlexCostCategory[];
			const today = new Date();
			const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
			const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

			updatedSpentList.forEach( async (category) => {
				category.spent = await getCategorySpent(category.name, firstDay, lastDay);
				setSpentCategoryList(updatedSpentList);
			});
		};

		getSpentList();
	}, [categoryList])

	return (
		<div>
			{spentCategoryList.map((category) => (
				<div key={category.name}>
					<br />
					<CategoryDisplay 
						name={category.name}
						limit={category.limit}
						spent={category.spent || 0}
					/>
				</div>
			))}
		</div>
	);
};

export default CategoryHUDContainer;