import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import NewInvestment from './NewInvestment'

class InvestmentList extends Component {
    state = {
        user: {},
        investments: [],
        newShowForm: false,
        investments2: []
    }

    componentWillMount() {
        this.getAllInvestments()
    }

    getAllInvestments = async () => {
        const response = await axios.get(`/api/users/${this.props.match.params.id}/investments`)
        this.setState({ 
            investments: response.data.investments
        })
    }

    toggleShowNewForm = () => {
        this.setState({ showNewForm: !this.state.showNewForm })
    }


    render() {
        return (
            <div>
                <Table>
                    <Column>
                    {this.state.investments.map(investment => (
                        <div>
                            
                            <Link key={investment._id} to={`/users/${this.props.match.params.userId}/investments/${investment._id}`}>
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