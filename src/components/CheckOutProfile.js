import React, { Component } from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import BlogCard from './BlogCard'
import firebase from 'firebase' 




const Post = (props) => (
	<tr>
		<td className="font-class text-light">{props.posts.post.userName}</td>
		<td className="font-class text-light">
			<Link className="font-class text-light" to={'/postpage/' + props.posts.key}>{props.posts.post.title}</Link>
		</td>
		<td className="font-class text-light">{props.posts.post.location}</td>
		<td className="font-class text-light">{props.posts.post.date}</td>
		<td>
			
		
			<Link to={'/postpage/' + props.posts.key}><Button>Visit</Button></Link>
		</td>
	</tr>
);

const  Mark = (props) => (
	
	<Marker position={[props.posts.post.lat,props.posts.post.lon]}>
							<Popup>
								<Link to={'/postpage/' + props.posts.key}>{props.posts.post.title}</Link>
							</Popup>
						</Marker>
)



export class CheckOutProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayName: '',
			email: '',
            posts: [],
            lat: 0,
			lng: 40,
			zoom: 1.5,

        }

};

componentDidMount() {
	  this.loadPosts()
	  
	}

	
	loadPosts=()=> {
		let posts = []
		const db = firebase.firestore();
        db.collection('posts').where("userName", '==', this.props.match.params.name)
        .get()
        .then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
                
				// doc.data() is never undefined for query doc snapshots
                posts.push({
					key: doc.id,
					post: doc.data()
				})
            })
            
		})
		.then(()=> {
			this.setState({
				posts: posts
			})

		})
	}

    postList = () => {
		return this.state.posts.map((currentPost) => {
			return <Post posts={currentPost} delete={this.deletePost}  key={currentPost.key} />;
		});
    };
    markList = () => {
		return this.state.posts.map((currentPost) => {
			return <Mark posts={currentPost}  key={currentPost.key} />;
		});
	};
    
    render() {
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
                <BlogCard 
                posts={this.state.posts}
                />
            </Col>
            </Row>
            </Container>
            
				
			</div>
		);
    }
}

export default CheckOutProfile
