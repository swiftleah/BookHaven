/**
 * Component for registration
 */

// useState - add state to functional components
import React, { useState } from 'react';
// For making HTTP requests
import axios from 'axios';
// Gives access to history instance
import { useHistory } from 'react-router-dom';

// Functional React component
const Register = () => {
	// Initializing empty obj (formData) with fields below
	// setFormData used to update formData
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: ''
	});

	const history = useHistory();

	const { username, emai, password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post('http://localhost:3000/api/auth/register', formData);
			console.log(res.data);
			history.push('/login');
		} catch (err) {
			console.error(err.response.data);
		}
	};

	return (
		<div>
			<h2>Register</h2>
			<form onSubmit={onSubmit}>
				<input type="text" name="username" value={username} onChange={onChange} placeholder="Username" required />
			<input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
			<input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
			<button type="submit">Register</button>
			</form>
		</div>
	);
};

export default Register;
