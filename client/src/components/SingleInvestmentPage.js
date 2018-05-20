import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import StyledButton from './styled-components/StyledButton'
import styled from 'styled-components'
import LineGraph from './LineGraph'
import accounting from 'accounting'
import StockNews from './StockNews'
import HeaderBar from './HeaderBar'
import { Collapse } from 'react-collapse'
import swal from 'sweetalert'
import StockDetailsSection from './StockDetailsSection'
import moment from 'moment'
import { DetailValue, SectionTitle, Detail, DetailKey } from './styled-components/Details'
const _ = require('lodash')

class SingleInvestmentPage extends Component {
    state = {
        user: {},
        investment: {},
        investmentInfo: {},
        dailyStockPrices: [],
        dailyReady: false,
        investmentReady: false,
        last2YearStockPrices: [],
        fundamentals: {},
        redirect: false,
        descriptionShowing: false,
        fundamentalsReady: false,
        newsReady: false,
        news: {},
        sellConfirmationShowing: false,
        editFormShowing: false,
        profitLossColor: '',
        quantity: '',
        originalQuantity: '',
        buyOrSell: '',
        newQuantity: '',
        yAxisDimensions: {}
    }

    componentWillMount = async () => {
        await this.getInvestment()
        this.fetchStockInfoFromApi()
        this.fetchDailyStockPrices()
        this.fetchFundamentals()
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
                quantity: response.data.investment.quantity,
                originalQuantity: response.data.investment.quantity
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    fetchStockInfoFromApi = async () => {
        try {
            if (this.state.investment.type === 'stock') { // originally using with plans to setup for cyrpto currencies
                const response = await axios.get(`https://api.iextrading.com/1.0/stock/${this.state.investment.ticker}/company`)
                this.setState({ investmentInfo: response.data })
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    fetchDailyStockPrices = async () => {
        try {
            const api_key = process.env.TIME_SERIES
            const URL = `https://api.iextrading.com/1.0/stock/${this.state.investment.ticker}/batch?types=chart&range=2y`
            const response = await axios.get(URL)
            console.log("TESTESTTEST", response.data.chart);
            
            const shapedDailyStockPriceData = response.data.chart.map((item) => {
                return { name: moment(item.date).format('M/DD/YY'), price: item.close }
            })
            const yAxisDimensions = { high: this.findHighestAmountForYAxis(shapedDailyStockPriceData), 
                                    low: this.findLowestAmountForYAxis(shapedDailyStockPriceData) }

            // this.findHighestAmountForYAxis(shapedDailyStockPriceData, )
            this.setState({ last2YearStockPrices: shapedDailyStockPriceData, yAxisDimensions })
        }
        catch (err) {
        }
    }

    findHighestAmountForYAxis = (array, keyToCheck) => {
        const amountsArray = array.map((item) => {
            return item.price
        })
        return _.round(Math.max(...amountsArray), -1)
    }

    findLowestAmountForYAxis = (array, keyToCheck) => {
        const amountsArray = array.map((item) => {
            return item.price
        })
        return _.round(Math.min(...amountsArray), -1)
    }

    fetchFundamentals = async () => {
        const response = await axios.get(`https://api.iextrading.com/1.0/stock/${this.state.investment.ticker}/stats`)
        this.setState({
            fundamentals: response.data,
            fundamentalsReady: true
        })
    }

    fetchNews = async () => {
        const response = await axios.get(`https://api.iextrading.com/1.0/stock/${this.state.investment.ticker}/news/last/10`)
        console.log(response);
        this.setState({
            news: response.data,
            newsReady: true
        })
    }

    deleteStock = async () => {
        try {
            const userId = this.props.match.params.userId
            const totalCurrentValue = this.state.investment.quantity * this.state.investment.price
            const totalPurchasePrice = this.state.investment.quantity * this.state.investment.stockPurchasePrice
            const gainLoss = totalCurrentValue - totalPurchasePrice

            const transaction = {
                ticker: this.state.investment.ticker,
                company_name: this.state.investmentInfo.companyName,
                totalSellValue: totalCurrentValue,
                sharePurchasePrice: this.state.investment.stockPurchasePrice,
                shareSellPrice: this.state.investment.price,
                quantity: this.state.investment.quantity,
                totalPurchasePrice: totalPurchasePrice,
                gainLoss: gainLoss,
                profitLossColor: this.state.profitLossColor,
                saleDate: new Date()
            }

            const transactions = [...this.state.user.transactions]
            transactions.push(transaction)
            const user = { ...this.state.user }
            user.transactions = transactions

            await axios.patch(`/api/users/${userId}`, user)
            swal(`You sold ${this.state.investment.quantity} shares of ${this.state.investment.ticker} at $${this.state.investment.price} \
            for a total of $${totalCurrentValue.toFixed(2)}. \n\n
            You ${gainLoss >= 0 ? 'made' : 'lost'} $${gainLoss.toFixed(2)} on the investment${gainLoss >= 0 ? '!! \n\n ¯\\ (•◡•) /¯' : ' \n\n ¯\\_(ツ)_/¯'}`)
            await axios.delete(`/api/users/${userId}/investments/${this.props.match.params.investmentId}`)
            this.setState({ redirect: !this.state.redirect })
        } catch (err) {
            console.log(err)
        }
    }

    handleEditChange = async (event) => {

        this.setState({
            [event.target.name]: event.target.value
        })
        event.preventDefault()
    }

    updateNumberOfShares = async (event) => {
        try {
            let newQuantity = ''
            const originalQuantity = Number(this.state.originalQuantity)
            const quantity = Number(this.state.quantity)
            if (this.state.buyOrSell === 'sell') {
                newQuantity = (originalQuantity - quantity).toString()
            } else {
                newQuantity = (originalQuantity + quantity).toString()
            }
            const response = await axios.patch(`/api/users/${this.props.match.params.userId}/investments/${this.props.match.params.investmentId}`,
                {
                    quantity: newQuantity
                }
            )
            this.setState({
                editFormShowing: false,
                quantity: newQuantity
            })

        }
        catch (err) {
            console.log(err)
        }
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

        let yesterdayClosePrice = ''
        let changeSinceYesterday = 0
        let yesterdayProfitLossColor
        if (this.state.dailyReady) {
            yesterdayClosePrice = stockArray[1]['4. close']
            changeSinceYesterday = (this.state.investment.price - yesterdayClosePrice) / yesterdayClosePrice
        }

        const totalCurrentValue = this.state.investment.quantity * this.state.investment.price
        const totalPurchasePrice = this.state.investment.quantity * this.state.investment.stockPurchasePrice
        const gainLoss = totalCurrentValue - totalPurchasePrice
        const percentagGainLoss = (gainLoss / totalPurchasePrice) * 100

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
                            {this.state.investmentInfo.companyName} ({this.state.investment.ticker})
                        </CompanyName>
                        <PriceDetail>
                            <PricingDetail>
                                <Detail>
                                    <DetailKey>Current Price: </DetailKey><DetailValue> {accounting.formatMoney(this.state.investment.price)}</DetailValue>
                                </Detail>
                                <Detail>
                                    <DetailKey>Yesterday Price: </DetailKey><DetailValue> {accounting.formatMoney(parseInt(yesterdayClosePrice))}</DetailValue>
                                </Detail>
                                {this.state.dailyReady ?
                                    <Detail>
                                        <DetailKey>% Since Yesterday Close: </DetailKey><GainLossDetailValue profitLossColor={changeSinceYesterday >= 0 ? "green" : "red"}> {changeSinceYesterday.toFixed(2)}%</GainLossDetailValue>
                                    </Detail>
                                    :
                                    null}

                                <Detail>
                                    <DetailKey>Purchase Price: </DetailKey><DetailValue> {accounting.formatMoney(this.state.investment.stockPurchasePrice)}</DetailValue>
                                </Detail>
                                <Detail>
                                    <DetailKey>% Since Purchase: </DetailKey><GainLossDetailValue profitLossColor={this.state.profitLossColor}> {percentagGainLoss.toFixed(2)}%</GainLossDetailValue>
                                </Detail>
                                <Detail>
                                    <DetailKey>Number of Shares: </DetailKey><DetailValue> {this.state.quantity}</DetailValue>
                                </Detail>
                                <Detail>
                                    <DetailKey>Current Value of Shares: </DetailKey><DetailValue> {accounting.formatMoney(this.state.quantity * this.state.investment.price)}</DetailValue>
                                </Detail>
                            </PricingDetail>
                        </PriceDetail>

                        <LineContainer>
                            <LineGraph
                                last2YearStockPrices={this.state.last2YearStockPrices}
                                investment={this.state.investment}
                                investmentName={this.state.investmentInfo.companyName}
                                yAxisDimensions={this.state.yAxisDimensions}
                            />
                        </LineContainer>
                        <EditDeleteButtonsContainer>
                            <div>
                                {this.state.sellConfirmationShowing ?
                                    <StyledButton onClick={this.toggleSellConfirmShowing}>Cancel Sale</StyledButton>
                                    : <StyledButton onClick={this.toggleSellConfirmShowing}>Sell All Shares of {this.state.investment.ticker}</StyledButton>
                                }
                            </div>

                            <Collapse isOpened={this.state.sellConfirmationShowing}>
                                <ReviewContainer>
                                    <SectionTitle>Review Details</SectionTitle>
                                    <ReviewDetailLine><DetailKey>Current price:</DetailKey> {accounting.formatMoney(this.state.investment.price)}</ReviewDetailLine>
                                    <ReviewDetailLine><DetailKey>Number of shares: </DetailKey>{this.state.investment.quantity}</ReviewDetailLine>
                                    <ReviewDetailLine><DetailKey>Original purchase price:</DetailKey> {accounting.formatMoney(this.state.investment.stockPurchasePrice)}</ReviewDetailLine>
                                    <ReviewDetailLine><DetailKey>Original total value:</DetailKey> {accounting.formatMoney(totalPurchasePrice)}</ReviewDetailLine>
                                    <ReviewDetailLine><DetailKey>Total current value: </DetailKey>{accounting.formatMoney(totalCurrentValue)}</ReviewDetailLine>
                                    <ReviewDetailLine><DetailKey>$ Gain/Loss: </DetailKey><GainLossDetailValue profitLossColor={this.state.profitLossColor}>{accounting.formatMoney(gainLoss)}</GainLossDetailValue></ReviewDetailLine>
                                    <ConfirmButton onClick={this.deleteStock}>Click to Confirm Sale</ConfirmButton>

                                </ReviewContainer>
                            </Collapse>
                            <EditContainer>
                                {this.state.editFormShowing ?
                                    <StyledButton onClick={this.toggleEditFormShowing}> Cancel Transaction </StyledButton>
                                    : <StyledButton onClick={this.toggleEditFormShowing}> Buy/Sell {this.state.investment.ticker} Shares </StyledButton>
                                }
                                <Collapse isOpened={this.state.editFormShowing}>
                                    <EditDiv>
                                        <SectionTitle>Trade Shares</SectionTitle>

                                        <ReviewEditContainer>
                                            <SectionTitle>Review Details</SectionTitle>
                                            <ReviewDetailLine><DetailKey>Current price:</DetailKey> {accounting.formatMoney(this.state.investment.price)}</ReviewDetailLine>
                                            <ReviewDetailLine><DetailKey>Number of shares: </DetailKey>{this.state.investment.quantity}</ReviewDetailLine>
                                            <ReviewDetailLine><DetailKey>Original purchase price:</DetailKey> {accounting.formatMoney(this.state.investment.stockPurchasePrice)}</ReviewDetailLine>
                                            <ReviewDetailLine><DetailKey>Original total value:</DetailKey> {accounting.formatMoney(totalPurchasePrice)}</ReviewDetailLine>
                                            <ReviewDetailLine><DetailKey>Total current value: </DetailKey>{accounting.formatMoney(totalCurrentValue)}</ReviewDetailLine>
                                            <ReviewDetailLine><DetailKey>$ Gain/Loss:</DetailKey> <GainLossDetailValue profitLossColor={this.state.profitLossColor}>{accounting.formatMoney(gainLoss)}</GainLossDetailValue></ReviewDetailLine>

                                        </ReviewEditContainer>
                                        {/* <EditInstructions>Please select BUY or SELL and indicate the amount of shares you would like to trade:</EditInstructions> */}

                                        <DropdownMenu>
                                            <div>Transaction Type: </div>
                                            <BuySellSelect name="buyOrSell" onChange={this.handleEditChange}>
                                                <option value="buy">BUY</option>
                                                <option value="sell">SELL</option>
                                            </BuySellSelect>
                                        </DropdownMenu>

                                        <DropdownMenu>
                                            <div>Quantity: </div>
                                            <EditInput onChange={this.handleEditChange} name="quantity" />
                                        </DropdownMenu>

                                        <ConfirmButton onClick={this.updateNumberOfShares}>Click to Confirm Update</ConfirmButton>
                                    </EditDiv>
                                </Collapse>
                            </EditContainer>

                        </EditDeleteButtonsContainer>

                        <DescriptionAndFundamentals>

                            {this.state.fundamentalsReady ?
                                <Fundamentals>
                                    <FundamentalsDetails>
                                        <SectionTitle>Key Metrics</SectionTitle>
                                        <Detail>
                                            <DetailKey>Market Cap:</DetailKey><DetailValue> {this.state.fundamentals.marketcap}</DetailValue>
                                        </Detail>
                                        <Detail>
                                            <DetailKey>EBITDA:</DetailKey><DetailValue> {this.state.fundamentals.EBITDA}</DetailValue>
                                        </Detail>
                                        <Detail>
                                            <DetailKey>52 Week High:</DetailKey><DetailValue> {this.state.fundamentals.week52high}</DetailValue>
                                        </Detail>
                                        <Detail>
                                            <DetailKey>52 Week Low:</DetailKey><DetailValue> {this.state.fundamentals.week52low}</DetailValue>
                                        </Detail>
                                        <Detail>
                                            <DetailKey>Price-to-book:</DetailKey><DetailValue> {this.state.fundamentals.priceToBook}</DetailValue>
                                        </Detail>
                                        <Detail>
                                            <DetailKey>Price-to-sales:</DetailKey><DetailValue> {this.state.fundamentals.priceToSales}</DetailValue>
                                        </Detail>
                                    </FundamentalsDetails>
                                </Fundamentals>
                                : null
                            }


                            <StockDetailsSection
                                investmentInfo={this.state.investmentInfo}
                            />
                        </DescriptionAndFundamentals>

                        <div>
                            {this.state.descriptionShowing ?
                                <BelowFundamentalsButtons>
                                    <StyledButton onClick={this.toggleDescriptionShowing}>Hide Company Description</StyledButton>
                                    <CompanyDescription>{this.state.investmentInfo.description}</CompanyDescription>
                                </BelowFundamentalsButtons>
                                :
                                <BelowFundamentalsButtons>
                                    <StyledButton onClick={this.toggleDescriptionShowing}>More About {this.state.investmentInfo.ticker}</StyledButton>
                                </BelowFundamentalsButtons>
                            }
                        </div>

                    </Company>
                }

                <StockNews
                    news={this.state.news}
                    newsReady={this.state.newsReady}
                    investmentName={this.state.investmentInfo.companyName}
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

const PricingDetail = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: space-between;
    border-radius: 5px;
    border: 1px solid black;
    width: 300px;
    padding: 10px;
    height: 180px;
    padding-bottom: 5px;

`

const GainLossDetailValue = styled.div`
    background-color: ${props => props.profitLossColor};
    padding: 2px;
    border-radius: 3px;
    color: white;

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
    @media (min-width:700px) {
        flex-direction: row;
        justify-content: space-around;
        width: 700px;
        align-items: flex-start;
    }
`

const ReviewContainer = styled.div`
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid black;
    width: 300px;
`

const ReviewEditContainer = styled.div`
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid black;
    width: 250px;
`

const EditDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid;
`

const EditInput = styled.input`
    border-radius: 5px;
    border: 1px solid black;
    height: 20px;
    width: 30px;
    font-size: 16px;
`

const EditContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
`

const ReviewDetailLine = styled.div`
    display: flex;
    justify-content: space-between;
`

const BuySellSelect = styled.select`
    font-size: 16px;
    padding: 5px;
    margin: 3px;
    border: 1px solid black;
`

const EditInstructions = styled.div`
    display: flex;
    justify-content: center;
`

const DropdownMenu = styled.div`
    display: flex;
    align-items: flex-end;

`

// const PricingDetailDiv = styled.div`
//     display: flex;
//     font-size: 14px;
// `

// const ReviewTitle = styled.div`
//     font-size: 18px;
// `


// const DetailValueSpan = styled.span`

// `