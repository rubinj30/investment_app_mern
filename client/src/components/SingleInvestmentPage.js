import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import StyledButton from './styled-components/StyledButton'
import styled from 'styled-components'
import LineGraph from './LineGraph'
import accounting from 'accounting'
import StockNews from './StockNews'
import HeaderBar from './HeaderBar'
import { FaArrowCircleLeft } from 'react-icons/lib/fa'
import { Collapse } from 'react-collapse'

class SingleInvestmentPage extends Component {
    state = {
        user: {},
        investment: {},
        investmentInfo: {},
        hourlyStockPrices: {},
        dailyStockPrices: {},
        dailyReady: false,
        investmentReady: false,
        monthlyStockPrices: {},
        fundamentals: {},
        redirect: false,
        descriptionShowing: false,
        fundamentalsReady: false,
        newsReady: false,
        news: {},
        sellConfirmationShowing: false,
        editFormShowing: false,
        profitLossColor: '',
        quantity: ''
    }

    componentWillMount = async () => {
        await this.getInvestment()
        this.fetchStockInfoFromApi()
        // this.fetchHourlyStockPrices()
        this.fetchDailyStockPrices()
        this.fetchFundamentals()
        this.fetchMonthlyStockPrices()
        this.fetchNews()
    }

    getInvestment = async () => {
        try {

            const userId = this.props.match.params.userId
            const investmentId = this.props.match.params.id
            const response = await axios.get(`/api/users/${userId}/investments/${this.props.match.params.investmentId}`)
            this.setState({
                user: response.data.user,
                investment: response.data.investment,
                profitLossColor: response.data.profitLossColor,
                investmentReady: !this.state.investmentReady,
                quantity: response.data.investment.quantity
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    fetchStockInfoFromApi = async () => {
        try {
            if (this.state.investment.type === 'stock') { // originally using with plans to setup for cyrpto currencies
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
        catch (err) {
            console.log(err)
        }
    }

    fetchHourlyStockPrices = async () => {
        try {
            const api_key = process.env.REACT_APP_TIME_SERIES
            const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.state.investment.ticker}&interval=60min&outputsize=full&apikey=${api_key}`
            const response = await axios.get(URL)
            console.log("HOURLY", response.data)
            this.setState({
                hourlyStockPrices: response.data["Time Series (60min)"]
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    fetchDailyStockPrices = async () => {
        try {
            const api_key = process.env.REACT_APP_TIME_SERIES
            const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=compact&symbol=${this.state.investment.ticker}&apikey=${api_key}`
            const response = await axios.get(URL)
            this.setState({
                dailyStockPrices: response.data["Time Series (Daily)"],
                dailyReady: !this.state.dailyReady
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    fetchMonthlyStockPrices = async () => {
        try {
            console.log("get monthly stock times")
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
        console.log(response.data.data)
        this.setState({
            fundamentals: response.data.data,
            fundamentalsReady: true
        })
    }

    fetchNews = async () => {
        const URL = `https://api.intrinio.com/news?identifier=${this.state.investment.ticker}&page_number=1&page_size=12`
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
        await alert(`Sale completed`)
        await axios.delete(`/api/users/${this.props.match.params.userId}/investments/${this.props.match.params.investmentId}`)
        this.setState({ redirect: !this.state.redirect })
    }

    handleEditChange = async (event) => {

        this.setState({ [event.target.name]: event.target.value })
        event.preventDefault()
    }

    updateNumberOfShares = async () => {
        await axios.patch(`/api/users/${this.props.match.params.userId}/investments/${this.props.match.params.investmentId}`, this.state.quantity )

    }

    toggleDescriptionShowing = () => {
        this.setState({ descriptionShowing: !this.state.descriptionShowing })
    }

    toggleSellConfirmShowing = () => {
        this.setState({ sellConfirmationShowing: !this.state.sellConfirmationShowing })
    }

    toggleEditFormShowing = () => {
        this.setState({ editFormShowing: !this.state.editFormShowing })
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
        if (this.state.dailyReady) {
            const yesterdayClosePrice = Object.values(dailyStockPrices)[0]['1. close']
            // console.log("YESTERDAY", yesterdayClosePrice)
            // console.log("Price", this.state.investment.price)
            const priceChange = this.state.investment.price - parseInt(yesterdayClosePrice)
            // console.log(priceChange)
        }

        const totalCurrentValue = this.state.investment.quantity * this.state.investment.price
        const totalPurchasePrice = this.state.investment.quantity * this.state.investment.stockPurchasePrice
        const gainLoss = totalCurrentValue - totalPurchasePrice
        const percentagGainLoss = (gainLoss / totalPurchasePrice) * 100

        console.log("P/L color color color", typeof (this.state.profitLossColor))

        return (

            <InvestmentContainer>
                <HeaderWrapper>
                    <HeaderBar
                        user={this.state.user}
                        backLink={`/users/${this.state.user._id}/investments`}
                    />
                </HeaderWrapper>

                {this.state.redirect ?
                    <Redirect to={`/users/${this.props.match.params.userId}/investments`} /> :
                    <Company>
                        <CompanyName>
                            {this.state.investmentInfo.name} ({this.state.investment.ticker})
                        </CompanyName>
                        <PriceDetail>
                            <PricingDetail>
                                <PricingDetailDiv>
                                    <CurrentPrice>Current Price: </CurrentPrice><DetailValue> {accounting.formatMoney(this.state.investment.price)}</DetailValue>
                                </PricingDetailDiv>
                                <PricingDetailDiv>
                                    <CurrentPrice>Purchase Price: </CurrentPrice><DetailValue> {accounting.formatMoney(this.state.investment.stockPurchasePrice)}</DetailValue>
                                </PricingDetailDiv>
                                <PricingDetailDiv>
                                    <CurrentPrice>% Gain/Loss: </CurrentPrice><GainLossDetailValue profitLossColor={this.state.profitLossColor}> {percentagGainLoss.toFixed(1)}%</GainLossDetailValue>
                                </PricingDetailDiv>
                            </PricingDetail>
                            {/* <Detail>
                                <DetailKey>% Change Since Yesterday: </DetailKey><DetailValue> {this.state.investmentInfo.employees}</DetailValue>
                            </Detail> */}

                        </PriceDetail>

                        <LineContainer>
                            <LineGraph
                                dailyStockPrices={this.state.dailyStockPrices}
                                investment={this.state.investment}
                                investmentName={this.state.investmentInfo.name}
                                monthlyStockPrices={this.state.monthlyStockPrices}
                                hourlyStockPrices={this.state.hourlyStockPrices}
                            />
                        </LineContainer>


                        <EditDeleteButtonsContainer>
                            <div>
                                <StyledButton onClick={this.toggleSellConfirmShowing}>Sell All Shares of {this.state.investment.ticker}</StyledButton>
                            </div>
    
                                <Collapse isOpened={this.state.sellConfirmationShowing}>
                                    <ReviewContainer>
                                        <SectionTitle>Review Details</SectionTitle>
                                        <ReviewDetailLine><div>Current price:</div> {accounting.formatMoney(this.state.investment.price)}</ReviewDetailLine>
                                        <ReviewDetailLine><div>Number of shares: </div>{this.state.investment.quantity}</ReviewDetailLine>
                                        <ReviewDetailLine><div>Original total value:</div> {accounting.formatMoney(totalPurchasePrice)}</ReviewDetailLine>
                                        <ReviewDetailLine><div>Total current value: </div>{accounting.formatMoney(totalCurrentValue)}</ReviewDetailLine>
                                        <ReviewDetailLine>$ Gain/Loss: <GainLossDetailValue profitLossColor={this.state.profitLossColor}>{accounting.formatMoney(gainLoss)}</GainLossDetailValue></ReviewDetailLine>
                                        <ConfirmButton onClick={this.deleteStock}>Click to Confirm Sale</ConfirmButton>

                                    </ReviewContainer>
                                </Collapse>


                            {this.state.editFormShowing ?
                                <EditContainer>
                                    <StyledButton onClick={this.toggleEditFormShowing}> Hide Edit Form </StyledButton>
                                    <EditDiv>
                                        <div>How many shares would you like to own?</div>
                                        <EditInput onChange={this.handleEditChange} name="quantity" value={this.state.quantity} />
                                        <ConfirmButton onClick={this.updateNumberOfShares}>Click to Confirm Update</ConfirmButton>
                                    </EditDiv>
                                </EditContainer>

                                :
                                <div>
                                    <StyledButton onClick={this.toggleEditFormShowing}> Change # of {this.state.investment.ticker} Shares</StyledButton>
                                </div>
                            }
                        </EditDeleteButtonsContainer>


                        {this.state.fundamentalsReady ?
                            <Fundamentals>


                                <FundamentalsDetails>
                                    <SectionTitle>Key Metrics</SectionTitle>

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
                            </Fundamentals>
                            : null
                        }


                        <DescriptionAndFundamentals>


                            <StockDetails>
                                <SectionTitle>Company Details</SectionTitle>
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

                                <Website>
                                    <DetailValue><a href={url} target="_blank">Go to the {this.state.investmentInfo.name} website</a></DetailValue>
                                </Website>

                            </StockDetails>

                            <div>
                                {this.state.descriptionShowing ?
                                    <BelowFundamentalsButtons>
                                        <StyledButton onClick={this.toggleDescriptionShowing}>Hide Company Description</StyledButton>
                                        <CompanyDescription>{this.state.investmentInfo.short_description}</CompanyDescription>
                                    </BelowFundamentalsButtons>
                                    :
                                    <BelowFundamentalsButtons>
                                        <StyledButton onClick={this.toggleDescriptionShowing}>More About {this.state.investmentInfo.ticker}</StyledButton>
                                    </BelowFundamentalsButtons>
                                }
                            </div>
                        </DescriptionAndFundamentals>
                    </Company>
                }

                <StockNews
                    news={this.state.news}
                    newsReady={this.state.newsReady}
                    investmentName={this.state.investmentInfo.name}
                />

            </InvestmentContainer>
        )
    }
}

export default SingleInvestmentPage


const Company = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Detail = styled.div`
    display:flex;
    justify-content: space-between;
`
const PricingDetailDiv = styled.div`
    display: flex;
    font-size: 14px;
`

const PricingDetail = styled.div`

`

const Website = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
`

const DetailKey = styled.div`
    /* display: flex; */
`

const DetailValue = styled.div`
    text-align: right;
`

const GainLossDetailValue = styled.div`
    background-color: ${props => props.profitLossColor};
    padding: 2px;
    border-radius: 3px;
    color: white;

`

const DetailValueSpan = styled.span`

`

const StockDetails = styled.div`
    width: 300px;
    margin: 30px 0;
    padding: 40px;
    /* background-color: #947CB0; */
    border: 1px solid black;
    border-radius: 5px;
    padding: 8px;
    /* color: white; */
`
const FundamentalsDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: space-between;
    width: 300px;
    border-radius: 5px;
    border: 1px solid black;
    /* background-color: rgba(0,0,0, .2); */
    padding: 10px;
`

const InvestmentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Fundamentals = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;

`

const SectionTitle = styled.div`
    font-size: 20px;
    padding-bottom: 10px;
`

const BelowFundamentalsButtons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const LineContainer = styled.div`
    display: flex;
    padding-right: 20px;
    padding-bottom: 20px;
`

const PriceDetail = styled.div`
    padding-bottom: 10px;
`

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    background-color: #45b9f2;
    color: white;
    padding-bottom: 10px;
    width: 100%;
`

const CompanyName = styled.div`
    padding: 20px 5px 20px 5px;
    font-size: 26px;
    text-align: center;
`

const EditDeleteButtonsContainer = styled.div`
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ConfirmButton = styled.div`
    font-size: 12px;
    text-transform: uppercase;
    border: 1px solid black;
    background-color: rgba(0,0,0,.25);
    /* width: 100%; */
    padding: 6px;
    margin: 10px;
    border-radius: 5px;
    text-align: center;
    &:hover {
        background-color: #947CB0;
    }
`

const CurrentPrice = styled.div`
    font-size: 14px;
`

const CompanyDescription = styled.p`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid black;
    margin-left: 10px;
    margin-right: 10px;
    max-width: 500px;
`

const DescriptionAndFundamentals = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ReviewContainer = styled.div`
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid black;
`

const ReviewTitle = styled.div`
    font-size: 18px;
`
const EditDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
`

const EditInput = styled.input`
    border-radius: 5px;
    height: 20px;
    width: 30px;
    font-size: 16px;
`

const EditContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ReviewDetailLine = styled.div`
    display: flex;
    justify-content: space-between;
`