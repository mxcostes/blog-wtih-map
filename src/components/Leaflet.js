import React, { Component } from 'react';
import { Map, TileLayer} from 'react-leaflet';
import '../App.css';




export class Leaflet extends Component {
constructor(props) {
    super(props)

        this.state = {
            lat: 0,
            lng: 40,
            zoom: 1.5
        }
}

    render() {
        let position = [this.state.lat, this.state.lng];
        return (



			<div className='leaflet-container'>
				<Map center={position} zoom={this.state.zoom}  >

					<TileLayer
						attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
						url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
					/>
					
					
				</Map>

                </div>
					
		);
	}
}

export default Leaflet;

