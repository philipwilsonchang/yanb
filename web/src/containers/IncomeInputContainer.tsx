import React, { useEffect } from 'react';

import IncomeInput from '../components/IncomeInput';
import { Prisma, MonthlyIncome } from '../prisma-client';
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
			const currentIncomes = await prisma.monthlyIncomes();
			if (currentIncomes.length >= 1) {
				dispatch({
					type: ActionType.ChangeIncome,
					payload: currentIncomes[0]
				});
			} else {
				dispatch({
					type: ActionType.ChangeIncome,
					payload: { id: 'placeholder', amount: 0 } as MonthlyIncome
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

	const submitIncome = async () => {
		await prisma.upsertMonthlyIncome({ 
			where: {
				id: income.id 
			},
			update: {
				amount: income.amount,
			},
			create: {
				amount: income.amount,
			}
		});
	};

	return (
		<IncomeInput
			income={income}
			changeAmount={changeAmount}
			submitIncome={submitIncome}
		/>
	);
};

export default IncomeInputContainer;