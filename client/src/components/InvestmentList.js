import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { Collapse } from 'react-collapse'
import NewInvestment from './NewInvestment'
import StyledButton from './styled-components/StyledButton'
import { PieChart } from 'react-easy-chart'
import WaitingPage from './WaitingPage'
import PortfolioSummary from './PortfolioSummary'
import HeaderBar from './HeaderBar'


class InvestmentList extends Component {
    state = {
        user: {},
        investments: [],
        showNewForm: false,
        portfolioTotal: '',
        portfolioCost: '',
        profitOrLoss: '',
        profitLossColor: '',
        pageReady: false
    }

    componentWillMount = async () => {
        setTimeout(() => this.getAllInvestments(), 1600)
    }

    getAllInvestments = async () => {
        try {
            const response = await axios.get(`/api/users/${this.props.match.params.id}/investments`)

            this.setState({
                investments: response.data.updatedStockInfo,
                portfolioTotal: response.data.portfolioTotal.toFixed(2),
                portfolioCost: response.data.portfolioCost.toFixed(2),
                profitOrLoss: (response.data.portfolioTotal.toFixed(2) - response.data.portfolioCost.toFixed(2)),
                user: response.data.user,
                profitLossColor: response.data.profitLossColor,
                showNewForm: false,
                pageReady: true
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    toggleAddStockForm = async () => {
        this.setState({ showNewForm: !this.state.showNewForm })
    }

    render() {

        const pieData = this.state.investments.map((investment) => {
            const randomR = Math.floor(Math.random() * 60) + 50
            const randomG = Math.floor(Math.random() * 60) + 150
            const randomB = Math.floor(Math.random() * 34) + 220
            return { key: investment.ticker, value: investment.total, color: `rgb(${randomR}, ${randomG}, ${randomB})` }
        })

        return (
            <div>
                {this.state.pageReady ?
                    <div>
                        <HeaderPlacement>
                            <HeaderBar
                                user={this.state.user}
                                backLink={`/users/${this.state.user._id}`}
                            />
                        </HeaderPlacement>

                        <Table>

                            <Column1>
                                <ColumnTitle1>Stock</ColumnTitle1>

                                {this.state.investments.map(investment => (
                                    <TickerContainer key={investment._id}>
                                        <Link to={`/users/${this.props.match.params.id}/investments/${investment._id}`}>
                                            <Ticker><TickerName>{investment.ticker}</TickerName></Ticker>
                                        </Link>
                                    </TickerContainer>
                                ))}
                                
                            </Column1>

                            <Column2>
                                <ColumnTitle>qty</ColumnTitle>
                                {this.state.investments.map(investment => {
                                    return <Holder key={investment._id}>{investment.quantity}</Holder>
                                })}
                            </Column2>
                            <HiddenMobileColumnOdd>
                                <ColumnTitle>purchase ($)</ColumnTitle>
                                {this.state.investments.map(investment => {
                                    return <Holder key={investment._id}>{investment.stockPurchasePrice}</Holder>
                                })}
                            </HiddenMobileColumnOdd>

                            <HiddenMobileColumnEven>
                                <ColumnTitle>change (%)</ColumnTitle>
                                {this.state.investments.map(investment => {
                                    return <Holder key={investment._id}>{(((investment.price - investment.stockPurchasePrice) / investment.stockPurchasePrice) * 100).toFixed(1)}%</Holder>
                                })}
                            </HiddenMobileColumnEven>
                            <ColumnOdd>
                                <ColumnTitle>current ($)</ColumnTitle>
                                {this.state.investments.map(investment => {
                                    return <Holder key={investment._id}>{investment.price.toFixed(2)}</Holder>
                                })}
                            </ColumnOdd>
                            <ColumnEven>
                                <ColumnTitle>total ($)</ColumnTitle>
                                {this.state.investments.map(investment => {
                                    return <Holder key={investment._id}>{investment.total.toFixed(2)}</Holder>
                                })}
                            </ColumnEven>


                            <ColumnOdd>
                                <ColumnTitle>profit ($)</ColumnTitle>
                                {this.state.investments.map(investment => {
                                    return <Holder key={investment._id}>{investment.profit.toFixed(2)}</Holder>
                                })}
                            </ColumnOdd>
                        </Table>

                        <BottomPageContainer>
                            <SummaryAndAddContainer>
                            <PortfolioSummary
                                profitLossColor={this.state.profitLossColor}
                                portfolioTotal={this.state.portfolioTotal}
                                portfolioCost={this.state.portfolioCost}
                                profitOrLoss={this.state.profitOrLoss}
                            />

                            <NewInvestmentContainer>
                                {this.state.showNewForm ?
                                    <StyledButton onClick={this.toggleAddStockForm}>Cancel Purchase</StyledButton>
                                    : <StyledButton onClick={this.toggleAddStockForm}>Add New Stock</StyledButton>
                                }
                                <Collapse isOpened={this.state.showNewForm}>
                                    <NewInvestment 
                                        userId={this.props.match.params.id} 
                                        getAllInvestments={this.getAllInvestments} 
                                        investments={this.state.investments}
                                    />
                                </Collapse>
                            </NewInvestmentContainer>
                            </SummaryAndAddContainer>

                            <PieContainer>
                                <PieChart className="pie-chart"
                                    size={310}
                                    padding={0}
                                    labels
                                    
                                    innerHoleSize={30}
                                    data={pieData}
                                    styles={{
                                        '.chart_text': {
                                            fontSize: '1em',
                                            fill: '#fff'
                                        }
                                    }}
                                />
                            </PieContainer>
                        </BottomPageContainer>
                    </div>

                    :
                    <div>

                        <WaitingPage /> 
                    </div>}
            </div>
        )
    }
}

export default InvestmentList

const Holder = styled.div`
    padding: 5px 0;
`

const Column1 = styled.div`
    text-align: left;
    background-color: #45b9f2;
    padding-left: 8px;
    padding-top: 10px;

    @media (min-width: 400px) {
        width: 100%;
    }

    @media (min-width: 700px) {
        font-size: 20px;
    }
    @media (max-width: 355px) {
        font-size: 12px;
    }
`

const Column2 = styled.div`
    background-color: #238dce;
    text-align: center;
    padding: 10px 7px;
    @media (min-width: 400px) {
        width: 100%;
    }
    @media (min-width: 700px) {
        font-size: 20px;
    }
    @media (max-width: 355px) {
        font-size: 12px;
    }
    
`

const ColumnOdd = styled.div`
    text-align: center;
    background-color: #45b9f2;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    padding-top: 10px;
    padding-bottom: 10px;
    @media (min-width: 700px) {
        font-size: 20px;
    }
    @media (max-width: 355px) {
        font-size: 12px;
    }
    @media (max-width: 355px) {
        font-size: 12px;
    }
`

const ColumnEven = styled.div`
    background-color: #238dce;
    width: 100%;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    @media (min-width: 700px) {
        font-size: 20px;
    }
    @media (max-width: 355px) {
        font-size: 12px;
    }
`

const ColumnTitle = styled.div`
    padding-bottom: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    @media (min-width: 900px) {
        font-size: 20px;
    }
    @media (max-width: 355px) {
        font-size: 12px;
    }
    @media (max-width: 270px) {
        font-size: 9px;
    }
`

const ColumnTitle1 = styled.div`
    padding-bottom: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    @media (min-width: 700px) {
        font-size: 20px;
    }
    @media (min-width: 400px) {
        padding-left: 3vw;
    }
`

const Table = styled.div`
    display: flex;
    justify-content: space-between;
    color: white; 
    padding-top: 50px;
`

const Ticker = styled.div`
    text-decoration: underline;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const TickerContainer = styled.div`
    padding: 5px 0;
    width: 100%;
`

const TickerName = styled.div`
    padding-right: 5px;
    
    @media (min-width: 400px) {
        padding-left: 3vw;
    }
`

const BottomPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 500px) {
        flex-direction: row-reverse;
        justify-content: center;
    }

`

const SummaryAndAddContainer = styled.div`
        @media (min-width: 500px) {
            display: flex
            flex-direction: column;
            align-items: center;
            margin-right: 20px;
    }
`

const NewInvestmentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const PieContainer = styled.div`
    margin-top: 30px;
    @media (min-width: 500px) {
        margin-left: 20px;
    }
`

const HeaderPlacement = styled.div`
    display: flex;
    justify-content: center;
    background-color: #45b9f2;
    color: white;
    padding-bottom: 10px;
    position : fixed;
    z-index : 999;
`

const HiddenMobileColumnOdd = styled.div`
    width: 0%;
    background-color: #45b9f2; 
    text-align: center;
    @media(min-width: 800px) {
        font-size: 20px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    @media (max-width: 355px) {
        font-size: 12px;
    }
`

const HiddenMobileColumnEven = styled.div`
    width: 0%;
    background-color: #238dce;
    text-align: center;
    @media(min-width: 800px) {
        font-size: 20px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    @media (max-width: 355px) {
        font-size: 12px;
    }
`