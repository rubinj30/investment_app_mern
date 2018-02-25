import React, { Component } from 'react'
import axios from 'axios'

class SingleInvestmentPage extends Component {
    state = {
        user: {},
        investment: {},
        investmentInfo: {},
        dailyStockPrices: {},
        fundamentals: {}
    }

    componentWillMount = async () => {
        await this.getInvestment()
        await this.fetchStockInfoFromApi()
        // await this.fetchDailyStockPrices()
        // await this.fetchFundamentals()
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
        this.setState({fundamentals: response.data})
    
    }


    render() {
        // object of weekly stock prices
        const dailyStockPrices = this.state.dailyStockPrices
        
        // object of weekly stock prices
        const stockArray = []
        for (var property1 in dailyStockPrices) {
            stockArray.push(dailyStockPrices[property1])
        } 
        
        return (
            <div>
                <div>
                    {/* {this.state.investment.ticker} */}
                </div>
                <div>
                    {this.state.investment === 'stock' ?
                        <div>
                            <div>CEO: {this.state.investmentInfo.ceo}</div>
                            <div># of Employees: {this.state.investmentInfo.employees}</div>
                            <div>Headquarters Located in: {this.state.investmentInfo.hq_state}</div>

                            <div>Industry: {this.state.investmentInfo.industry_category}</div>
                            <div>Exchange: {this.state.investmentInfo.stock_exchange}</div>
                            <div>Fundamentals: Debt-to-Equity Ratio {this.state.fundamentals}</div>
                            <div>Fundamentals: Gross Margin {this.state.fundamentals.data[4].value}</div>
                            <div>Fundamentals:</div>
                            <div>Fundamentals:</div>
                            <div>Fundamentals:</div>
                            
                            <div><a href="http://amazon.com" target="_blank">Visit Website{this.state.investmentInfo.url}</a></div>
                            <p>{this.state.investmentInfo.short_description}</p>
                        </div>
                        : null}
                </div>
            </div>
        )
    }
}

export default SingleInvestmentPage