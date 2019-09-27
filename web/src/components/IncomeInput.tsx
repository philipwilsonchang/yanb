import React from 'react';

import { FormControl, FormControlProps } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

interface IIncomeInputProps {
	income: number,
	interval: string,
	changeIncome(amount: number): void,
	changeInterval(interval: string): void
};

export enum IncomeInterval {
	Weekly = "Weekly",
	Biweekly = "Biweekly",
	Semimonthly = "Semi-monthly",
	Monthly = "Monthly"
}

const IncomeInput: React.FC<IIncomeInputProps> = ({ income, interval, changeIncome, changeInterval }) => {
	return (
		<Card>
			<Card.Header>Income</Card.Header>
			<Card.Body className='card text-right'>
				<Row>
					<Col>
						<Dropdown onSelect={(e: any) => changeInterval(e)}>
						    <Dropdown.Toggle variant="success" id="dropdown-basic">
						    	{interval}
						    </Dropdown.Toggle>
						    <Dropdown.Menu>
							    <Dropdown.Item eventKey={IncomeInterval.Weekly}>Weekly</Dropdown.Item>
							    <Dropdown.Item eventKey={IncomeInterval.Biweekly}>Biweekly</Dropdown.Item>
							    <Dropdown.Item eventKey={IncomeInterval.Semimonthly}>Semi-monthly</Dropdown.Item>
							    <Dropdown.Item eventKey={IncomeInterval.Monthly}>Monthly</Dropdown.Item>
						    </Dropdown.Menu>
						</Dropdown>
					</Col>
					<Col>
						<Form.Control value={`$${income.toFixed(2)}`} onChange={(e: React.FormEvent<FormControlProps & FormControl>) => changeIncome(parseFloat(e.currentTarget.value as string))}/>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
};

export default IncomeInput;