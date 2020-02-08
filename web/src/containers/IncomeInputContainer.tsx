import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/react-hooks";

import IncomeInput from '../components/IncomeInput';
import { UPDATE_MONTHLY_INCOME } from '../graphql/mutations'
import { GET_MONTHLY_INCOME, MonthlyIncomesReturn } from '../graphql/queries'

const IncomeInputContainer: React.FC = () => {
	const [tempIncome, setTempIncome] = useState<number|undefined>()

	const { data: incomesResult } = useQuery<MonthlyIncomesReturn>(GET_MONTHLY_INCOME); 
	const [upsertIncome] = useMutation(UPDATE_MONTHLY_INCOME, {
		refetchQueries: ["getMonthlyIncome"]
	})

	const changeAmount = (amount: number) => {
		setTempIncome(amount)
	};

	const submitIncome = async () => {
		if (tempIncome) {
			await upsertIncome({
				variables: {
					newincome: tempIncome,
				}
			})
			setTempIncome(undefined)
		}
	};

	const getCorrectIncomeValue = (): number => {
		if (tempIncome) {
			return tempIncome;
		} else {
			if (incomesResult && incomesResult.getMonthlyIncome) {
				return incomesResult.getMonthlyIncome;
			} else {
				return 0;
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