import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class EditPost extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			title: '',
			description: '',
			location: '',
			image: '',
			date: new Date(),
			users: []
		};
	}

	componentDidMount = () => {
		axios
			.get('http://localhost:5000/posts/' + this.props.match.params.id)
			.then((response) => {
				this.setState({
					username: response.data.username,
					title: response.data.title,
					description: response.data.description,
					location: response.data.location,
					image: response.data.image,
					date: new Date(response.data.date)
				});
			})
			.catch((error) => {
				console.log(error);
			});

		axios.get('http://localhost:5000/users/').then((res) => {
			if (res.data.length > 0) {
				this.setState({
					users: res.data.map((user) => user.username)
				});
			}
		});
	};

	onChangeUsername = (e) => {
		this.setState({
			username: e.target.value
		});
	};

	onChangeTitle = (e) => {
		this.setState({
			title: e.target.value
		});
	};

	onChangeDescription = (e) => {
		this.setState({
			description: e.target.value
		});
	};

	onChangeLocation = (e) => {
		this.setState({
			location: e.target.value
		});
	};

	onChangeImage = (e) => {
		this.setState({
			image: e.target.value
		});
	};

	onChangeDate = (date) => {
		this.setState({
			date: date
		});
	};

	onSubmit = (e) => {
		e.preventDefault();

		const post = {
			username: this.state.username,
			title: this.state.title,
			description: this.state.description,
			location: this.state.location,
			image: this.state.image,
			date: this.state.date
		};

		console.log(post);
		axios
			.post('http://localhost:5000/posts/update/' + this.props.match.params.id, post)
			.then((res) => console.log(res.data));

		window.location = '/postpage/' + this.props.match.params.id;
	};

	render() {
		return (
			<div>
				<h3>Edit Post</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Username: </label>
						<select
							ref="userInput"
							required
							className="form-control"
							value={this.state.username}
							onChange={this.onChangeUsername}
						>
							{this.state.users.map((user) => {
								return (
									<option key={user} value={user}>
										{user}
									</option>
								);
							})}
						</select>
					</div>
					<div className="form-group">
						<label>Title: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.title}
							onChange={this.onChangeTitle}
						/>
					</div>
					<div className="form-group">
						<label>Description: </label>
						<textarea
							type="text"
							required
							className="form-control"
							value={this.state.description}
							onChange={this.onChangeDescription}
							rows="6"
						/>
					</div>
					<div className="form-group">
						<label>Location: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.location}
							onChange={this.onChangeLocation}
						/>
					</div>
					<div className="form-group">
						<label>Image Link: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.image}
							onChange={this.onChangeImage}
						/>
					</div>
					<div className="form-group">
						<label>Date: </label>
						<div>
							<DatePicker selected={this.state.date} onChange={this.onChangeDate} />
						</div>
					</div>

					<div className="form-group">
						<input type="submit" value="Edit Post" className="btn btn-primary" />
					</div>
				</form>
			</div>
		);
	}
}
