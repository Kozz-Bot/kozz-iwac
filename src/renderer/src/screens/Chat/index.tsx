import { useNavigation } from '@renderer/hooks/UseNavigation';
import React from 'react';

const Chat: React.FC = () => {
	const { goBack } = useNavigation();

	return (
		<div style={{ display: 'flex' }}>
			<div style={{ width: '30%', borderRight: '1px solid #ccc', padding: '10px' }}>
				<h2>Conversations</h2>
				<ul>
					<li>Conversation 1</li>
					<li>Conversation 2</li>
					<li>Conversation 3</li>
				</ul>
			</div>
			<div style={{ width: '70%', padding: '10px' }}>
				<h2>Chat Section</h2>
				<div
					style={{
						border: '1px solid #ccc',
						padding: '10px',
						height: '300px',
						overflowY: 'scroll',
					}}
				>
					<p>Message 1</p>
					<p>Message 2</p>
					<p>Message 3</p>
				</div>
				<form>
					<input
						type="text"
						placeholder="Type a message"
						style={{ width: '80%', padding: '5px' }}
					/>
					<button type="submit">Send</button>
				</form>
			</div>
		</div>
	);
};

export default Chat;
