import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import StyledButton from './styled-components/StyledButton'
import swal from 'sweetalert';
import accounting from 'accounting'
import { InputTitle, BuyInput } from './styled-components/Details'

const R = require('ramda')

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

            if (R.contains(this.state.newInvestment.ticker, tickers)) {
                swal("You already own this stock. Go to the stock page to purchase more shares.")
                this.props.getAllInvestments()
            } else {
                const data = await axios.get(`https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${this.state.newInvestment.ticker}&apikey=J2JY3QVFS2WGX91L`)
                const currentPrice = parseInt(data.data['Stock Quotes'][0]['2. price']).toFixed(2)
                const ticker = this.state.newInvestment.ticker.toUpperCase()
                const quantity = this.state.newInvestment.quantity

                swal(`You purchased ${quantity} shares of ${ticker} at $ ${currentPrice} per share \n
                The total current value of these shares is $ ${(currentPrice * parseInt(quantity)).toFixed(2)}.`)
                const payload = {
                    ticker: ticker,
                    quantity: parseInt(quantity),
                    type: "stock"
                }
                
                await axios.post(`/api/users/${this.props.userId}/investments`, payload)
                this.props.getAllInvestments() 
            }
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
                            <InputTitle><label>Enter the Stock Ticker</label></InputTitle>
                            <div>
                                <BuyInput onChange={this.handleNewInvestmentChange}
                                    name="ticker" type="text" value={this.state.newInvestment.ticker} required />
                            </div>
                            <InputTitle><label>How many shares?</label></InputTitle>
                            <div>
                                <BuyInput onChange={this.handleNewInvestmentChange} name="quantity" type="number"
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