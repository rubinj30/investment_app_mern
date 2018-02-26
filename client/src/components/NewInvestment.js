import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import StyledButton from './styled-components/StyledButton'

class NewInvestment extends Component {
    state = {
        newInvestment: {}
    }

    // handleNewInvestmentChange = (event) => {
    //     event.preventDefault()
    //     const attributeName = event.target.name
    //     const attributeValue = event.target.value
    //     const newInvestment = { ...this.state.newInvestment }

    //     newInvestment[attributeName] = attributeValue

    //     this.setState({ newInvestment })
    // }

    addStockToPortfolio = (event) => {
        event.preventDefault()
        console.log("SUBMITTING", this.state.newInvestment)
        const blankCity = {}
    }

    // addNewCity = (event) => {
    //     event.preventDefault()
    //     const blankCity = {}
    //     this.props.addCity(this.state.newCity)
    //     this.setState({newCity: blankCity})
    // }

    render() {
        return (
            <div>
                {/* <form onSubmit={this.addStockToPortfolio}>

                    <div><label>Enter the Stock Ticker</label></div>
                    <div>
                        <input onChange={this.handleNewInvestmentChange}
                            name="ticker" type="text" value={this.state.newInvestment.ticker} />
                    </div>
                    <div><label>How many shares would you like?</label></div>
                    <div>
                        <input onChange={this.handleNewInvestmentChange} name="quantity" type="number" value={this.state.newInvestment.quantity} />
                    </div>
                    <StyledButton>Add To Portfolio<StyledButton/>
                </form> */}
            </div>
        )
    }
}

export default NewInvestment