import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';


const  Mark = (props) => (
	
	<Marker position={[props.posts.post.lat,props.posts.post.lon]}>
							<Popup>
								<Link to={'/postpage/' + props.posts._id}>{props.posts.title}</Link>
							</Popup>
						</Marker>
)

export class Leaflet extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lat: 0,
			lon: 40,
			zoom: 1.5,
			posts: []

		};
	}

	

	markList = () => {
		return this.props.posts.map((currentPost) => {
			return <Mark posts={currentPost}  key={currentPost.key} />;
		});
	};


	render() {
		let center = [ this.props.lat, this.props.lon ];
		return (
			<div className="leaflet-container">
				<Map center={center} zoom={this.props.zoom}>
					<TileLayer
						attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
						url={this.props.mapLayer? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" : 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'}
						// back up tile layer, needs api layer 'https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png'
					/>
					

					{this.markList()}
					
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