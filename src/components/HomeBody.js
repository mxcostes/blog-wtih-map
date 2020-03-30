import React, { Component } from 'react'
import Leaflet from './Leaflet'

export class HomeBody extends Component {
    render() {
        return (
            <div>
                <h1>Hello world</h1>
                <Leaflet />
            </div>
        )
    }
}

export default HomeBody
