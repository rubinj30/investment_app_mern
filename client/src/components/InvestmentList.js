import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import NewInvestment from './NewInvestment'
import StyledButton from './styled-components/StyledButton'
import { PieChart } from 'react-easy-chart'
import accounting from 'accounting'

class InvestmentList extends Component {
    state = {
        user: {},
        investments: [],
        showNewForm: false,
        portfolioTotal: ''
    }

    componentWillMount = async () => {
        await this.getAllInvestments()
    }

    getAllInvestments = async () => {
        try {
            const response = await axios.get(`/api/users/${this.props.match.params.id}/investments`)
            this.setState({
                investments: response.data.updatedStockInfo,
                portfolioTotal: response.data.portfolioTotal,
                user: response.data.user,
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
                <Table>

                    <Column1>
                        <ColumnTitle>ticker</ColumnTitle>

                        {this.state.investments.map(investment => (
                            <div key={investment._id}>
                                <Link to={`/users/${this.props.match.params.id}/investments/${investment._id}`}>
                                    <Ticker>{investment.ticker}</Ticker>
                                </Link>
                            </div>
                        ))}
                    </Column1>

                    <Column>
                        <ColumnTitle>quantity</ColumnTitle>
                        {this.state.investments.map(investment => {
                            return <div key={investment._id}>{investment.quantity}</div>
                        })}
                    </Column>
                    <Column>
                        <ColumnTitle>price</ColumnTitle>
                        {this.state.investments.map(investment => {
                            return <div key={investment._id}>{investment.price}</div>
                        })}
                    </Column>
                    <Column4>
                        <ColumnTitle>total</ColumnTitle>
                        {this.state.investments.map(investment => {
                            return <div key={investment._id}>{accounting.formatMoney(investment.total)}</div>
                        })}

                    </Column4>


                </Table>
                <div>TOTAL: {accounting.formatMoney(this.state.portfolioTotal)}</div>

                <StyledButton onClick={this.toggleAddStockForm}>Add Investment</StyledButton>

                {this.state.showNewForm ? <NewInvestment userId={this.props.match.params.id} getAllInvestments={this.getAllInvestments} /> : null}

                <PieChart className="pie-chart"
                size={250}
                    labels
                    data={[
                        // use randomizer between certain colors
                        { key: 'LL', value: 100, color: 'rgb(10, 90, 250)' },
                        { key: 'DAL', value: 200, color: 'rgb(30, 70, 230)' },
                        { key: 'NKE', value: 200, color: 'rgb(50, 50, 210)'  },
                        { key: 'AMZN', value: 200, color: 'rgb(70, 30, 190)'  },
                        { key: 'T', value: 200, color: 'rgb(90, 10, 170)'  }

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