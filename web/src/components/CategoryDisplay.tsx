import React from 'react';

import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';

interface ICategoryDisplayProps {
	name: string,
	limit: number,
	spent: number
};

const CategoryDisplay: React.FC<ICategoryDisplayProps> = ({ name, limit, spent }) => {
	const barLevel = spent / limit * 100;

	const setWarning = (value: number) => {
		const date = new Date();
		const dd = date.getDate();
		const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
		if (value > 100) {
			return "danger";
		} else if (spent > (limit / lastDay) * dd) {
			return "warning";
		} else {
			return "success";
		}
	}
	
	return (
		<Card>
			<Card.Header>{name}</Card.Header>
			<Card.Body className='card text-center'>
				<ProgressBar variant={setWarning(barLevel)} now={barLevel}/>
			</Card.Body>
			<Card.Body className='card text-right'>
				<Card.Text><i>Remaining:</i> <b>${(limit - spent).toFixed(2)}</b></Card.Text>
				<Card.Text><i>Spent:</i> <b>${spent.toFixed(2)}</b>   |   <i>Limit:</i> <b>${limit.toFixed(2)}</b></Card.Text>
			</Card.Body>
		</Card>
	);
};

export default CategoryDisplay;