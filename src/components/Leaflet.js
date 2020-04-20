import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';


const  Mark = (props) => (
	<Marker position={props.position} key={props.key}>
							<Popup>
								<Link to={'/postpage/' + props.post._id}>{props.post.title}</Link>
							</Popup>
						</Marker>
)

export class Leaflet extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lat: 0,
			lng: 40,
			zoom: 1.5,
			posts: [],
			positions: []

		};
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/posts/')
			.then((res) => {
				this.setState({
					posts: res.data
				});
			})
			.catch((error) => console.log(error));

		// console.log(this.state.posts)
	}

	markertList = () => {
		
		return this.state.posts.forEach((post) => {
			fetch(`https://nominatim.openstreetmap.org/search/?q=${post.location}&format=json`)
				.then((data) => {
					return data.json();
				})
				.then((locInfo) => {
					let info = locInfo[0];
					console.log(info);
					let lat = info.lat;
					let lon = info.lon;
					let position = lat + ',' + lon;
					console.log(position);
					console.log(post._id);
					
					return (
						<Mark key={post._id} post={post} position={position} />
					);
				});
		});
	};

	render() {
		let center = [ this.state.lat, this.state.lng ];
		return (
			<div className="leaflet-container">
				<Map center={center} zoom={this.state.zoom}>
					<TileLayer
						attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
						url={this.props.mapLayer? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" : 'https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png'}
					/>
					<Marker position={center}>
						<Popup>
							<Link to="/postpage/5e8389a1c32d850a398fecd3">Under the Trees</Link>
						</Popup>
					</Marker>
					

					{/* {this.markertList()} */}
					
				</Map>
			</div>
		);
	}
}

export default Leaflet;


// var Thunderforest_Outdoors = L.tileLayer('https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey={apikey}', {
// 	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// 	apikey: '<your apikey>',
// 	maxZoom: 22
// });

// var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
// 	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
// });