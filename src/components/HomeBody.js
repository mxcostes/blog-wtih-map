import React, { Component } from 'react';
import Leaflet from './Leaflet';
import { Button, Col, Container, Row, InputGroup, FormControl } from 'react-bootstrap';
import BlogCard from './BlogCard';
import axios from 'axios';
import BlogList from './BlogList';
import firebase from 'firebase';

export class HomeBody extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mapLayer: true,
			search: '',
			posts: null,
			lat: 0,
			lon: 40,
			zoom: 1.5,
			showButton: false
		};
	}

	componentDidMount = () => {
		this.loadPosts();
	};

	loadPosts = () => {
		let array = [];
		const db = firebase.firestore();
		db
			.collection('posts')
			.orderBy('date', 'desc')
			.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					// doc.data() is never undefined for query doc snapshots
					array.push({
						key: doc.id,
						post: doc.data()
					});
				});
			})
			.then(() => {
				this.setState({
					posts: array,
					lat: 0,
					lon: 40,
					zoom: 1.5,
					showButton: false,
					search: ''
				});
			});
	};

	onChangeSearch = (e) => {
		this.setState({
			search: e.target.value
		});
	};

	searchByCountry = () => {
		let countrySearch = [];
		const db = firebase.firestore();
		db
			.collection('posts')
			.where('country', '==', ' ' + this.state.search)
			.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					// doc.data() is never undefined for query doc snapshots
					console.log(doc.id, ' => ', doc.data());
					countrySearch.push({
						key: doc.id,
						post: doc.data()
					});
				});
			})
			.then(() => {
				this.setState({
					posts: countrySearch,
					showButton: true
				});
			});
		fetch(`https://nominatim.openstreetmap.org/search/?q=${this.state.search}&format=json`)
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
					lon: lon,
					zoom: 4
				});
				console.log(this.state.lat, this.state.lon);
			});
	};

	searchByUser = () => {
		let countrySearch = [];
		const db = firebase.firestore();
		db
			.collection('posts')
			.where('userName', '==', this.state.search)
			.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					// doc.data() is never undefined for query doc snapshots
					console.log(doc.id, ' => ', doc.data());
					countrySearch.push({
						key: doc.id,
						post: doc.data()
					});
				});
			})
			.then(() => {
				this.setState({
					posts: countrySearch,
					lat: 0,
					lon: 40,
					zoom: 1.5,
					showButton: true
				});
			});
	};

	toggleMapLayer = () => {
		if (this.state.mapLayer) {
			this.setState({
				mapLayer: false
			});
		} else {
			this.setState({
				mapLayer: true
			});
		}
	};

	render() {
		// if (!this.state.posts) {
		// 	return <div />;
		// }
		return (
			<div>
				<Container>
					<Row>
					<Col lg={12} md={12} sm={12} xs={12}>
						<h1>Explore</h1>
					</Col>
					<Col lg={12} md={12} sm={12} xs={12}>
						<Button className="mb-3" onClick={this.toggleMapLayer}>
							{this.state.mapLayer ? 'See Lines' : 'See Sat Imagery'}
						</Button>
						{this.state.showButton ? (
							<Button className="mb-3 ml-3" onClick={this.loadPosts}>
								See all Posts
							</Button>
						) : (
							<div />
						)}
					</Col>
					</Row>
				</Container>
				{/* <input placeholder="Search by username or country" onChange={this.onChangeSearch} /> */}
				{/* <Button onClick={this.searchByCountry}>Search</Button> */}
				<InputGroup>
					<FormControl
						placeholder="Search by Country or User"
						aria-label="Search by Country or User"
						value={this.state.search}
						aria-describedby="basic-addon2"
						onChange={this.onChangeSearch}
					/>
					<InputGroup.Append>
						<Button variant="outline-secondary" onClick={this.searchByCountry}>
							Search By Country
						</Button>
						<Button variant="outline-secondary" onClick={this.searchByUser}>
							Search By User
						</Button>
					</InputGroup.Append>
				</InputGroup>

				{this.state.posts ? (
					<Container>
						<Row>
							<Col lg={9}  className='mb-3'>
								<Leaflet
									toggleMapLayer={this.toggleMapLayer}
									mapLayer={this.state.mapLayer}
									posts={this.state.posts}
									lat={this.state.lat}
									lon={this.state.lon}
									zoom={this.state.zoom}
								/>
								<BlogList posts={this.state.posts} />
							</Col>
							<Col lg={3}>
								<BlogCard posts={this.state.posts} />
							</Col>
						</Row>
					</Container>
				) : (
					<div />
				)}
			</div>
		);
	}
}

export default HomeBody;
