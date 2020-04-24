import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default class CreatePost extends Component {
    constructor(props){
        super(props)

        this.state = {
            userName: '',
            email: '',
            title: '',
            description: '',
            location: '',
            lat: '',
            lon: '',
            country: '',
            image: '',
            date: new Date()
          
        }

    }

    // componentDidMount=()=> {
    //   this.setState({
    //     userName: this.props.displayName,
    //     email: this.props.userEmail
    //   })
    // }

    // get lat lon
getLatLon=()=> {
  fetch(`https://nominatim.openstreetmap.org/search/?q=${this.state.location}&format=json`)
				.then((data) => {
					return data.json();
				})
				.then((locInfo) => {
					let info = locInfo[0];
					console.log(info);
					let lat = info.lat;
          let lon = info.lon;
          let locationName = info.display_name.split(',')
          let country = locationName[locationName.length -1]
					this.setState({
            lat: lat,
            lon: lon,
            country: country
					})
        console.log(this.state.country)
        console.log(country)
        });
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

    handleSubmit=(e)=>{
        e.preventDefault()
        
        const post = {
            userName: this.props.displayName,
            email: this.props.userEmail,
            title: this.state.title,
            description: this.state.description,
            location: this.state.location,
            lat: this.state.lat,
            lon: this.state.lon,
            country: this.state.country,
            image: this.state.image,
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
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label >User:</label>
          <h3 className='form-group'>{this.props.displayName}</h3>
        </div>
        <div className='form-group'>
              <label>User Email:</label>
            <h4>{this.props.userEmail}</h4>
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
              <label>Coordinates: </label>
          <input
          placeholder='City, Country'
              type="text" 
              className="form-control"
              value={this.state.lat + ',' + this.state.lon}
              onFocus={this.getLatLon}>
                
              </input>
        </div>
        <div className="form-group">
          <label>Image Link: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.image}
              onChange={this.onChangeImage}
              />
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
