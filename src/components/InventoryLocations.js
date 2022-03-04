import React, {Component} from 'react'
import axios from 'axios'
import { MdControlPoint } from 'react-icons/md'
import {Form} from './Form'

class InventoryLocations extends Component {
    constructor(props) {
        super(props)

        this.state = {
            locations: [],
            allLocations: [],
            loading: true,
            openPop: false,
            closeCal: true
        }
    }
    componentDidMount() {
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                const responseData = response.data.sort((a,b) => a.region > b.region ? 1: -1)
                this.setState({
                    allLocations: responseData,
                    loading: false
                })
                const locations = localStorage.getItem('locations')
                if (locations) {
                    this.setState({
                        locations: JSON.parse(locations)
                    })
                } else {
                    this.setState({
                        locations: responseData.slice(0,2),
                    })
                    localStorage.setItem('locations', JSON.stringify(responseData.slice(0,2)))
                }
            })
            .catch(error => console.log(error))
    }

    openPopUp = () => {
        this.setState({
            openPop: true
        })
    }

    closePopUp = (event) => {
        if (event) {
            if (event.target.className === 'form-container') {
                this.setState({
                    openPop: false
                })
            }
        } else {
            this.setState({
                openPop: false
            })
        }
    }

    addLocation = (location) => {
        console.log(location)
        const newLocation = this.state.allLocations.find(val => val.region === location.region && val.name.common === location.country)
        const newLocations = this.state.locations
        newLocations.push(newLocation)
        this.setState({
            locations: newLocations
        })
        localStorage.setItem('locations', JSON.stringify(newLocations))
        this.closePopUp(null)
    }

    render() {
        const mapEl = this.state.locations.map(val => {
            const currencies = Object.values(val.currencies).map(val => val.name).join(', ')
            const callingCode = val.idd.suffixes.map(suffix => val.idd.root + suffix).join(', ')
            return <div key={val.name.common} className="data-row">
                <span className="row-value" title={val.region}>{val.region}</span>
                <span className="row-value" title={val.name.common}>{val.name.common}</span>
                <span className="row-value" title={currencies}>{currencies}</span>
                <span className="row-value" title={callingCode}>{callingCode}</span>
                <span className="row-value cursor-pointer">Edit</span>
            </div>
        })
        return this.state.loading ? (
            <div className="loader">Loading....</div>
        ): (
            <div className="">
                <div className="flex justify-end actions">
                    <MdControlPoint className="cursor-pointer" onClick={this.openPopUp} fontSize="2.5em" />
                </div>
                <div className="table">
                    <div className="heading-row">
                        <span className="row-value">REGION</span>
                        <span className="row-value">COUNTRY</span>
                        <span className="row-value">CURRENCY</span>
                        <span className="row-value">CALLING CODE</span>
                        <span className="row-value"></span>
                    </div>
                    {
                        mapEl
                    }
                </div>
                {
                    this.state.openPop ? <div className="popup-container" onClick={(event) => this.closePopUp(event)} >
                        <Form locations={this.state.allLocations} addLocation={this.addLocation} />
                    </div> : ''
                }
            </div>
        )
    }
}

export default InventoryLocations