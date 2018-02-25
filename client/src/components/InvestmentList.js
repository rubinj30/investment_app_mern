import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import NewInvestment from './NewInvestment'

class InvestmentList extends Component {
    state = {
        user: {},
        investments: [],
        fakePrices: ['23', '122', '1,2231', '12', '21'],
        fakeTotals: ['1,000.44', '2,000.22', '12,500.12', '1,234.00', '9,928.21']
    }

    componentWillMount = async () => {
        await this.getAllInvestments()
    }

    getAllInvestments = async () => {
        try {
            const response = await axios.get(`/api/users/${this.props.match.params.id}/investments`)
            this.setState({
                investments: response.data.investments,
                user: response.data
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    // fetchStockPrices = async () = {
    //     // const stocks = this.state.investments.map(investment => {
    //     //     return <div></div>
    //     // })
    // }

    render() {
        return (
            <div>
                <Table>

                    <Column>
                        <ColumnTitle>ticker</ColumnTitle>

                        {this.state.investments.map(investment => (
                            <div>

                                <Link key={investment._id} to={`/users/${this.props.match.params.id}/investments/${investment._id}`}>
                                    <Ticker>{investment.ticker}</Ticker>
                                </Link>

                            </div>
                        ))}
                    </Column>
                    
                    <Column>
                    <ColumnTitle>quantity</ColumnTitle>
                        {this.state.investments.map(investment => {
                            return <div>{investment.quantity}</div>
                        })}
                    </Column>
                    <Column>
                    <ColumnTitle>price</ColumnTitle>
                        {this.state.fakePrices.map(price => {
                            return <div>{price}</div>
                        })}
                    </Column>
                    <Column>
                    <ColumnTitle>total</ColumnTitle>
                        {this.state.fakeTotals.map(total => {
                            return <div>{total}</div>
                        })}

                    </Column>


                </Table>

                <button onClick={this.toggleShowNewForm}>Add Investment</button>

                {this.state.showNewForm ? <NewInvestment getAllInvestments={this.getAllInvestments} /> : null}
            </div>
        )
    }
}

export default InvestmentList

const Column = styled.div`
    /* border-right: 1px black solid; */
`
const ColumnTitle = styled.div`
    padding-bottom: 8px;

`

const Table = styled.div`
    border: 1px black solid;
    padding: 2px;
    display: flex;
    justify-content: space-between;
`
const Ticker = styled.div`
    color: black;
    text-decoration: none;
`