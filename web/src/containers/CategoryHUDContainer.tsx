import React, { useEffect } from 'react';

import CategoryDisplay from '../components/CategoryDisplay';
import { Prisma } from '../prisma-client';
import { useGlobalState } from '../state/useGlobalState';
import { ActionType } from '../state/reducer';
import { SpentFlexCostCategory } from '../state/stateTypes';

interface ICategoryHUDContainerProps {
	api: string,
};

const CategoryHUDContainer: React.FC<ICategoryHUDContainerProps> = ({ api }) => {
	const { state, dispatch } = useGlobalState();
	const { categoryList } = state;

	const prisma = new Prisma({
		endpoint: api
	});

	// Get all categories on component mount
	useEffect(() => {
		const today = new Date();
		const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
		const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

		const getCategoryList = async () => {
			const categories = await prisma.flexCostCategories();
			if (categories.length >= 1) {
				categories.forEach(async (category) => {
					const spent = await getCategorySpent(category.name, firstDay, lastDay);
					dispatch({
						type: ActionType.AddFlexCategory,
						payload: {...category, spent: spent } as SpentFlexCostCategory
					});

				});
			}
		};

		const getCategorySpent = async (name: string, firstDay: Date, lastDay: Date) => {
			const costs = await prisma.costs({ where: { category: { name: name }, createdAt_gte: firstDay.toISOString(), createdAt_lte: lastDay.toISOString()}});
			if (costs.length === 0) {
				return 0;
			} else {
				const spentToDate = costs.reduce((acc, cost) => ({...acc, amount: acc.amount + cost.amount }));
				return spentToDate.amount;
			}
		};

		getCategoryList();
	}, []);

	return (
		<div>
			{categoryList.map((category) => (
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