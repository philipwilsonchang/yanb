import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import LoginDisplay from '../components/LoginDisplay';
import {
	LOGIN,
	LoginResult,
} from '../graphql/mutations';

export interface ILoginContainerProps {
  onLogin: (token: string) => void
}

const LoginContainer: React.FC<ILoginContainerProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [login] = useMutation<LoginResult>(LOGIN, {
		refetchQueries: ["getAllFlexCategoriesBetweenTimes", "getAllRollingCategoriesBetweenTimes"]
  });
  
  const handleLogin = async (): Promise<void> => {
		if (username.length !== 0 && password.length !== 0) {
			const { data: loginResult } = await login({
				variables: {
					username: username,
					password: password,
				}
			});
			if (loginResult) {
				onLogin(loginResult.login.token)
			}
		}
  };

  return (
    <LoginDisplay onNameChange={setUsername} onPasswordChange={setPassword} onSubmit={handleLogin} />
  );
}

export default LoginContainer;