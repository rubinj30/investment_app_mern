import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import StyledButton from './styled-components/StyledButton'
import styled from 'styled-components'
import LineGraph from './LineGraph'
import accounting from 'accounting'
import StockNews from './StockNews'

class SingleInvestmentPage extends Component {
    state = {
        user: {},
        investment: {},
        investmentInfo: {},
        dailyStockPrices: {},
        monthlyStockPrices: {},
        fundamentals: {},
        redirect: false,
        descriptionShowing: false,
        fundamentalsReady: false,
        newsReady: false,
        news: {}
    }

    componentWillMount = async () => {
        await this.getInvestment()
        await this.fetchStockInfoFromApi()
        await this.fetchDailyStockPrices()
        await this.fetchFundamentals()
        await this.fetchMonthlyStockPrices()
        await this.fetchNews()
    }

    getInvestment = async () => {
        const userId = this.props.match.params.userId
        const investmentId = this.props.match.params.id
        const response = await axios.get(`/api/users/${userId}/investments/${this.props.match.params.investmentId}`)
        this.setState({
            user: response.data.user,
            investment: response.data.investment
        })
    }

    fetchStockInfoFromApi = async () => {
        if (this.state.investment.type === 'stock') {
            const api_key = process.env.REACT_APP_STOCK_INFO
            const URL = `https://api.intrinio.com/companies?identifier=${this.state.investment.ticker}`
            const response = await axios.get(URL,
                {
                    headers: {
                        "X-Authorization-Public-Key": api_key
                    }
                })
            this.setState({ investmentInfo: response.data })
        }
    }

    fetchDailyStockPrices = async () => {
        try {
            const api_key = process.env.REACT_APP_TIME_SERIES
            const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=compact&symbol=${this.state.investment.ticker}&apikey=${api_key}`
            const response = await axios.get(URL)
            this.setState({ dailyStockPrices: response.data["Time Series (Daily)"] })
        }
        catch (err) {
            console.log(err)
        }
    }

    fetchMonthlyStockPrices = async () => {
        try {
            const api_key = process.env.REACT_APP_TIME_SERIES
            const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&outputsize=compact&symbol=${this.state.investment.ticker}&apikey=${api_key}`
            const response = await axios.get(URL)
            this.setState({ monthlyStockPrices: response.data["Monthly Time Series"] })
        }
        catch (err) {

        }

    }

    fetchFundamentals = async () => {
        const URL = `https://api.intrinio.com/data_point?identifier=${this.state.investment.ticker}&item=pricetoearnings,grossmargin,debttoequity`
        const response = await axios.get(URL,
            {
                headers: {
                    "X-Authorization-Public-Key": process.env.REACT_APP_STOCK_INFO
                }
            })
        this.setState({
            fundamentals: response.data.data,
            fundamentalsReady: true
        })
    }

    fetchNews = async () => {
        const URL = `https://api.intrinio.com/news?identifier=${this.state.investment.ticker}`
        const response = await axios.get(URL,
            {
                headers: {
                    "X-Authorization-Public-Key": process.env.REACT_APP_STOCK_INFO
                }
            })
        this.setState({ 
            news: response.data.data,
            newsReady: true
        })
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

            <InvestmentContainer>
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


                        <div>
                            <StockDetails>
                                <Detail>
                                    <DetailKey>CEO:</DetailKey><DetailValue> {this.state.investmentInfo.ceo}</DetailValue>
                                </Detail>
                                <Detail>
                                    <DetailKey># of Employees:</DetailKey><DetailValue> {this.state.investmentInfo.employees}</DetailValue>
                                </Detail>
                                <Detail>
                                    <DetailKey>HQs Located in:</DetailKey><DetailValue> {this.state.investmentInfo.hq_state}</DetailValue>
                                </Detail>
                                <Detail>
                                    <DetailKey>Industry:</DetailKey><DetailValue> {this.state.investmentInfo.industry_category}</DetailValue>
                                </Detail>
                                <Detail>
                                    <DetailKey>Exchange:</DetailKey><DetailValue> {this.state.investmentInfo.stock_exchange}</DetailValue>
                                </Detail>

                                <Detail>
                                    <DetailKey>Website: </DetailKey><DetailValue><a href={url} target="_blank"> {this.state.investmentInfo.company_url}</a></DetailValue>
                                </Detail>
                                {/* <div>Fundamentals: Debt-to-Equity Ratio {this.state.fundamentals}</div> */}

                            </StockDetails>

                            {this.state.fundamentalsReady ?
                                <FundamentalsDetails>

                                    <Detail>
                                        <DetailKey>Price-to-Earnings:</DetailKey><DetailValue> {this.state.fundamentals[0].value}</DetailValue>
                                    </Detail>
                                    <Detail>
                                        <DetailKey>Gross Margin</DetailKey><DetailValue> {this.state.fundamentals[1].value}</DetailValue>
                                    </Detail>
                                    <Detail>
                                        <DetailKey>Debt-to-Equity:</DetailKey><DetailValue> {this.state.fundamentals[2].value}</DetailValue>
                                    </Detail>
                                </FundamentalsDetails>
                                : null
                            }
                            <div>
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
                                    <Link to={`/users/${this.props.match.params.userId}/investments`}>
                                        <StyledButton>Back to Portfolio</StyledButton>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                }

                <LineGraph
                    dailyStockPrices={this.state.dailyStockPrices}
                    investment={this.state.investment}
                    investmentName={this.state.investmentInfo.name}
                    monthlyStockPrices={this.state.monthlyStockPrices}
                />
                
                <StockNews 
                news={this.state.news}
                newsReady={this.state.newsReady}
                />

            </InvestmentContainer>
        )
    }
}

export default SingleInvestmentPage

const Fundamentals = styled.div`
    width: 200px;
`

const Detail = styled.div`
    display:flex;
    justify-content: space-between;
`

const DetailKey = styled.div`
    /* display: flex; */
`

const DetailValue = styled.div`
    text-align: right;
`
const StockDetails = styled.div`
    width: 270px;
    background-color: #947CB0;
    border-radius: 5px;
    padding: 8px;
    color: white;
`
const FundamentalsDetails = styled.div`

`

const InvestmentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
