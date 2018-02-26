import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import NewInvestment from './NewInvestment'
import StyledButton from './styled-components/StyledButton'

class InvestmentList extends Component {
    state = {
        user: {},
        investments: [],
        showNewForm: false
    }

    componentWillMount = async () => {
        await this.getAllInvestments()
    }

    getAllInvestments = async () => {
        try {
            const response = await axios.get(`/api/users/${this.props.match.params.id}/investments`)
            this.setState({
                investments: response.data.updatedStockInfo,
                user: response.data.user
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    
    toggleAddStockForm = async () => {
        this.setState({showNewForm: !this.state.showNewForm})
    }

    render() {
        return (
            <div>
                <Table>

                    <Column1>
                        <ColumnTitle>ticker</ColumnTitle>

                        {this.state.investments.map(investment => (
                            <div>
                                <Link key={investment._id} to={`/users/${this.props.match.params.id}/investments/${investment._id}`}>
                                    <Ticker>{investment.ticker}</Ticker>
                                </Link>
                            </div>
                        ))}
                    </Column1>
                    
                    <Column>
                    <ColumnTitle>quantity</ColumnTitle>
                        {this.state.investments.map(investment => {
                            return <div>{investment.quantity}</div>
                        })}
                    </Column>
                    <Column>
                    <ColumnTitle>price</ColumnTitle>
                        {this.state.investments.map(investment => {
                            return <div>{investment.price}</div>
                        })}
                    </Column>
                    <Column4>
                    <ColumnTitle>total</ColumnTitle>
                        {this.state.investments.map(investment => {
                            return <div>{investment.total}</div>
                        })}

                    </Column4>


                </Table>

                <StyledButton onClick={this.toggleAddStockForm}>Add Investment</StyledButton>

                {this.state.showNewForm ? <NewInvestment getAllInvestments={this.getAllInvestments} /> : null}
            </div>
        )
    }
}

export default InvestmentList

const Column = styled.div`
    /* border-right: 1px black solid; */
    text-align: right;
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

`
const Ticker = styled.div`
    text-decoration: none;
`