import React from 'react';

import { FormControl, FormControlProps } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { MonthlyIncome } from '../state/stateTypes';

interface IIncomeInputProps {
	income: MonthlyIncome,
	changeAmount(amount: number): void,
	submitIncome(): void
};

const IncomeInput: React.FC<IIncomeInputProps> = ({ income, changeAmount, submitIncome }) => {
	return (
		<Card>
			<Card.Header>Income</Card.Header>
			<Card.Body className='card text-right'>
				<Row>
					<Col>
						<Form.Control value={income.amount ? income.amount.toString() : ""} onChange={(e: React.FormEvent<FormControlProps & FormControl>) => changeAmount(parseFloat(e.currentTarget.value as string))} />
					</Col>
					<Button style={{ margin: '0px 15px 0px 0px' }} variant="success" onClick={submitIncome}>
			      		Submit
			      	</Button>
				</Row>
			</Card.Body>
		</Card>
	);
};

export default IncomeInput;