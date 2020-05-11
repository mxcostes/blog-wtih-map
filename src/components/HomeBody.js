import React, { Component } from 'react';
import Leaflet from './Leaflet';
import { Button, Col, Container, Row, InputGroup, FormControl } from 'react-bootstrap';
import BlogCard from './BlogCard';
import axios from 'axios';
import BlogList from './BlogList';
import firebase from 'firebase';

let array = [];
let countrySearch = [];
export class HomeBody extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mapLayer: true,
			search: '',
			posts: null,
			lat: 0,
			lon: 40,
			zoom: 1.5
		};
	}

	componentDidMount = () => {
		this.loadPosts();
	};

	loadPosts = () => {
		const db = firebase.firestore();
		db.collection('posts').get().then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				// doc.data() is never undefined for query doc snapshots
				array.push({
					key: doc.id,
					post: doc.data()
				});
			});
		})
		.then(()=> {
			this.setState({
				posts: array
			});

		})
	};

	onChangeSearch = (e) => {
		this.setState({
			search: e.target.value
		});
	};

	searchByCountry = () => {
		const db = firebase.firestore();
		db.collection('posts').where('country', '==', this.state.search).get().then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				// doc.data() is never undefined for query doc snapshots
				console.log(doc.id, ' => ', doc.data());
				countrySearch.push(doc.data());
			});
		});
		this.setState({
			posts: countrySearch
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
				console.log(countrySearch);
			});
	};

	searchByUser = () => {
		axios
			.post('http://localhost:5000/posts/find_user/' + this.state.search)
			.then((res) => {
				this.setState({
					posts: res.data,
					lat: 0,
					lon: 40,
					zoom: 1.5
				});
				console.log(this.state.posts);
			})
			.catch((error) => console.log(error));
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
		if (!this.state.posts) {
			return <div />;
		}
		return (
			<div>
				<span>
					<h1>Explore</h1>
					<Button className="mb-3" onClick={this.toggleMapLayer}>
						{this.state.mapLayer ? 'See Lines' : 'See Sat Imagery'}
					</Button>
				</span>
				{/* <input placeholder="Search by username or country" onChange={this.onChangeSearch} /> */}
				{/* <Button onClick={this.searchByCountry}>Search</Button> */}
				<InputGroup>
					<FormControl
						placeholder="Search by Country or User"
						aria-label="Search by Country or User"
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
							<Col lg={9}>
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
