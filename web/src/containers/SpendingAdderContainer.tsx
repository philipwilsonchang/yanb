import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from "@apollo/react-hooks";

import SpendingAdder from '../components/SpendingAdder';
import { CREATE_COST } from '../graphql/mutations'
import { 
	FlexCostCategoriesReturn,
	GET_ALL_FLEX_CATEGORIES_BETWEEN_TIMES } from '../graphql/queries'
import { FlexCostCategory } from '../state/stateTypes';

const dummyCategory: FlexCostCategory = {
	id: 'abc',
	name: "Select category...",
	limit: 0,
	spent: 0
};

const SpendingAdderContainer: React.FC = () => {
	const [amount, setAmount] = useState<string>("");
	const [description, setDescription] = useState("");
	const [selectedCategory, setSelectedCategory] = useState(dummyCategory);

	const today = new Date();
	const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
	const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

	const { data: categories } = useQuery<FlexCostCategoriesReturn>(GET_ALL_FLEX_CATEGORIES_BETWEEN_TIMES, {
		variables: {
			timeStart: firstDay.toISOString(),
			timeEnd: lastDay.toISOString(),
		}
	});
	const [addCost] = useMutation(CREATE_COST, {
		refetchQueries: ["getAllFlexCategoriesBetweenTimes"]
	});

	useEffect(() => {
		if (categories && selectedCategory.id !== 'abc') {
			const newSelectedCategory = categories.flexCostCategories.find((cat: FlexCostCategory): boolean => (cat.id === selectedCategory.id));
			if (newSelectedCategory) {
				setSelectedCategory(newSelectedCategory);
			} else {
				setSelectedCategory(dummyCategory);
			}
		}
	// eslint-disable-next-line
	}, [categories])

	const submitSpending = async () => {
		if (isNaN(parseFloat(amount))) {
			return;
		}
		await addCost({
			variables: {
				newcost: { 
					amount: parseFloat(amount), 
					description: description,
					category: {
						connect: {
							id: selectedCategory.id,
						}
					},
				}
			}
		});
		clearInput();
	};

	const clearInput = () => {
		setAmount("");
		setDescription("");
		setSelectedCategory(categories ? categories.flexCostCategories[0] : dummyCategory);
	};

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
		<SpendingAdder
			categories={categories ? categories.flexCostCategories : []}
			selectedCategory={selectedCategory}
			amount={amount}
			description={description}
			categorySpent={totalCostsInCategory(selectedCategory)}
			changeCategory={setSelectedCategory}
			changeAmount={setAmount}
			changeDescription={setDescription}
			submitFunc={submitSpending}
		/>
	);
};

export default SpendingAdderContainer;