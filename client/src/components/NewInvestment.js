import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import StyledButton from './styled-components/StyledButton'

class NewInvestment extends Component {
    state = {
        newInvestment: {},
        redirect: false,
        userId: ''
    }

    handleNewInvestmentChange = (event) => {
        event.preventDefault()
        const attributeName = event.target.name
        const attributeValue = event.target.value
        const newInvestment = { ...this.state.newInvestment }

        newInvestment[attributeName] = attributeValue

        this.setState({ newInvestment })
    }

    addStockToPortfolio = async (event) => {
        event.preventDefault()
        
        const payload = {
            ticker: this.state.newInvestment.ticker,
            quantity: parseInt(this.state.newInvestment.quantity),
            type: "stock",
            stockPurchasePrice: 0
        }

        console.log("SUBMITTIN for ", payload)
        await axios.post(`/api/users/${this.props.userId}/investments`, payload)
        this.props.getAllInvestments()
        // this.setState({ 
        //     redirect: !this.state.redirect
        // })
        
    }

    render() {
        return (
            <div>
                {this.state.redirect ?
                <Redirect to={`/users/${this.props.userId}/investments`} /> :
                <form onSubmit={this.addStockToPortfolio}>

                    <div><label>Enter the Stock Ticker</label></div>
                    <div>
                        <input onChange={this.handleNewInvestmentChange}
                            name="ticker" type="text" value={this.state.newInvestment.ticker} required />
                    </div>
                    <div><label>How many shares would you like?</label></div>
                    <div>
                        <input onChange={this.handleNewInvestmentChange} name="quantity" type="number" 
                        value={this.state.newInvestment.quantity} required />
                    </div>
                    <StyledButton>Add To Portfolio</StyledButton>
                </form>
                } 
            </div>
        )
    }
}

export default NewInvestment