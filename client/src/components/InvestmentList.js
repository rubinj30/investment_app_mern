import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import NewInvestment from './NewInvestment'
import StyledButton from './styled-components/StyledButton'
import { PieChart } from 'react-easy-chart'
import accounting from 'accounting'
import { FaArrowCircleRight, FaUser, FaFolderOpenO } from 'react-icons/lib/fa'
import PortfolioSummary from './PortfolioSummary'
var randomColor = require('randomcolor')


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
        await this.getAllInvestments()
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
                        <UserDiv>
                            <Username>{this.state.user.username}</Username>
                            <Link to={`/users/${this.state.user._id}`}><FaUser /></Link>
                        </UserDiv>
                        <Table>

                            <Column1>
                                <ColumnTitle>ticker</ColumnTitle>

                                {this.state.investments.map(investment => (
                                    <TickerContainer key={investment._id}>
                                        <LinkTag href={`/users/${this.props.match.params.id}/investments/${investment._id}`}>
                                            <Ticker><TickerName>{investment.ticker}</TickerName>
                                            <FolderIconSpan><FaFolderOpenO /></FolderIconSpan>
                                            
                                            </Ticker>
                                        </LinkTag>
                                    </TickerContainer>
                                ))}
                            </Column1>

                            <Column className='stock-item-pad'>
                                <ColumnTitle>quantity</ColumnTitle>
                                {this.state.investments.map(investment => {
                                    return <Holder key={investment._id}>{investment.quantity}</Holder>
                                })}
                            </Column>
                            <Column className='stock-item-pad'>
                                <ColumnTitle>price</ColumnTitle>
                                {this.state.investments.map(investment => {
                                    return <Holder key={investment._id}>{investment.price}</Holder>
                                })}
                            </Column>
                            <Column4 className='stock-item-pad'>
                                <ColumnTitle>total</ColumnTitle>
                                {this.state.investments.map(investment => {
                                    return <Holder key={investment._id}>{accounting.formatMoney(investment.total)}</Holder>
                                })}
                            </Column4>
                            <Column className='stock-item-pad'>
                                <ColumnTitle>price</ColumnTitle>
                                {this.state.investments.map(investment => {
                                    return <Holder key={investment._id}>{investment.price}</Holder>
                                })}
                            </Column>
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
                            <QuoteHolder>"The creator of this app is why I am rich."</QuoteHolder>
                            <QuoteBy> <div>- Warren Buffet</div></QuoteBy>
                        </SplashPage>
                    </div>}
            </div>
        )
    }
}

export default InvestmentList

const UserDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 10px 25px;
`
const Username = styled.div`
    padding-right: 10px;
`

const Column = styled.div`
    /* border-right: 1px black solid; */
    text-align: right;
`

const Holder = styled.div`
    padding: 5px 0;
`

const Column1 = styled.div`
    /* border-right: 1px black solid; */
    text-align: left;
`
const Column4 = styled.div`
    /* border-right: 1px black solid; */
    text-align: right;
`

const ColumnTitle = styled.div`
    padding-bottom: 8px;

`
const Table = styled.div`
    border: 1px black solid;
    padding: 7px;
    display: flex;
    justify-content: space-between;
    background-color: #947CB0;
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
const LinkTag = styled.a`
    text-decoration: none;
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
    background-color: #947CB0;
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