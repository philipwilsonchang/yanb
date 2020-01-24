import React, { useState } from 'react';

import SpendingAdder from '../components/SpendingAdder';
import { Prisma } from '../prisma-client';
import { useGlobalState } from '../state/useGlobalState';
import { ActionType } from '../state/reducer';
import { SpentFlexCostCategory } from '../state/stateTypes';

interface ISpendingAdderContainerProps {
	api: string,
};

const dummyCategory: SpentFlexCostCategory = {
	id: 'abc',
	name: "Select category...",
	limit: 0,
	spent: 0
};

const SpendingAdderContainer: React.FC<ISpendingAdderContainerProps> = ({ api }) => {
	const { state, dispatch } = useGlobalState();
	const { categoryList } = state;	
	const [amount, setAmount] = useState(0);
	const [description, setDescription] = useState("")
	const [selectedCategory, setSelectedCategory] = useState(dummyCategory);

	const prisma = new Prisma({
		endpoint: api
	});

	const submitSpending = async () => {
		await prisma.createCost({ 
			amount: amount, 
			description: description,
			category: {
				connect: { 
					name: selectedCategory.name }
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