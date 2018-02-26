import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import StyledButton from './styled-components/StyledButton'

class NewInvestment extends Component {
    state = {
        newInvestment: {}
    }

    handleNewInvestmentChange = (event) => {
        event.preventDefault()
        const attributeName = event.target.name
        const attributeValue = event.target.value
        const newInvestment = { ...this.state.newInvestment }

        newInvestment[attributeName] = attributeValue

        this.setState({ newInvestment })
    }

    addStockToPortfolio = (event) => {
        event.preventDefault()
        
        const payload = {
            ticker: this.state.newInvestment.ticker,
            quantity: parseInt(this.state.newInvestment.quantity),
            type: "stock"
        }
        console.log("SUBMITTIN for ", payload)
        axios.post(`/api/users/${this.props.userId}/investments`, payload)
    }


    render() {
        return (
            <div>
                <form onSubmit={this.addStockToPortfolio}>

                    <div><label>Enter the Stock Ticker</label></div>
                    <div>
                        <input onChange={this.handleNewInvestmentChange}
                            name="ticker" value={this.state.newInvestment.ticker} />
                    </div>
                    <div><label>How many shares would you like?</label></div>
                    <div>
                        <input onChange={this.handleNewInvestmentChange} name="quantity" value={this.state.newInvestment.quantity} />
                    </div>
                    <StyledButton>Add To Portfolio</StyledButton>
                </form>
            </div>
        )
    }
}

export default NewInvestment