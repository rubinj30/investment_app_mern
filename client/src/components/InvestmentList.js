import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import NewInvestment from './NewInvestment'
import StyledButton from './styled-components/StyledButton'
import { PieChart } from 'react-easy-chart'
import accounting from 'accounting'
// import { FaArrowCircleRight, FaFolderOpenO } from 'react-icons/lib/fa'
import PortfolioSummary from './PortfolioSummary'
import UserIcon from './UserIcon'
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
        setTimeout(await this.getAllInvestments(), 5000)
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
            const random = Math.floor(Math.random() * 180) + 1
            return {key: investment.ticker, value: investment.total, color: `rgb(${random}, ${random}, 255)`}
        })

        console.log(pieData)

        return (
            <div>
                {this.state.pageReady ?
                    <div>
                        <UserIcon 
                            user={this.state.user}
                            />

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
                                <ColumnTitle>value ($)</ColumnTitle>
                                {this.state.investments.map(investment => {
                                    return <Holder key={investment._id}>{investment.price}</Holder>
                                })}
                            </ColumnOdd>
                            <ColumnEven>
                                <ColumnTitle>current price ($)</ColumnTitle>
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
    padding: center
`

const Holder = styled.div`
    padding: 5px 0;
`

const Column1 = styled.div`
    text-align: left;
    background-color: #45b9f2;
    padding-left: 8px;
`

const Column2 = styled.div`
    background-color: #238dce;
    text-align: center;
    padding: 0 7px;
    
`

const ColumnOdd = styled.div`
    text-align: center;
    background-color: #45b9f2;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
`

const ColumnEven = styled.div`
    background-color: #238dce;
    width: 100%;
    text-align: center;
`

const ColumnTitle = styled.div`
    padding-bottom: 10px;

`
const Table = styled.div`
    display: flex;
    justify-content: space-between;
    color: white;
    padding-top: 10px;

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