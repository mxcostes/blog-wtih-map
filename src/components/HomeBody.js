import React, { Component } from 'react'
import Leaflet from './Leaflet'

export class HomeBody extends Component {
    render() {
        return (
            <div>
                <div><h1>Explore</h1></div>
                <Leaflet />
            </div>
        )
    }
}

export default HomeBody
