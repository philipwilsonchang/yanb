import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { FormControl, FormControlProps } from 'react-bootstrap/FormContext';

interface ILoginDisplayProps {
  onNameChange: (name: string) => void,
  onPasswordChange: (pw: string) => void,
  onSubmit: () => void,
};

const LoginDisplay: React.FC<ILoginDisplayProps> = ({ onNameChange, onPasswordChange, onSubmit }) => {
	return (
		<Card>
			<Card.Body>
        <Form>
			    <Form.Row>
				    <Col>
				        <Form.Control placeholder="Email" onChange={(e: React.FormEvent<FormControlProps & FormControl>) => onNameChange(e.currentTarget.value as string)}/>
				    </Col>
				    <Col>
				        <Form.Control placeholder="Password" onChange={(e: React.FormEvent<FormControlProps & FormControl>) => onPasswordChange(e.currentTarget.value as string)}/>
				    </Col>
				    <Button style={{ margin: '0px 5px 0px 0px' }} variant="outline-success" onClick={onSubmit}>
			      	Login
			      </Button>
			    </Form.Row>
			</Form>
			</Card.Body>
		</Card>
	);
};

export default LoginDisplay;