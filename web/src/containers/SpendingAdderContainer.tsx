import React, { useState } from 'react';
import { useMutation } from "@apollo/react-hooks";

import SpendingAdder from '../components/SpendingAdder';
import { CREATE_COST } from '../graphql/mutations'
import { useGlobalState } from '../state/useGlobalState';
import { ActionType } from '../state/reducer';
import { FlexCostCategory } from '../state/stateTypes';

const dummyCategory: FlexCostCategory = {
	id: 'abc',
	name: "Select category...",
	limit: 0,
	spent: 0
};

const SpendingAdderContainer: React.FC = () => {
	const { state, dispatch } = useGlobalState();
	const { categoryList } = state;	
	const [amount, setAmount] = useState(0);
	const [description, setDescription] = useState("")
	const [selectedCategory, setSelectedCategory] = useState(dummyCategory);

	const [addCost] = useMutation(CREATE_COST, {
		refetchQueries: ["getAllCostsBetweenTimes"]
	})

	const submitSpending = async () => {
		await addCost({
			variables: {
				newcost: { 
					amount: amount, 
					description: description,
					category: {
						connect: { 
							name: selectedCategory.name }
					}
				}
			}
		});
		dispatch({
			type: ActionType.AddFlexCost,
			payload: { name: selectedCategory.name, amount: amount }
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
			description={description}
			categorySpent={selectedCategory.spent || 0}
			changeCategory={setSelectedCategory}
			changeAmount={setAmount}
			changeDescription={setDescription}
			submitFunc={submitSpending}
		/>
	);
};

export default SpendingAdderContainer;