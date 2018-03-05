import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import NewInvestment from './NewInvestment'
import StyledButton from './styled-components/StyledButton'
import { PieChart } from 'react-easy-chart'
import accounting from 'accounting'
import PortfolioSummary from './PortfolioSummary'
import HeaderBar from './HeaderBar'
var randomColor = require('randomcolor')
var Spinner = require('react-spinkit');


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
        await this.getAllInvestments(), 5000
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
//75 186 240
    render() {

        const pieData = this.state.investments.map((investment) => {
            const randomR = Math.floor(Math.random() * 60) + 50
            const randomG = Math.floor(Math.random() * 60) + 150
            const randomB = Math.floor(Math.random() * 34) + 220 
            return {key: investment.ticker, value: investment.total, color: `rgb(${randomR}, ${randomG}, ${randomB})`}
        })

        console.log(pieData)

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
                                <ColumnTitle>ticker</ColumnTitle>

                                {this.state.investments.map(investment => (
                                    <TickerContainer key={investment._id}>
                                        <Link to={`/users/${this.props.match.params.id}/investments/${investment._id}`}>
                                            <Ticker><TickerName>{investment.ticker}</TickerName>
                                            {/* <FolderIconSpan><FaFolderOpenO /></FolderIconSpan> */}
                                            
                                            </Ticker>
                                        </Link>
                                    </TickerContainer>
                                ))}
                            </Column1>

                            <Column2>
                                <ColumnTitle>#</ColumnTitle>
                                {this.state.investments.map(investment => {
                                    return <Holder key={investment._id}>{investment.quantity}</Holder>
                                })}
                            </Column2>
                            <ColumnOdd>
                                <ColumnTitle>current ($)</ColumnTitle>
                                {this.state.investments.map(investment => {
                                    return <Holder key={investment._id}>{investment.price}</Holder>
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
                            <PortfolioSummary
                                profitLossColor={this.state.profitLossColor}
                                portfolioTotal={this.state.portfolioTotal}
                                portfolioCost={this.state.portfolioCost}
                                profitOrLoss={this.state.profitOrLoss}
                            />

                            {this.state.showNewForm ?
                                <NewInvestmentContainer>
                                    <StyledButton onClick={this.toggleAddStockForm}>- Add Investment</StyledButton>
                                    <NewInvestment userId={this.props.match.params.id} getAllInvestments={this.getAllInvestments} />
                                </NewInvestmentContainer>
                                :
                                <StyledButton onClick={this.toggleAddStockForm}>+ Add Investment</StyledButton>
                            }
                            <PieContainer>
                            <PieChart className="pie-chart"
                                size={250}
                                labels
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

                        <SplashPage>

                            <Spinner name="line-scale" />
                            <QuoteHolder>"This app made me rich."</QuoteHolder>
                            <QuoteBy> <div>- Warren Buffet</div></QuoteBy>
                        </SplashPage>
                    </div>}
            </div>
        )
    }
}

export default InvestmentList


const Column = styled.div`
    /* border-right: 1px black solid; */
    text-align: center;
    background-color: #135f7c;
    padding: center;
`

const Holder = styled.div`
    padding: 5px 0;
`

const Column1 = styled.div`
    text-align: left;
    background-color: #45b9f2;
    padding-left: 8px;
    padding-top: 10px;
`

const Column2 = styled.div`
    background-color: #238dce;
    text-align: center;
    padding: 0 7px;
    padding-top: 10px;
    padding-bottom: 10px;
    
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
`

const ColumnEven = styled.div`
    background-color: #238dce;
    width: 100%;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
`

const ColumnTitle = styled.div`
    padding-bottom: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
`

const Table = styled.div`
    display: flex;
    justify-content: space-between;
    color: white;
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
`

const ProfitLoss = styled.span`
    color: ${props => props.profitLossColor};
`

const SplashPage = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #45b9f2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const QuoteBy = styled.div`
    display:flex;
    justify-content: center;
    color: white;
`

const QuoteHolder = styled.div`
    color: white;
    padding: 20px;
`

const BottomPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const NewInvestmentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const FolderIconSpan = styled.div`
    /* width: 20px; */
`
const SummaryTitle = styled.div`

`

const PieContainer = styled.div`
    margin-top: 30px;
`

const HeaderPlacement = styled.div`
    display: flex;
    justify-content: center;
    background-color: #45b9f2;
    color: white;
    padding-bottom: 10px;
`