import React, { Component } from 'react'
import Leaflet from './Leaflet'
import {Button} from 'react-bootstrap'
export class HomeBody extends Component {
    constructor(props){
        super(props)
this.state = {
    mapLayer: true
}

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
                <Leaflet toggleMapLayer={this.toggleMapLayer} mapLayer={this.state.mapLayer}/>
            </div>
        )
    }
}

export default HomeBody
