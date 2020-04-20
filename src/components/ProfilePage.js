import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';


const Post = (props) => (
	<tr>
		<td>{props.posts.userName ? props.posts.userName : props.posts.username}</td>
		<td>
			<Link to={'/postpage/' + props.posts._id}>{props.posts.title}</Link>
		</td>
		<td>{props.posts.location}</td>
		<td>{props.posts.date.substring(0, 10)}</td>
		<td>
			<Link to={'/edit/' + props.posts._id}>
				<Button>edit</Button>
			</Link>{' '}
			{' '}
			<a
				href="#"
				onClick={() => {
					props.deletePost(props.posts._id);
				}}
			>
				<Button>delete</Button>
			</a>
			<Link to={'/postpage/' + props.posts._id}>
				<Button>Go to Post</Button>
			</Link>
		</td>
	</tr>
);

export class ProfilePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			displayName: '',
			email: '',
            posts: [],
            lat: 0,
			lng: 40,
			zoom: 1.5,
			positions: []
		};
	}

	componentDidMount = () => {
		
     this.props.establishDisplayName()
		// bring in user specific posts query email
		let query = {
			userName: this.props.displayName
		};
		console.log(query);
		axios
			.post('http://localhost:5000/posts/find_user/' + this.props.displayName)
			.then((res) => {
				this.setState({
					posts: res.data
                });
                console.log(this.state.posts)
			})
			.catch((error) => console.log(error));
	};

	postList = () => {
		return this.state.posts.map((currentPost) => {
			return <Post posts={currentPost} deletePost={this.deletePost} key={currentPost._id} />;
		});
	};

	render() {
		let center = [ this.state.lat, this.state.lng ];
		return (
			<div>
				{/* display name */}
				<div className="user_info">
					<h1>The travels of {this.props.displayName}</h1>
				</div>
				{/* map with users posts  */}
				
                <div className="leaflet-container">
				<Map center={center} zoom={this.state.zoom}>
					<TileLayer
						attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
						url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
					/>
					<Marker position={center}>
						<Popup>
							<Link to="/postpage/5e8389a1c32d850a398fecd3">Under the Trees</Link>
						</Popup>
					</Marker>
					

			
					
				</Map>
			</div>
            
				{/*blog list of posts with  edit option*/}
				<div className="blog_list">
					<div>
						<h3>Posts</h3>
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
		);
	}
}

export default ProfilePage;
