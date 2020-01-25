import React, { useEffect } from 'react';
import { keyBy, keys } from 'lodash'
import { useQuery } from "@apollo/react-hooks";

import CategoryDisplay from '../components/CategoryDisplay';
import { 
	CostsReturn,
	FlexCostCategoriesReturn,
	GET_ALL_COSTS_BETWEEN_TIMES, 
	GET_ALL_FLEX_CATEGORIES } from '../graphql/queries'
import { useGlobalState } from '../state/useGlobalState';
import { ActionType } from '../state/reducer';
import { Cost, FlexCostCategory } from '../state/stateTypes';

const CategoryHUDContainer: React.FC = () => {
	const { state, dispatch } = useGlobalState();
	const { categoryList } = state;

	const today = new Date();
	const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
	const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

	const { data: categories } = useQuery<FlexCostCategoriesReturn>(GET_ALL_FLEX_CATEGORIES)
	const { data: costs } = useQuery<CostsReturn>(GET_ALL_COSTS_BETWEEN_TIMES, {
		variables: {
			timeStart: firstDay.toISOString(),
			timeEnd: lastDay.toISOString(),
		}
	})

	// Get all categories on component mount
	useEffect(() => {
		if (categories && costs) {
			const updatedCategories = keyBy(categories.flexCostCategories, (cat: FlexCostCategory) => cat.id);
			costs.costs.forEach((cost: Cost) => {
				let existingCost = updatedCategories[cost.category.id].spent || 0;
				updatedCategories[cost.category.id].spent = existingCost + cost.amount;
			})
			keys(updatedCategories).forEach((category: string) => {
				dispatch({
					type: ActionType.AddFlexCategory,
					payload: {...updatedCategories[category] }
				})
			})
		}
	}, [categories, costs, dispatch]);

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