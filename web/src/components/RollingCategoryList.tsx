import React from 'react';

import { FormControl, FormControlProps } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";

import { RollingCostCategory } from '../state/stateTypes';

interface IFlexCategoryListProps {
	budgetedAmount: number,
	categories: RollingCostCategory[],
	monthlyIncome: number,
	newName: string,
	newLimit: number,
	changeNewName(name: string): void,
	changeNewLimit(amount: number): void, 
	removeCategory(id: string): void,
	submitCategory(): void
};

const FlexCategoryList: React.FC<IFlexCategoryListProps> = ({ budgetedAmount, categories, monthlyIncome, newName, newLimit, changeNewName, changeNewLimit, removeCategory, submitCategory }) => {
	return (
		<Card>
			<Card.Header>Rolling Monthly Cost Categories</Card.Header>
			<Card.Body className='card text-right'>
			<Table striped bordered hover>
			  <thead>
			    <tr>
			      <th></th>
			      <th>Name</th>
			      <th>Monthly Limit</th>
			    </tr>
			  </thead>
			  <tbody>
			  	{categories.map(category => 
			  		(<tr key={`flexlist-${category.name}`}>
				      <td style={{ textAlign: 'center', width: '25px' }}>
				      	<Button variant="outline-danger" onClick={() => removeCategory(category.id)}>
				      		<FaTrashAlt />
				      	</Button>
				      </td>
				      <td>{category.name}</td>
				      <td>${category.monthlyLimit.toFixed(2)}</td>
			    	</tr>)
			  	)} 
			  </tbody>
			</Table>
			<Form>
			    <Form.Row>
				    <Col>
								{/* 
								// @ts-ignore */}
				        <Form.Control placeholder="Category name" onChange={(e: React.FormEvent<FormControlProps & FormControl>) => changeNewName(e.currentTarget.value as string)}/>
				    </Col>
				    <Col>
								{/* 
								// @ts-ignore */}
				        <Form.Control placeholder="Category limit" onChange={(e: React.FormEvent<FormControlProps & FormControl>) => changeNewLimit(parseFloat(e.currentTarget.value as string))}/>
				    </Col>
				    <Button style={{ margin: '0px 5px 0px 0px' }} variant="outline-success" onClick={submitCategory}>
			      		<FaPlusCircle />
			      	</Button>
			    </Form.Row>
			</Form>
			<br />
			<Card.Text><i>Remaining:</i> <b>${(monthlyIncome - budgetedAmount).toFixed(2)}</b>   |   <i>Total:</i> <b>${budgetedAmount.toFixed(2)}</b></Card.Text>
			</Card.Body>
		</Card>
	);
};

export default FlexCategoryList;