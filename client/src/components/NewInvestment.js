import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
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
        try {
        event.preventDefault()        
        const tickers = this.props.investments.map((investment) => {
            return investment.ticker
        })
        
        const payload = {
            ticker: this.state.newInvestment.ticker,
            quantity: parseInt(this.state.newInvestment.quantity),
            type: "stock"
        }

        console.log("SUBMITTING FOR ", payload)
        await axios.post(`/api/users/${this.props.userId}/investments`, payload)
        this.props.getAllInvestments()
        
        }
        catch (err) {
                console.log(err)
    }

        
    }

    render() {
        return (
            <div>
                {this.state.redirect ?
                <Redirect to={`/users/${this.props.userId}/investments`} /> :
                
                <NewForm onSubmit={this.addStockToPortfolio}>
                    <NewContainer>
                    <div><label>Enter the Stock Ticker</label></div>
                    <div>
                        <input onChange={this.handleNewInvestmentChange}
                            name="ticker" type="text" value={this.state.newInvestment.ticker} required />
                    </div>
                    <div><label>How many shares?</label></div>
                    <div>
                        <input onChange={this.handleNewInvestmentChange} name="quantity" type="number" 
                        value={this.state.newInvestment.quantity} required />
                    </div>
                    </NewContainer>
                    <StyledButton>Add To Portfolio</StyledButton>
                </NewForm>
                } 
            </div>
        )
    }
}

export default NewInvestment

const NewForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const NewContainer = styled.div`
    padding: 10px;
    margin: 15px;
    border: 1px solid black;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
`