import React, { Component } from 'react';
import { Map, TileLayer, Marker} from 'react-leaflet';
import axios from 'axios'
import '../App.css';




export class Leaflet extends Component {
constructor(props) {
    super(props)

        this.state = {
            lat: 0,
            lng: 40,
            zoom: 1.5,
            posts: []
        }
}



componentDidMount() {
    axios.get('http://localhost:5000/posts/')
    .then(res => {
        this.setState({
            posts: res.data
        })
    })
    .catch((error)=> console.log(error))

    // console.log(this.state.posts)
   
}


markertList=()=>{
    
    return this.state.posts.forEach(post => {
        
    
        
        console.log(this.getLatLong(post.location))
    })
}

getLatLong=(location)=>{

    let latLon = {}
    fetch(`https://nominatim.openstreetmap.org/search/?q=${location}&format=json`)
        .then((data) => {
            return data.json()
        })
        .then((locInfo) => {
            console.log(locInfo[0])
            let info = locInfo[0]
            let lat = info.lat
            let lon = info.lon
            console.log(lat)
            console.log(lon)
            latLon.lat = lat
            latLon.lon = lon
            let position = lat+","+lon
            return position
        })
}

// placemarkers() {
//     window.fetch('http://localhost:5000/posts/')
//         .then(response => response.json())
//         .then(json => {
//             function makeMarker() {
//                 // for every post in the database
//                 // make a marker
//                 const posts = json.map((postData) => {
//                     const mark = this.getLatLong(postData.location)
//                     return mark
//                 })
//                 console.log(posts)
//                 return posts
                
//             }
//             const posts = makeMarker();
//             function addAdressToFunction() {
//                 // add each ost listitem to the parent ol
//                 posts.forEach((location) => {
//                     this.getLatLong(location)


//                 });
//             } addAdressToFunction()
//         })
// }




    render() {
        // this.markertList()
        let position = [this.state.lat, this.state.lng];
        return (



			<div className='leaflet-container'>
				<Map center={position} zoom={this.state.zoom}  >

					<TileLayer
						attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
						url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
					/>
					<Marker position={position}/>
					{/* {this.markertList()} */}
				</Map>

                </div>
					
		);
	}
}

export default Leaflet;

