import { useNavigation } from '@renderer/hooks/UseNavigation';
import React from 'react';

const Settings: React.FC = () => {
	const { goBack } = useNavigation();

	return (
		<div>
			<h1>Settings</h1>
			<form>
				<div>
					<label htmlFor="username">Username:</label>
					<input type="text" id="username" name="username" />
				</div>
				<div>
					<label htmlFor="email">Email:</label>
					<input type="email" id="email" name="email" />
				</div>
				<div>
					<label htmlFor="password">Password:</label>
					<input type="password" id="password" name="password" />
				</div>
				<button type="submit">Save</button>

				<button onClick={() => goBack()}>Go to Home</button>
			</form>
		</div>
	);
};

export default Settings;
