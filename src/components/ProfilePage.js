import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import BlogCard from './BlogCard';
import firebase from 'firebase';

const Post = (props) => (
	<tr>
		<td className="font-class text-light">{props.posts.post.userName}</td>
		<td>
			<Link to={'/postpage/' + props.posts.key} className="font-class text-light">
				{props.posts.post.title}
			</Link>
		</td>
		<td className="font-class text-light">{props.posts.post.location}</td>
		{/* <td>{props.posts.date.substring(0, 10)}</td> */}
		<td className="font-class text-light">{props.posts.post.date}</td>

		<td>
			<Link to={'/edit/' + props.posts.key}>
				<Button className="mr-1 mb-1">Edit</Button>
			</Link>

			<Button onClick={props.delete} value={props.posts.key} className="mr-1 mb-1">
				Delete
			</Button>

			<Link to={'/postpage/' + props.posts.key}>
				<Button className="mr-1 mb-1">Visit</Button>
			</Link>
		</td>
	</tr>
);

const Mark = (props) => (
	<Marker position={[ props.posts.post.lat, props.posts.post.lon ]}>
		<Popup>
			<Link to={'/postpage/' + props.posts.key}>{props.posts.post.title}</Link>
		</Popup>
	</Marker>
);

export class ProfilePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			displayName: '',
			email: '',
			lat: 0,
			lng: 40,
			zoom: 1.5,
			posts: []
		};
	}

	componentDidMount() {
		this.loadPosts();
	}

	loadPosts = () => {
		let posts = [];
		const db = firebase.firestore();
		db
			.collection('posts')
			.where('userName', '==', this.props.match.params.name)
			.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					// doc.data() is never undefined for query doc snapshots
					posts.push({
						key: doc.id,
						post: doc.data()
					});
				});
			})
			.then(() => {
				this.setState({
					posts: posts
				});
			});
	};

	deletePost(e) {
		const db = firebase.firestore();
		db
			.collection('posts')
			.doc(e.target.value)
			.delete()
			.then(function() {
				console.log('Document successfully deleted!');
			})
			.then(() => {
				this.loadPosts();
			})
			.catch(function(error) {
				console.error('Error removing document: ', error);
			});
	}

	postList = () => {
		return this.state.posts.map((currentPost) => {
			return <Post posts={currentPost} delete={this.deletePost} key={currentPost.key} />;
		});
	};
	markList = () => {
		return this.state.posts.map((currentPost) => {
			return <Mark posts={currentPost} key={currentPost.key} />;
		});
	};

	render() {
		if (!this.props.displayName && !this.state.posts) {
			return <div />;
		}
		let center = [ this.state.lat, this.state.lng ];
		return (
			<div>
				{/* display name */}
				<div className="user_info">
					<h1>The travels of {this.props.match.params.name}</h1>
				</div>
				{/* map with users posts  */}

				<Container>
					<Row>
						<Col lg={9}>
							<div className="leaflet-container">
								<Map center={center} zoom={this.state.zoom}>
									<TileLayer
										attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
										url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
									/>

									{this.markList()}
								</Map>
							</div>
							{/*blog list of posts with  edit option*/}
							<div className="blog_list mb-3">
								<div>
									<h3>Posts</h3>
									<div className="blogBox bg-dark rounded">
										<table className="table">
											<thead className="thead-light">
												<tr>
													<th>Username</th>
													<th>Title</th>
													<th>Location</th>
													<th>Date</th>
													<th>Actions</th>
												</tr>
											</thead>
											<tbody>{this.postList()}</tbody>
										</table>
									</div>
								</div>
							</div>
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

export default ProfilePage;
