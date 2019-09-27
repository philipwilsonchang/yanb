import React, { useState } from 'react';

import { FormControl, FormControlProps } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";

export type Cost = {
	name: string,
	amount: number
};

interface IFixedSpendingListProps {
	costs: Cost[],
	removeCost(name: string): void,
	addCost(name: string, amount: number): void
};

const FixedSpendingList: React.FC<IFixedSpendingListProps> = ({ costs, removeCost, addCost }) => {
	const [newName, setNewName] = useState("");
	const [newAmount, setNewAmount] = useState(0);

	return (
		<Card style={{ width: '75%'}}>
			<Card.Header>Fixed Monthly Costs</Card.Header>
			<Card.Body>
			<Table striped bordered hover>
			  <thead>
			    <tr>
			      <th></th>
			      <th>Monthly Cost</th>
			      <th>Amount</th>
			    </tr>
			  </thead>
			  <tbody>
			  	{costs.map(cost => 
			  		(<tr key={cost.name}>
				      <td style={{ textAlign: 'center', width: '25px' }}>
				      	<Button variant="outline-danger" onClick={() => removeCost(cost.name)}>
				      		<FaTrashAlt />
				      	</Button>
				      </td>
				      <td>{cost.name}</td>
				      <td>${cost.amount.toFixed(2)}</td>
			    	</tr>)
			  	)} 
			  </tbody>
			</Table>
			<Form>
			    <Form.Row>
			    	<Col>
			      	</Col>
				    <Col>
				        <Form.Control placeholder="Cost name" onChange={(e: React.FormEvent<FormControlProps & FormControl>) => setNewName(e.currentTarget.value as string)}/>
				    </Col>
				    <Col>
				        <Form.Control placeholder="Cost amount" onChange={(e: React.FormEvent<FormControlProps & FormControl>) => setNewAmount(parseFloat(e.currentTarget.value as string))}/>
				    </Col>
				    <Button variant="outline-success" onClick={() => addCost(newName, newAmount)}>
			      		<FaPlusCircle />
			      	</Button>
			    </Form.Row>
			</Form>
			</Card.Body>
		</Card>
	);
};

export default FixedSpendingList;