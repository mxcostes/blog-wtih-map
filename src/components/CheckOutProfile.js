import React, { Component } from 'react'
import axios from 'axios'
import {Container, Row, Col, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import BlogCard from './BlogCard'

const Post = (props) => (
	<tr>
		<td>{props.posts.userName? props.posts.userName : props.posts.username }</td>
		<td>
			<Link to={'/postpage/' + props.posts._id}>{props.posts.title}</Link>
		</td>
		<td>{props.posts.location}</td>
		<td>{props.posts.date.substring(0, 10)}</td>
		<td>
			<Link to={'/postpage/' + props.posts._id}><Button>Go to Post</Button></Link>
		</td>
	</tr>
);

const  Mark = (props) => (
	
	<Marker position={[props.posts.lat,props.posts.lon]}>
							<Popup>
								<Link to={'/postpage/' + props.posts._id}>{props.posts.title}</Link>
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
        axios
        .post('http://localhost:5000/posts/check_out/' + this.props.match.params.name)
        .then((res) => {
            this.setState({
                posts: res.data
            });
            console.log( this.props.match.params.name)
            console.log(this.state.posts)
        })
        .catch((error) => console.log(error));
    }

    postList = () => {
		return this.state.posts.map((currentPost) => {
			return <Post posts={currentPost} delete={this.deletePost}  key={currentPost._id} />;
		});
    };
    markList = () => {
		return this.state.posts.map((currentPost) => {
			return <Mark posts={currentPost}  key={currentPost._id} />;
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