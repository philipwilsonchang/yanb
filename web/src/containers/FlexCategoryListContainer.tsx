import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/react-hooks";

import FlexCategoryList from '../components/FlexCategoryList';
import { CREATE_FLEX_CATEGORY, DELETE_FLEX_CATEGORY } from '../graphql/mutations';
import { 
	GET_MONTHLY_INCOMES, 
	MonthlyIncomesReturn, 
	FlexCostCategoriesReturn,
	GET_ALL_FLEX_CATEGORIES_BETWEEN_TIMES,
} from '../graphql/queries';
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
	const { data: incomeReturn } = useQuery<MonthlyIncomesReturn>(GET_MONTHLY_INCOMES);

	const [createFlexCategory] = useMutation(CREATE_FLEX_CATEGORY, {
		refetchQueries: ["getAllFlexCategoriesBetweenTimes"]
	});
	const [deleteFlexCategory] = useMutation(DELETE_FLEX_CATEGORY, {
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
					cat: { name: newCostName, limit: newCostLimit }
				}
			})
		}
	};

	return (
		<FlexCategoryList
			budgetedAmount={budgetedAmount}
			categories={categories ? categories.getAllFlexCategoriesBetweenTimes : []}
			monthlyIncome={(incomeReturn && incomeReturn.getMonthlyIncomes.length > 0) ? incomeReturn.getMonthlyIncomes[0].amount : 0}
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