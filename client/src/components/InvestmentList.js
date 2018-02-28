import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import NewInvestment from './NewInvestment'
import StyledButton from './styled-components/StyledButton'
import { PieChart } from 'react-easy-chart'
import accounting from 'accounting'
import { FaArrowCircleRight, FaUser } from 'react-icons/lib/fa'


class InvestmentList extends Component {
    state = {
        user: {},
        investments: [],
        showNewForm: false,
        portfolioTotal: '',
        portfolioCost: '',
        profitOrLoss: '',
        profitLossColor: ''
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
                showNewForm: false
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
        return (
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
                                    <Ticker><TickerName>{investment.ticker}</TickerName><FaArrowCircleRight /></Ticker>
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


                </Table>
                <div>TOTAL COST: {accounting.formatMoney(this.state.portfolioCost)}</div>
                <div>TOTAL PROFIT/LOSS: <ProfitLoss profitLossColor={this.state.profitLossColor}>
                    {accounting.formatMoney(this.state.profitOrLoss)}
                </ProfitLoss></div>
                <div>TOTAL VALUE: {accounting.formatMoney(this.state.portfolioTotal)}</div>

                <StyledButton onClick={this.toggleAddStockForm}>Add Investment</StyledButton>

                {this.state.showNewForm ? <NewInvestment userId={this.props.match.params.id} getAllInvestments={this.getAllInvestments} /> : null}

                <PieChart className="pie-chart"
                    size={250}
                    labels
                    data={[
                        // use randomizer between certain colors
                        { key: 'LL', value: 100, color: 'rgb(10, 90, 250)' },
                        { key: 'DAL', value: 200, color: 'rgb(30, 70, 230)' },
                        { key: 'NKE', value: 200, color: 'rgb(50, 50, 210)' },
                        { key: 'AMZN', value: 200, color: 'rgb(70, 30, 190)' },
                        { key: 'T', value: 200, color: 'rgb(90, 10, 170)' }

                    ]}
                    styles={{
                        '.chart_text': {
                            fontSize: '1em',
                            fill: '#fff'
                        }
                    }}
                />


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
    text-decoration: none;
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