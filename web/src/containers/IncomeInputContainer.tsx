import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/react-hooks";

import IncomeInput from '../components/IncomeInput';
import { UPSERT_MONTHLY_INCOME } from '../graphql/mutations'
import { GET_MONTHLY_INCOMES, MonthlyIncomesReturn } from '../graphql/queries'
import { MonthlyIncome } from '../state/stateTypes';

const IncomeInputContainer: React.FC = () => {
	const [tempIncome, setTempIncome] = useState<number|undefined>()

	const { data: incomesResult } = useQuery<MonthlyIncomesReturn>(GET_MONTHLY_INCOMES); 
	const [upsertIncome] = useMutation(UPSERT_MONTHLY_INCOME, {
		refetchQueries: ["monthlyIncomes"]
	})

	const changeAmount = (amount: number) => {
		setTempIncome(amount)
	};

	const submitIncome = async () => {
		if (tempIncome) {
			await upsertIncome({
				variables: {
					newincome: { id: "0", amount: tempIncome },
					updateincome: { amount: tempIncome },
					id: (incomesResult && incomesResult.monthlyIncomes[0]) ? incomesResult.monthlyIncomes[0].id : 0
				}
			})
			setTempIncome(undefined)
		}
	};

	const getCorrectIncomeValue = (): MonthlyIncome => {
		if (tempIncome) {
			return { id: "0", amount: tempIncome };
		} else {
			if (incomesResult && incomesResult.monthlyIncomes[0]) {
				return incomesResult.monthlyIncomes[0];
			} else {
				return { id: "0", amount: 0 };
			}
		}
	}

	return (
		<IncomeInput
			income={getCorrectIncomeValue()}
			changeAmount={changeAmount}
			submitIncome={submitIncome}
		/>
	);
};

export default IncomeInputContainer;