import React from 'react';

import { FormControl, FormControlProps } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import CategoryDisplay from './CategoryDisplay';

interface ISpendingAdderProps {
	categories: string[],
	selectedCategory: string,
	categoryLimit: number,
	categorySpent: number,
	changeCategory(category: string): void,
	amount: number,
	changeAmount(newAmount: number): void,
	submitFunc(): void,
}

const SpendingAdder: React.FC<ISpendingAdderProps> = ({ categories, selectedCategory, categoryLimit, categorySpent, changeCategory, amount, changeAmount, submitFunc }) => {
	return (
		<Card>
			<Card.Header>Add Spending Record</Card.Header>
			<Card.Body className='card text-right'>
				<Row>
					<Col>
						<Dropdown onSelect={(e: any) => changeCategory(e)}>
						    <Dropdown.Toggle variant="success" id="dropdown-basic">
						    	{selectedCategory}
						    </Dropdown.Toggle>
						    <Dropdown.Menu>
						    	{categories.map(cat => (
						    		<Dropdown.Item key={cat} eventKey={cat}>{cat}</Dropdown.Item>
						    	))}
						    </Dropdown.Menu>
						</Dropdown>
					</Col>
					<Col>
						<Form.Control value={`$${amount.toFixed(2)}`} onChange={(e: React.FormEvent<FormControlProps & FormControl>) => changeAmount(parseFloat(e.currentTarget.value as string))}/>
					</Col>
				</Row>
				<br />
				<CategoryDisplay name={selectedCategory} limit={categoryLimit} spent={categorySpent} />
				<br />
				<Button variant="success" onClick={submitFunc}>Submit</Button>
			</Card.Body>
		</Card>
	);
};

export default SpendingAdder;