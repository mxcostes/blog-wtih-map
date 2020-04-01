import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import '../App.css';

export class Leaflet extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lat: 0,
			lng: 40,
			zoom: 1.5,
			posts: []
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
		this.state.posts.forEach((post) => {
			fetch(`https://nominatim.openstreetmap.org/search/?q=${post.location}&format=json`)
				.then((data) => {
					return data.json();
				})
				.then((locInfo) => {
                    let info = locInfo[0];
                    console.log(info)
					let lat = info.lat;
					let lon = info.lon;
					let position = lat + ',' + lon;
					console.log(position);

					return <Marker position={position} />;
				});
		});
	};

	render() {
		this.markertList();
		let center = [ this.state.lat, this.state.lng ];
		return (
			<div className="leaflet-container">
				<Map center={center} zoom={this.state.zoom}>
					<TileLayer
						attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
						url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
					/>
					<Marker position={center} />
					{this.markertList()}
				</Map>
			</div>
		);
	}
}

export default Leaflet;
