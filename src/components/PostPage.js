import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'
import BlogCard from './BlogCard'

export  class PostPage extends Component {
    constructor(props){
        super(props)

        this.state = {
            _id: '',
            username: '',
            userName: '',
            title: '',
            description: '',
            location: '',
            image: '',
            date: '',
            users: [],
            posts: []
        }

    }

    componentDidMount=()=> {
        axios.get('http://localhost:5000/posts/' + this.props.match.params.id)
        .then(response => {
            this.setState({
                _id: response.data._id,
                username: response.data.username,
                userName: response.data.userName,
                email: response.data.email,
                title: response.data.title,
                description: response.data.description,
                location: response.data.location,
                image: response.data.image,
                date: new Date(response.data.date)
            })
        })
        .catch((error)=>{
            console.log(error)
        })

        axios
        .get('http://localhost:5000/posts/')
        .then((res) => {
            this.setState({
                posts: res.data
            });
        })
        .catch((error) => console.log(error));

    }


    render() {
        return (
            <div>
        <Container>
            <Row>
                <Col lg={12}>
    <h1>{this.state.title}</h1>
    <h4>Post by {this.state.userName? this.state.userName: this.state.username}</h4>
                </Col>
                <Col lg={9}>

    {/* <h5>{this.state.date}</h5> */}
    <img className='featuredImage' src={this.state.image}></img>
        <h3>{this.state.location}</h3>
    <p>{this.state.description}</p>
    <p>Feel free to reach out at {this.state.email}</p>

    <Link to={"/edit/"+this.state._id}><input type="submit" value="Go Edit" className="btn btn-primary" /></Link>
                </Col>
                <Col lg={3}>
                <BlogCard posts={this.state.posts} />
                </Col>
            </Row>



        </Container>
            </div>
        )
    }
}

export default PostPage
