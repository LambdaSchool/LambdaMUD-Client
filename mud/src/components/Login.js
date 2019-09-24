import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: ''
		};
	}

	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = (e) => {
		// needs endpoints from backend
		e.preventDefault();
		const URL = 'https://adv-project-hunterxhunter.herokuapp.com/api/login/';
		axios
			.post(URL, {
				username: this.state.username,
				password: this.state.password
			})
			.then((res) => {
				// need to add token
				localStorage.setItem('token');
				// clears form
				this.setState({
					username: '',
					password: ''
				});
				this.PaymentResponse.history.push('');
			})
			.catch((err) => {
				alert('Enter Username and Password');
				this.setState({
					username: '',
					password: ''
				});
				console.log(err);
			});
	};

	render() {
		return (
			<Container className="login">
				<h1 className="title">Run Fun</h1>
				<Form className="form" onSubmit={this.handleSubmit}>
					<Col>
						<FormGroup>
							<Label>Username</Label>
							<Input
								name="username"
								type="text"
								placeholder="username"
								onChange={this.handleInput}
								value={this.state.username}
							/>
						</FormGroup>
					</Col>
					<Col>
						<FormGroup>
							<Label>Password</Label>
							<Input
								name="password"
								type="text"
								placeholder="password"
								onChange={this.handleInput}
								value={this.state.password}
							/>
						</FormGroup>
					</Col>
					<p>
						Don't have an account?
						<Link to="/register">Register</Link>
					</p>
					<Button>Sign In</Button>
				</Form>
			</Container>
		);
	}
}

export default Login;
