import React from 'react';
import { useQuery } from "@apollo/react-hooks";

import CategoryDisplay from '../components/CategoryDisplay';
import { 
	FlexCostCategoriesReturn,
	GET_ALL_FLEX_CATEGORIES_BETWEEN_TIMES } from '../graphql/queries'
import { FlexCostCategory } from '../state/stateTypes';

const CategoryHUDContainer: React.FC = () => {
	const today = new Date();
	const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
	const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

	const { data: categories } = useQuery<FlexCostCategoriesReturn>(GET_ALL_FLEX_CATEGORIES_BETWEEN_TIMES, {
		variables: {
			timeStart: firstDay.toISOString(),
			timeEnd: lastDay.toISOString(),
		}
	})

	const totalCostsInCategory = (category: FlexCostCategory): number => {
		if (category.costs) {
			const totalCost = category.costs.reduce((acc, currentValue) => {
				return acc + currentValue.amount;
			}, 0);
			return totalCost;
		} else {
			return 0;
		}
	}

	return (
		<div>
			{categories && categories.flexCostCategories.map((category) => (
				<div key={`hudlist-${category.name}`}>
					<br />
					<CategoryDisplay 
						name={category.name}
						limit={category.limit}
						spent={totalCostsInCategory(category)}
					/>
				</div>
			))}
		</div>
	);
};

export default CategoryHUDContainer;