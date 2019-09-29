import React from 'react';

import { FormControl, FormControlProps } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { Income, TimeFrame } from '../prisma-client';

interface IIncomeInputProps {
	income: Income,
	changeAmount(amount: number): void,
	changeFrequency(interval: TimeFrame): void,
	submitIncome(): void
};

export enum IncomeInterval {
	Weekly = "Weekly",
	Biweekly = "Biweekly",
	Semimonthly = "Semimonthly",
	Monthly = "Monthly"
};

const IncomeInput: React.FC<IIncomeInputProps> = ({ income, changeAmount, changeFrequency, submitIncome }) => {
	return (
		<Card>
			<Card.Header>Income</Card.Header>
			<Card.Body className='card text-right'>
				<Row>
					<Dropdown style={{ margin: '0px 0px 0px 15px' }} onSelect={(e: any) => changeFrequency(e)}>
					    <Dropdown.Toggle variant="success" id="dropdown-basic">
					    	{income.frequency}
					    </Dropdown.Toggle>
					    <Dropdown.Menu>
						    <Dropdown.Item eventKey={IncomeInterval.Weekly}>Weekly</Dropdown.Item>
						    <Dropdown.Item eventKey={IncomeInterval.Biweekly}>Biweekly</Dropdown.Item>
						    <Dropdown.Item eventKey={IncomeInterval.Semimonthly}>Semimonthly</Dropdown.Item>
						    <Dropdown.Item eventKey={IncomeInterval.Monthly}>Monthly</Dropdown.Item>
					    </Dropdown.Menu>
					</Dropdown>
					<Col>
						<Form.Control value={income.amount.toString()} onChange={(e: React.FormEvent<FormControlProps & FormControl>) => changeAmount(parseFloat(e.currentTarget.value as string))} />
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