import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/react-hooks";

import FlexCategoryList from '../components/FlexCategoryList';
import { CREATE_COST_CATEGORY, DELETE_COST_CATEGORY } from '../graphql/mutations';
import { 
	GET_MONTHLY_INCOME, 
	MonthlyIncomesReturn, 
	FlexCostCategoriesReturn,
	GET_ALL_FLEX_CATEGORIES_BETWEEN_TIMES,
} from '../graphql/queries';
import { CostCategoryType } from '../state/stateTypes'
import { useGlobalState } from '../state/useGlobalState';

const FlexCategoryListContainer: React.FC = () => {
	const { state } = useGlobalState();
	const { budgetedAmount } = state;
	const [newCostName, setNewCostName] = useState("");
	const [newCostLimit, setNewCostLimit] = useState(0);

	const today = new Date();
	const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
	const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

	const { data: categories } = useQuery<FlexCostCategoriesReturn>(GET_ALL_FLEX_CATEGORIES_BETWEEN_TIMES, {
		variables: {
			timeStart: firstDay.toISOString(),
			timeEnd: lastDay.toISOString(),
		}
	})
	const { data: incomeReturn } = useQuery<MonthlyIncomesReturn>(GET_MONTHLY_INCOME);

	const [createFlexCategory] = useMutation(CREATE_COST_CATEGORY, {
		refetchQueries: ["getAllFlexCategoriesBetweenTimes"]
	});
	const [deleteFlexCategory] = useMutation(DELETE_COST_CATEGORY, {
		refetchQueries: ["getAllFlexCategoriesBetweenTimes"]
	})

	const removeCostFromList = async (id: string) => {
		await deleteFlexCategory({
			variables: {
				id: id
			}
		})
	};

	const addNewCostToList = async () => {
		if (newCostName !== "" && newCostLimit !== 0) {
			await createFlexCategory({
				variables: {
					cat: { 
						name: newCostName, 
						monthlyLimit: newCostLimit, 
						type: CostCategoryType.FLEX 
					}
				}
			})
		}
	};

	return (
		<FlexCategoryList
			budgetedAmount={budgetedAmount}
			categories={categories ? categories.getAllFlexCategoriesBetweenTimes : []}
			monthlyIncome={(incomeReturn && incomeReturn.getMonthlyIncome) ? incomeReturn.getMonthlyIncome : 0}
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