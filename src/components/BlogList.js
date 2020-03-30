import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Post = props => (
    <tr>
    <td>{props.posts.username}</td>
    <td>{props.posts.description}</td>
    <td>{props.posts.location}</td>
    <td>{props.posts.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.posts._id}>edit</Link> | <a href="#" onClick={() => { props.deletePost(props.post._id) }}>delete</a>
    </td>
  </tr>
)


export default class BlogList extends Component {
    constructor(props) {
        super(props)

        this.deletePost = this.deletePost.bind(this)

        this.state = {posts: []}
    }

    componentDidMount() {
        axios.get('http://localhost:5000/posts/')
        .then(res => {
            this.setState({
                posts: res.data
            })
        })
        .catch((error)=> console.log(error))
    }

    deletePost(id) {
axios.delete('http://localhost:5000/posts/' + id)
.then(res=> console.log(res.data))
this.setState({
    posts: this.state.posts.filter(el => el._id !== id)
})
    }

    postList=()=>{
        return this.state.posts.map(currentPost=> {
            return <Post posts={currentPost} deletePost={this.deletePost} key={currentPost._id} />
        })
    }


    render() {
        return (
            <div>
            <h3>Posts</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Username</th>
                  <th>Description</th>
                  <th>Duration</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.postList() }
              </tbody>
            </table>
          </div>
        )
      }
    }