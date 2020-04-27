import React, { Component } from 'react';
import Leaflet from './Leaflet';
import { Button, Col, Container, Row, InputGroup, FormControl } from 'react-bootstrap';
import BlogCard from './BlogCard';
import axios from 'axios';
import BlogList from './BlogList';

export class HomeBody extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mapLayer: true,
			search: '',
			posts: [],
			lat: 0,
			lon: 40,
			zoom: 1.5
		};
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/posts/')
			.then((res) => {
				this.setState({
					posts: res.data
				});
				console.log(this.state.posts);
			})
			.catch((error) => console.log(error));
	}

	onChangeSearch = (e) => {
		this.setState({
			search: e.target.value
		});
	};

	searchByCountry = () => {
		axios.post('http://localhost:5000/posts/search/' + this.state.search).then((res) => {
			this.setState({
				posts: res.data
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
		return (
			<div>
				<span>
					<h1>Explore</h1>
					<Button onClick={this.toggleMapLayer}>
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
						<Button variant="outline-secondary" onClick={this.searchByUser}>Search By User</Button>
					</InputGroup.Append>
				</InputGroup>

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
			</div>
		);
	}
}

export default HomeBody;
