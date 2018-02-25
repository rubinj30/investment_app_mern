import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import NewInvestment from './NewInvestment'

class InvestmentList extends Component {
    state = {
        user: {},
        investments: []
    }

    componentWillMount = async () => {
        await this.getAllInvestments()
    }

    getAllInvestments = async () => {
        try {
            const response = await axios.get(`/api/users/5a92fd07e469e91497e040ea/investments`)
            this.setState({
                investments: response.data.investments,
                user: response.data
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div>
                    <Table>
                        <Column>

                            {this.state.investments.map(investment => (
                                <div>

                                    <Link key={investment._id} to={`/users/${this.props.match.params.id}/investments/${investment._id}`}>
                                        {investment.ticker}
                                    </Link>

                                </div>
                            ))}
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
    border-right: 1px black solid;
`
const Table = styled.div`
    border: 1px black solid;
    padding: 2px;
`