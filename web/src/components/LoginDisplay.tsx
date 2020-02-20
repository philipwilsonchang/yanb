import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { FormControl, FormControlProps } from 'react-bootstrap';

// @ts-ignore
const recaptchaKey = window._env_ ? window._env_.RECAPTCHA_SITE_KEY : false

interface ILoginDisplayProps {
  onNameChange: (name: string) => void,
  onPasswordChange: (pw: string) => void,
	onSubmit: () => void,
	onSignup: () => void,
};

const LoginDisplay: React.FC<ILoginDisplayProps> = ({ onNameChange, onPasswordChange, onSubmit, onSignup }) => {
	const [verified, setVerified] = useState<boolean>(!recaptchaKey);

	const handleCaptcha = (token: string | null) => {
		if (token) {
			setVerified(true);
		} else {
			setVerified(false);
		}
	}

	return (
		<Card>
			<Card.Body>
        <Form>
			    <Form.Row>
				    <Col>
								{/* 
								// @ts-ignore */}
				        <Form.Control placeholder="Username" onChange={(e: React.FormEvent<FormControlProps & FormControl>) => onNameChange(e.currentTarget.value as string)}/>
				    </Col>
				    <Col>
								{/* 
								// @ts-ignore */}
				        <Form.Control type="password" placeholder="Password" onChange={(e: React.FormEvent<FormControlProps & FormControl>) => onPasswordChange(e.currentTarget.value as string)}/>
				    </Col>
						{/* 
						// @ts-ignore */}
						{recaptchaKey && (<ReCAPTCHA sitekey={recaptchaKey || ""} onChange={handleCaptcha} />)}
				    <Button disabled={!verified} style={{ margin: '0px 5px 0px 0px' }} variant="outline-primary" onClick={onSubmit}>
			      	Login
			      </Button>
						<Button disabled={!verified} style={{ margin: '0px 5px 0px 0px' }} variant="outline-danger" onClick={onSignup}>
			      	Signup
			      </Button>
			    </Form.Row>
			</Form>
			</Card.Body>
		</Card>
	);
};

export default LoginDisplay;