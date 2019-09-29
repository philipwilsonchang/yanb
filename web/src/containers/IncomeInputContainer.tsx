import React, { useEffect, useState } from 'react';

import IncomeInput, { IncomeInterval } from '../components/IncomeInput';
import { Prisma, Income, TimeFrame } from '../prisma-client';

interface IIncomeInputContainer {
	api: string
};

const IncomeInputContainer: React.FC<IIncomeInputContainer> = ({ api }) => {
	const [income, setIncome] = useState({ id: 'asdf', amount: 0, frequency: IncomeInterval.Monthly } as Income);

	const prisma = new Prisma({
		endpoint: api
	});

	// Query income on mount
	useEffect(() => {
		const fetchIncomeAndInterval = async () => {
			const currentIncomes = await prisma.incomes();
			if (currentIncomes.length >= 1) {
				setIncome(currentIncomes[0]);
			} else {
				setIncome({ id: 'asdf', amount: 0, frequency: IncomeInterval.Monthly } as Income);
			} 
		};

		fetchIncomeAndInterval();
	}, [])

	const changeAmount = (amount: number) => {
		setIncome({...income, amount: amount });
	};

	const changeFrequency = (interval: TimeFrame) => {
		setIncome({...income, frequency: interval });
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