import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const Post = (props) => (
	<tr>
		<td>
			<Link to={'/check_out/'+props.posts.post.userName}>
				{props.posts.post.userName}
				</Link>
				</td>
		<td>
			<Link to={'/postpage/' + props.posts.key}>{props.posts.post.title}</Link>
		</td>
		<td>{props.posts.post.location}</td>
		<td>Date!</td>
		<td>
			<Link to={'/postpage/' + props.posts.key}><Button>Go to Post</Button></Link>
		</td>
	</tr>
);

export default class BlogList extends Component {
	constructor(props) {
		super(props);

		this.deletePost = this.deletePost.bind(this);

		this.state = { 
			posts: [],
			search: ''
		
		};
	}


	

	deletePost(id) {
		axios.delete('http://localhost:5000/posts/' + id).then((res) => console.log(res.data));
		this.setState({
			posts: this.state.posts.filter((el) => el._id !== id)
		});
	}

	postList = () => {
		return this.props.posts.map((currentPost) => {
			return <Post posts={currentPost} deletePost={this.deletePost} key={currentPost.key} />;
		});
	};

	render() {
		return (
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
		);
	}
}
