import React from 'react';

import { FormControl, FormControlProps } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import CategoryDisplay from './CategoryDisplay';
import { FlexCostCategory, RollingCostCategory } from '../state/stateTypes';

interface ISpendingAdderProps {
	flexCategories: FlexCostCategory[],
	rollingCategories: RollingCostCategory[],
	selectedCategory: FlexCostCategory | RollingCostCategory,
	categorySpent: number,
	changeCategory(category: FlexCostCategory | RollingCostCategory): void,
	amount: string,
	changeAmount(newAmount: string): void,
	description: string,
	changeDescription(newDesc: string): void,
	submitFunc(): void,
}

const SpendingAdder: React.FC<ISpendingAdderProps> = ({ flexCategories, rollingCategories, selectedCategory, categorySpent, changeCategory, amount, changeAmount, description, changeDescription, submitFunc }) => {
	
	const findCategoryByID = (e: any): FlexCostCategory | RollingCostCategory => {
		const flexCat = flexCategories.filter(cat => (cat.id === e))
		if (flexCat.length === 1) {
			return flexCat[0]
		}
		const rollCat = rollingCategories.filter(cat => (cat.id === e))
		return rollCat[0]
	}
	
	return (
		<Card>
			<Card.Header>Add Spending Record</Card.Header>
			<Card.Body className='card text-right'>
				<Row>
					<Dropdown style={{ margin: '0px 0px 0px 15px' }} onSelect={(e: any) => changeCategory(findCategoryByID(e))}>
					    <Dropdown.Toggle variant="success" id="dropdown-basic">
					    	{selectedCategory.name}
					    </Dropdown.Toggle>
					    <Dropdown.Menu>
					    	{flexCategories.map(cat => (
					    		<Dropdown.Item key={`costdropdown-${cat.id}`} eventKey={cat.id}>{cat.name}</Dropdown.Item>
					    	))}
								{rollingCategories.map(cat => (
					    		<Dropdown.Item key={`costdropdown-${cat.id}`} eventKey={cat.id}>{cat.name}</Dropdown.Item>
					    	))}
					    </Dropdown.Menu>
					</Dropdown>
					<Col>
						<Form.Control placeholder="Amount" value={amount} onChange={(e: React.FormEvent<FormControlProps & FormControl>) => changeAmount(e.currentTarget.value as string)} />
					</Col>
				</Row>
				&nbsp;
				<Row>
					<Col>
						<Form.Control placeholder="Description" value={description} onChange={(e: React.FormEvent<FormControlProps & FormControl>) => changeDescription(e.currentTarget.value as string)} />
					</Col>
				</Row>
				<Row>

				</Row>
				<br />
				{(selectedCategory.id !== "abc") && (
					<div>
						<CategoryDisplay 
							name={selectedCategory.name} 
							limit={selectedCategory.monthlyLimit} 
							spent={categorySpent} />
						<br />
					</div>
				)}
				<Button variant="success" onClick={submitFunc}>Submit</Button>
			</Card.Body>
		</Card>
	);
};

export default SpendingAdder;