import React, { Component } from 'react';
import accounting from 'accounting'
import styled from 'styled-components'
import {DetailKey} from './styled-components/Details'

class PortfolioSummary extends Component {
    render() {
        return (
            <SummaryContainer>
                <SummaryTitle>Porfolio Summary</SummaryTitle>
                <TotalCost>
                    <DetailKey>total cost:</DetailKey> <div> {accounting.formatMoney(this.props.portfolioCost)}</div>
                </TotalCost>

                <TotalValue>
                    <DetailKey>total value:</DetailKey> <div>{accounting.formatMoney(this.props.portfolioTotal)}</div>
                </TotalValue>

                <ProfitContainer>
                    <DetailKey>profit/loss:</DetailKey> <ProfitLoss profitLossColor={this.props.profitLossColor}>
                        {this.props.profitOrLoss > 0 ? "+ " : null}
                        {accounting.formatMoney(this.props.profitOrLoss)}
                    </ProfitLoss>
                </ProfitContainer>
            </SummaryContainer>
        );
    }
}

export default PortfolioSummary

const ProfitLoss = styled.div`
    background-color: ${props => props.profitLossColor};
    padding: 3px;
    border-radius: 3px;
    color: white;
`

const TotalCost = styled.div`
    display: flex;
    width: 240px;
    justify-content: space-between;
`
const ProfitContainer = styled.div`
    display: flex;
    width: 240px;
    justify-content: space-between;

`
const TotalValue = styled.div`
    display: flex;
    width: 240px;
    justify-content: space-between;
`

const SummaryContainer = styled.div`
    height: 120px;
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 10px 10px 10px 10px;
    margin: 15px;
    align-items: center;
    border-radius: 5px;
    border: 1px solid black;
`

const SummaryTitle = styled.div`
    text-align: center;
    padding-bottom: 8px;
`