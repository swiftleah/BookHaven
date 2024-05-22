/**
 * Setting up routes for:
 * resgistration,
 * login &
 * dashboard
 */
import React from 'react';
// Wraps entire application and enables routing
// Where route - defines path & component to be rendered when URL matches
// Where switch - ensures one route renders at a time
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// importing components to be rendered
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/dashboard';

function App() {
	return (
		// Wraps application
		<Router>
		// Container for components
		<div className="app">
		<Switch>
			<Route path="/register" component={Register} />
			<Route path="/login" component={Login} />
			<Route path="/dashboard" component={Dashboard} />
		</Switch>
		</div>
		</Router>
	);
}

export default App;
