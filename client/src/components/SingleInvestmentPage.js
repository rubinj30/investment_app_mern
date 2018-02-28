import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import StyledButton from './styled-components/StyledButton'
import styled from 'styled-components'
import LineGraph from './LineGraph'

class SingleInvestmentPage extends Component {
    state = {
        user: {},
        investment: {},
        investmentInfo: {},
        dailyStockPrices: {},
        fundamentals: {},
        redirect: false,
        descriptionShowing: false,
        fundamentalsReady: false
    }

    componentWillMount = async () => {
        await this.getInvestment()
        await this.fetchStockInfoFromApi()
        await this.fetchDailyStockPrices()
        await this.fetchFundamentals()
        this.setState({ fundamentalsReady: true })
    }

    getInvestment = async () => {
        const userId = this.props.match.params.userId
        const investmentId = this.props.match.params.id
        const response = await axios.get(`/api/users/${userId}/investments/${this.props.match.params.investmentId}`)
        console.log("INVESTMENT", response.data.investment)
        this.setState({
            user: response.data.user,
            investment: response.data.investment
        })
    }

    fetchStockInfoFromApi = async () => {
        if (this.state.investment.type === 'stock') {

            const URL = `https://api.intrinio.com/companies?identifier=${this.state.investment.ticker}`
            const response = await axios.get(URL,
                {
                    headers: {
                        "X-Authorization-Public-Key": process.env.REACT_APP_STOCK_INFO
                    }
                })
            this.setState({ investmentInfo: response.data })
        }
    }

    fetchDailyStockPrices = async () => {
        try {
            const api_key = process.env.REACT_APP_TIME_SERIES
            const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${this.state.investment.ticker}&apikey=${api_key}`
            const response = await axios.get(URL)
            this.setState({ dailyStockPrices: response.data["Weekly Adjusted Time Series"] })
        }
        catch (err) {
            console.log(err)
        }
    }

    fetchFundamentals = async () => {
        const URL = `https://api.intrinio.com/data_point?identifier=${this.state.investment.ticker}&item=debttoequity,pricetoearnings,ebitda,grossmargin,debttoequity`
        const response = await axios.get(URL,
            {
                headers: {
                    "X-Authorization-Public-Key": process.env.REACT_APP_STOCK_INFO
                }
            })
        this.setState({ fundamentals: response.data.data })
    }

    deleteStock = async () => {
        await axios.delete(`/api/users/${this.props.match.params.userId}/investments/${this.props.match.params.investmentId}`)
        this.setState({ redirect: !this.state.redirect })
    }

    handleClick = () => {
        if (window.confirm(`Are you sure you want to sell all of your shares for ${this.state.investmentInfo.name}?`)) {
            this.deleteStock()
        }
    }

    toggleDescriptionShowing = () => {
        this.setState({ descriptionShowing: !this.state.descriptionShowing })
    }


    render() {
        // object of weekly stock prices
        const dailyStockPrices = this.state.dailyStockPrices

        // object of weekly stock prices
        const stockArray = []
        for (var property1 in dailyStockPrices) {
            stockArray.push(dailyStockPrices[property1])
        }
        const url = "http://" + this.state.investmentInfo.company_url


        return (

            <div>
                {this.state.redirect ?
                    <Redirect to={`/users/${this.props.match.params.userId}/investments`} /> :
                    <div>
                        <div>
                            {this.state.investmentInfo.name} ({this.state.investment.ticker})
                        </div>
                        <div>
                            <StyledButton onClick={this.handleClick}>Sell All Shares of {this.state.investment.ticker}</StyledButton>
                        </div>
                        <div>
                            <StyledButton> Change # of {this.state.investment.ticker} Shares</StyledButton>
                        </div>
                        {this.fundamentalsReady ?
                            <Fundamentals>

                                <div>Fundamentals</div>
                                <div>P/E Ratio: {this.state.fundamentals[0].value} </div>

                            </Fundamentals>
                            : null
                        }

                        <div>
                            <div>
                                <div>CEO: {this.state.investmentInfo.ceo}</div>
                                <div># of Employees: {this.state.investmentInfo.employees}</div>
                                <div>Headquarters Located in: {this.state.investmentInfo.hq_state}</div>

                                <div>Industry: {this.state.investmentInfo.industry_category}</div>
                                <div>Exchange: {this.state.investmentInfo.stock_exchange}</div>
                                {/* <div>Fundamentals: Debt-to-Equity Ratio {this.state.fundamentals}</div> */}
                                <div>Website: <a href={url} target="_blank">{this.state.investmentInfo.company_url}</a></div>

                                {this.state.descriptionShowing ?
                                    <div>
                                        <StyledButton onClick={this.toggleDescriptionShowing}>Hide Company Description</StyledButton>
                                        <p>{this.state.investmentInfo.short_description}</p>
                                    </div>
                                    :
                                    <div>
                                        <StyledButton onClick={this.toggleDescriptionShowing}>More About {this.state.investmentInfo.ticker}</StyledButton>
                                    </div>
                                }
                                <div>
                                    <a href={`/users/${this.props.match.params.userId}/investments`}>
                                        <StyledButton>Back to Portfolio</StyledButton>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                }

                <LineGraph
                dailyStockPrices={this.state.dailyStockPrices}
                investment={this.state.investment}
                />
            </div>
        )
    }
}

export default SingleInvestmentPage

const Fundamentals = styled.div`
    width: 200px;
`