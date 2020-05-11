import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import BlogCard from './BlogCard';
import firebase from 'firebase';

let array = [];
let post = [];
export class PostPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			array: [],
			post: []
		};
	}
	// this.props.match.params.id)
	componentDidMount = () => {
		this.loadFeature();
		this.loadCards();
	};

	loadFeature = () => {
		const db = firebase.firestore();

		let param = this.props.match.params.id;
		db.collection('posts').doc(param).get().then((doc) => {
			if (doc.exists) {
				post.push({
					key: param,
					post: doc.data()
				});
			}
		})
		.then(()=> {
			this.setState({
				post: post
			});

		})
	};

	loadCards = () => {
		const db = firebase.firestore();

		db.collection('posts').get().then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				// doc.data() is never undefined for query doc snapshots
				// console.log(doc.id, ' => ', doc.data());
				array.push({
					key: doc.id,
					post: doc.data()
				});
			});
		})
		.then(()=> {
			this.setState({
				array: array
			});

		})
	};

	consoleClick = () => {
		console.log(this.state.array);
		console.log(post);
        console.log(this.state);
        console.log(this.state.post[0]);
        console.log(this.state.post[0].post);
        console.log(this.state.post[0].post.title);
        
	};

	render() {
    if(!this.state.post[0]){return <div />}
		return (
			<div>
				<Container>
					<Row>
						<Col lg={12}>
							<h1>{this.state.post[0].post.title}</h1>
							<h4 onClick={this.consoleClick}>Post by {this.state.post[0].post.userName}  </h4>
						</Col>
						<Col lg={9}>
							<img className="featuredImage" src={this.state.post[0].post.image} />
							<h3>{this.state.post[0].post.location}</h3>
							<p>{this.state.post[0].post.description}</p>
							<p>Feel free to reach out at {this.state.post[0].post.email}</p>
						</Col>
						<Col lg={3}>
							<BlogCard posts={this.state.array} />
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default PostPage;
