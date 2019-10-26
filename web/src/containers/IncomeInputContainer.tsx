import React, { useEffect } from 'react';

import IncomeInput, { IncomeInterval } from '../components/IncomeInput';
import { Prisma, Income, TimeFrame } from '../prisma-client';
import { useGlobalState } from '../state/useGlobalState';
import { ActionType } from '../state/reducer';

interface IIncomeInputContainer {
	api: string
};

const IncomeInputContainer: React.FC<IIncomeInputContainer> = ({ api }) => {
	const { state, dispatch } = useGlobalState();
	const { income } = state;

	const prisma = new Prisma({
		endpoint: api
	});

	// Query income on mount
	useEffect(() => {
		const fetchIncomeAndInterval = async () => {
			const currentIncomes = await prisma.incomes();
			if (currentIncomes.length >= 1) {
				dispatch({
					type: ActionType.ChangeIncome,
					payload: currentIncomes[0]
				});
			} else {
				dispatch({
					type: ActionType.ChangeIncome,
					payload: { id: 'placeholder', amount: 0, frequency: IncomeInterval.Monthly } as Income
				});
			} 
		};

		fetchIncomeAndInterval();
	}, [])

	const changeAmount = (amount: number) => {
		dispatch({
			type: ActionType.ChangeIncome,
			payload: {...income, amount: amount}
		});
	};

	const changeFrequency = (interval: TimeFrame) => {
		dispatch({
			type: ActionType.ChangeIncome,
			payload: {...income, frequency: interval}
		});
	};

	const submitIncome = async () => {
		await prisma.upsertIncome({ 
			where: {
				id: income.id 
			},
			update: {
				amount: income.amount,
				frequency: income.frequency
			},
			create: {
				amount: income.amount,
				frequency: income.frequency
			}
		});
	};

	return (
		<IncomeInput
			income={income}
			changeAmount={changeAmount}
			changeFrequency={changeFrequency}
			submitIncome={submitIncome}
		/>
	);
};

export default IncomeInputContainer;