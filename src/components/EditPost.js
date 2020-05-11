import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import firebase from 'firebase';

let post = [];

export default class EditPost extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userName: '',
			email: '',
			title: '',
			description: '',
			location: '',
			lat: '',
			lon: '',
			country: '',
			image: '',
			date: 'new Date()',
			users: [],
			post: null
		};
	}

	componentDidMount = () => {
		this.loadFeature();
		// this.setValues()
		// axios
		// 	.get('http://localhost:5000/posts/' + this.props.match.params.id)
		// 	.then((response) => {
		// 		this.setState({
		// 			userName: response.data.userName ? response.data.userName : response.data.username,
		// 			email: response.data.email,
		// 			title: response.data.title,
		// 			description: response.data.description,
		// 			location: response.data.location,
		// 			lat: response.data.lat,
		// 			lon: response.data.lon,
		// 			country: response.data.country,
		// 			image: response.data.image,
		// 			date: new Date(response.data.date)
		// 		});
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});

		// axios.get('http://localhost:5000/users/').then((res) => {
		// 	if (res.data.length > 0) {
		// 		this.setState({
		// 			users: res.data.map((user) => user.username)
		// 		});
		// 	}
		// });
	};

	loadFeature = () => {
		const db = firebase.firestore();

		let param = this.props.match.params.id;
		db
			.collection('posts')
			.doc(param)
			.get()
			.then((doc) => {
				if (doc.exists) {
					post.push({
						key: param,
						post: doc.data()
					});
				}
			})
			.then(() => {
				this.setState({
					post: post,
					userName: post[0].post.userName,
					email: post[0].post.email,
					title: post[0].post.title,
					description: post[0].post.description,
					location: post[0].post.location,
					lat: post[0].post.lat,
					lon: post[0].post.lon,
					country: post[0].post.country,
					image: post[0].post.image,
					date: 'placeholder'

				});
			});
	};

	

	onChangeUserName = (e) => {
		this.setState({
			userName: e.target.value
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
	getLatLon = () => {
		fetch(`https://nominatim.openstreetmap.org/search/?q=${this.state.location}&format=json`)
			.then((data) => {
				return data.json();
			})
			.then((locInfo) => {
				let info = locInfo[0];
				console.log(info);
				let lat = info.lat;
				let lon = info.lon;
				this.setState({
					lat: lat,
					lon: lon
				});
			});
	};

	onSubmit = (e) => {
		e.preventDefault();
		const db = firebase.firestore();

		let param = this.props.match.params.id;
		db.collection('posts').doc(param).update({
			'post.userName': this.state.userName,
			'post.userName': this.state.userName,
			'post.email': this.state.email,
			'post.title': this.state.title,
			'post.description': this.state.description,
			'post.location': this.state.location,
			'post.lat': this.state.lat,
			'post.lon': this.state.lon,
			'post.country': this.state.country,
			'post.image': this.state.image,
			'post.date': this.state.date
		})
		.then(()=> {
			console.log('success')
		  })
		  .catch((err)=> {
			console.log
			(err)
		  })

		// const post = {
		// 	userName: this.state.userName,
		// 	email: this.state.email,
		// 	title: this.state.title,
		// 	description: this.state.description,
		// 	location: this.state.location,
		// 	lat: this.state.lat,
		// 	lon: this.state.lon,
		// 	country: this.state.country,
		// 	image: this.state.image,
		// 	date: this.state.date
		// };

		// console.log(post);
		// axios
		// 	.post('http://localhost:5000/posts/update/' + this.props.match.params.id, post)
		// 	.then((res) => console.log(res.data));

		// window.location = '/postpage/' + this.props.match.params.id;
	};
	consoleClick = () => {
		console.log(this.state.array);
		console.log(post);
		console.log(this.state);
		console.log(this.state.post[0]);
		console.log(this.state.post[0].post);
		console.log(this.state.post[0].post.title);
		console.log(this.state.userName);
	};

	render() {
		return (
			<div>
				<h3 onClick={this.consoleClick}>Edit Post</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Username: </label>
						<h4>{this.state.userName}</h4>
					</div>
					<div className="form-group">
						<label>Email: </label>
						<h4>{this.state.email}</h4>
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
						<label>Coordinates: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.lat + ',' + this.state.lon}
							onFocus={this.getLatLon}
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
							{/* <DatePicker selected={this.state.date} onChange={this.onChangeDate} /> */}
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
