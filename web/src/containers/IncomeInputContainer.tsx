import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/react-hooks";

import IncomeInput from '../components/IncomeInput';
import { UPSERT_MONTHLY_INCOME } from '../graphql/mutations'
import { GET_MONTHLY_INCOMES, MonthlyIncomesReturn } from '../graphql/queries'
import { MonthlyIncome } from '../state/stateTypes';

const IncomeInputContainer: React.FC = () => {
	const [tempIncome, setTempIncome] = useState<MonthlyIncome>()

	const { data: incomesResult } = useQuery<MonthlyIncomesReturn>(GET_MONTHLY_INCOMES); 
	const [upsertIncome] = useMutation(UPSERT_MONTHLY_INCOME, {
		refetchQueries: ["monthlyIncomes"]
	})

	const changeAmount = (amount: number) => {
		if (tempIncome) {
			const newTempIncome = { ...tempIncome }
			newTempIncome.amount = amount
			setTempIncome(newTempIncome)
		}
	};

	const submitIncome = async () => {
		if (tempIncome) {
			await upsertIncome({
				variables: {
					newincome: tempIncome,
					id: tempIncome.id
				}
			})
			setTempIncome(undefined)
		}
	};

	return (
		<IncomeInput
			income={tempIncome ? tempIncome : (incomesResult ? incomesResult.monthlyIncomes[0] : {id: "0", amount: 0})}
			changeAmount={changeAmount}
			submitIncome={submitIncome}
		/>
	);
};

export default IncomeInputContainer;