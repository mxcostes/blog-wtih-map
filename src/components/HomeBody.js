import React, { Component } from 'react'
import Leaflet from './Leaflet'
import {Button, Col, Container, Row} from 'react-bootstrap'
import BlogCard from './BlogCard'
import axios from 'axios'
import BlogList from './BlogList'


export class HomeBody extends Component {
    constructor(props){
        super(props)
this.state = {
    mapLayer: true,
    posts: []
}

    }

    componentDidMount() {
		axios
			.get('http://localhost:5000/posts/')
			.then((res) => {
				this.setState({
					posts: res.data
				})
				console.log(this.state.posts)
			})
			.catch((error) => console.log(error));
			
		
	}

    toggleMapLayer=()=> {
        if(this.state.mapLayer){
            this.setState({
                mapLayer: false
            })
        } else {
            this.setState({
                mapLayer: true
            })
        }
    }

    render() {
        return (
            <div>
                <span><h1>Explore</h1><Button onClick={this.toggleMapLayer}>{this.state.mapLayer? "See Lines": "See Sat Imagery"}</Button></span>
                <Container>
                    <Row>
                    <Col lg={9}>
                <Leaflet toggleMapLayer={this.toggleMapLayer} mapLayer={this.state.mapLayer}/>
                <BlogList />
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

export default HomeBody
