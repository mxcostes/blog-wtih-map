import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default class CreatePost extends Component {
    constructor(props){
        super(props)

        this.state = {
            username: '',
            title: '',
            description: '',
            location: '',
            image: '',
            date: new Date(),
            users: [],
        }

    }

    componentDidMount=()=> {
        axios.get('http://localhost:5000/users/')
        .then(res => {
            if(res.data.length > 0){
                this.setState({
                    users: res.data.map(user => user.username),
                    username: res.data[0].username
                })
            }
        })
    }

    onChangeUsername = (e)=> {
        this.setState({
            username: e.target.value
        })
    }
    
    onChangeTitle = (e)=> {
      this.setState({
          title: e.target.value
      })
  }

    onChangeDescription = (e)=> {
        this.setState({
            description: e.target.value
        })
    }

    onChangeLocation = (e)=> {
        this.setState({
            location: e.target.value
        })
    }

    onChangeImage = (e)=> {
        this.setState({
            image: e.target.value
        })
    }

    onChangeDate = (date)=> {
        this.setState({
           date: date
        })
    }
    
    onChangeImageTitle=(e) => {
      this.setState({
          title: e.target.value
      })
      }
      
      onChangeUploadImage=(e)=> {
          this.setState({
              uploadImage: e.target.files[0]
          })
      }
      
      onSubmit=(e)=>{
          e.preventDault()
          let formData = new FormData()
          formData.append("title", this.state.title)
          formData.append("image", this.state.image)
          this.props.addImage(formData)
      
          this.setState({
              imageTitle: '',
              image: ''
          })
      }

    onSubmit=(e)=>{
        e.preventDefault()
        let formData = new FormData()
          formData.append("title", this.state.title)
          formData.append("image", this.state.image)
          // this.props.addImage(formData)

        const post = {
            username: this.state.username,
            title: this.state.title,
            description: this.state.description,
            location: this.state.location,
            image: this.state.image,
            imageTitle: this.state.imageTitle,
            uploadImage: this.state.username,
            date: this.state.date,
        }

        console.log(post)
        axios.post('http://localhost:5000/posts/add', post)
        .then(res => console.log(res.data))

        window.location = '/blogs'
        
    }



    render() {
        return (
            <div>
      <h3>Create New Post</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map((user)=> {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Title: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <textarea  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              rows= '6'
              />
        </div>
        <div className="form-group">
          <label>Location: </label>
          <input 
          placeholder='City, Country'
              type="text" 
              className="form-control"
              value={this.state.location}
              onChange={this.onChangeLocation}
              />
        </div>
        <div className="form-group">
          <label>Image Link: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.image}
              onChange={this.onChangeImage}
              />
              <label className='form-label'>Upload Image Title</label>
                <input 
                className='form-input' 
                placeholder='Enter image title' 
                type='text'
                value={this.state.imageTitle}
                onChange={this.onChangeimageTitle}
                ></input>
                <label className='form-label'> Choose an Image to Upload</label>
                <input 
                type='file'
                className='form-input'
                name='image'
                accept='image/*'
                onChange={this.onChangeuploadImage}></input>
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Post" className="btn btn-primary" />
        </div> 
      </form>
    </div>
    )
  }
}
