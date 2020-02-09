import React from 'react';
import { useQuery } from "@apollo/react-hooks";

import CategoryDisplay from '../components/CategoryDisplay';
import { 
	FlexCostCategoriesReturn,
	GET_ALL_FLEX_CATEGORIES_BETWEEN_TIMES,
	RollingCostCategoriesReturn,
	GET_ALL_ROLLING_CATEGORIES_BETWEEN_TIMES, 
} from '../graphql/queries';


const CategoryHUDContainer: React.FC = () => {
	const today = new Date();
	const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
	const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

	const { data: flexCategories } = useQuery<FlexCostCategoriesReturn>(GET_ALL_FLEX_CATEGORIES_BETWEEN_TIMES, {
		variables: {
			timeStart: firstDay.toISOString(),
			timeEnd: lastDay.toISOString(),
		}
	});

	const { data: rollingCategories } = useQuery<RollingCostCategoriesReturn>(GET_ALL_ROLLING_CATEGORIES_BETWEEN_TIMES, {
		variables: {
			timeStart: firstDay.toISOString(),
			timeEnd: lastDay.toISOString(),
		}
	});

	return (
		<div>
			{flexCategories && flexCategories.getAllFlexCategoriesBetweenTimes.map((category) => (
				<div key={`hudlist-${category.name}`}>
					<br />
					<CategoryDisplay 
						name={category.name}
						limit={category.monthlyLimit}
						spent={category.spent ? category.spent : 0}
					/>
				</div>
			))}
			{rollingCategories && rollingCategories.getAllRollingCategoriesBetweenTimes.map((category) => (
				<div key={`hudlist-${category.name}`}>
					<br />
					<CategoryDisplay 
						name={`${category.name} (Rolling)`}
						limit={category.totalLimit}
						spent={category.spent ? category.spent : 0}
					/>
				</div>
			))}
		</div>
	);
};

export default CategoryHUDContainer;