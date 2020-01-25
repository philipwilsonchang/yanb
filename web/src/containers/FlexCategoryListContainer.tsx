import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/react-hooks";

import FlexCategoryList from '../components/FlexCategoryList';
import { CREATE_FLEX_CATEGORY, DELETE_FLEX_CATEGORY } from '../graphql/mutations';
import { GET_MONTHLY_INCOMES, MonthlyIncomesReturn } from '../graphql/queries';
import { useGlobalState } from '../state/useGlobalState';
import { ActionType } from '../state/reducer';

interface IFlexCategoryListContainerProps {
	api: string
};

const FlexCategoryListContainer: React.FC<IFlexCategoryListContainerProps> = ({ api }) => {
	const { state, dispatch } = useGlobalState();
	const { budgetedAmount, categoryList } = state;
	const [newCostName, setNewCostName] = useState("");
	const [newCostLimit, setNewCostLimit] = useState(0);

	const { data: incomeReturn } = useQuery<MonthlyIncomesReturn>(GET_MONTHLY_INCOMES);
	const [createFlexCategory] = useMutation(CREATE_FLEX_CATEGORY, {
		refetchQueries: ["flexCostCategories"]
	});
	const [deleteFlexCategory] = useMutation(DELETE_FLEX_CATEGORY, {
		refetchQueries: ["flexCostCategories"]
	})

	const removeCostFromList = async (id: string) => {
		await deleteFlexCategory({
			variables: {
				id: id
			}
		})
		dispatch({
			type: ActionType.DeleteFlexCategory,
			payload: name
		});
	};

	const addNewCostToList = async () => {
		if (newCostName !== "" && newCostLimit !== 0) {
			await createFlexCategory({
				variables: {
					cat: { name: newCostName, limit: newCostLimit }
				}
			})
			dispatch({
				type: ActionType.AddFlexCategory,
				payload: { name: newCostName, limit: newCostLimit, spent: 0 }
			});
		}
	};

	return (
		<FlexCategoryList
			budgetedAmount={budgetedAmount}
			categories={categoryList}
			monthlyIncome={incomeReturn ? incomeReturn.monthlyIncomes[0].amount : 0}
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