import React from 'react';

import { FormControl, FormControlProps } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";

export type FlexCategory = {
	name: string,
	limit: number
};

interface IFlexCategoryListProps {
	categories: FlexCategory[],
	newName: string,
	newLimit: number,
	changeNewName(name: string): void,
	changeNewLimit(amount: number): void, 
	removeCategory(name: string): void,
	submitCategory(): void
};

const FlexCategoryList: React.FC<IFlexCategoryListProps> = ({ categories, newName, newLimit, changeNewName, changeNewLimit, removeCategory, submitCategory }) => {
	return (
		<Card>
			<Card.Header>Flex Monthly Cost Categories</Card.Header>
			<Card.Body>
			<Table striped bordered hover>
			  <thead>
			    <tr>
			      <th></th>
			      <th>Name</th>
			      <th>Limit</th>
			    </tr>
			  </thead>
			  <tbody>
			  	{categories.map(category => 
			  		(<tr key={category.name}>
				      <td style={{ textAlign: 'center', width: '25px' }}>
				      	<Button variant="outline-danger" onClick={() => removeCategory(category.name)}>
				      		<FaTrashAlt />
				      	</Button>
				      </td>
				      <td>{category.name}</td>
				      <td>${category.limit.toFixed(2)}</td>
			    	</tr>)
			  	)} 
			  </tbody>
			</Table>
			<Form>
			    <Form.Row>
			    	<Col>
			      	</Col>
				    <Col>
				        <Form.Control placeholder="Category name" onChange={(e: React.FormEvent<FormControlProps & FormControl>) => changeNewName(e.currentTarget.value as string)}/>
				    </Col>
				    <Col>
				        <Form.Control placeholder="Category limit" onChange={(e: React.FormEvent<FormControlProps & FormControl>) => changeNewLimit(parseFloat(e.currentTarget.value as string))}/>
				    </Col>
				    <Button variant="outline-success" onClick={submitCategory}>
			      		<FaPlusCircle />
			      	</Button>
			    </Form.Row>
			</Form>
			</Card.Body>
		</Card>
	);
};

export default FlexCategoryList;