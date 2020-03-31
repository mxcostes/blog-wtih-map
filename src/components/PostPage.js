import React, { Component } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export  class PostPage extends Component {
    constructor(props){
        super(props)

        this.state = {
            username: '',
            description: '',
            location: '',
            image: '',
            date: new Date(),
            users: [],
        }

    }

    componentDidMount=()=> {
        axios.get('http://localhost:5000/posts/' + this.props.match.params.id)
        .then(response => {
            this.setState({
                username: response.data.username,
                description: response.data.description,
                location: response.data.location,
                image: response.data.image,
                date: new Date(response.data.date)
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }


    render() {
        return (
            <div>
    <h1>Post by {this.state.username}</h1>
    {/* <h4>{this.state.date}</h4> */}
    <img className='featuredImage' src={this.state.image}></img>
        <h3>{this.state.location}</h3>
    <p>{this.state.description}</p>
            </div>
        )
    }
}

export default PostPage
