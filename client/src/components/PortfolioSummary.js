import React, { Component } from 'react';
import accounting from 'accounting'
import styled from 'styled-components'

class PortfolioSummary extends Component {
    render() {
        return (
            <SummaryContainer>
                <TotalCost>
                    <div>total cost:</div> <div> {accounting.formatMoney(this.props.portfolioCost)}</div>
                </TotalCost>

                <TotalValue>
                    <div>total value:</div> <div>{accounting.formatMoney(this.props.portfolioTotal)}</div>
                </TotalValue>

                <ProfitContainer>
                    <div>profit/loss:</div> <ProfitLoss profitLossColor={this.props.profitLossColor}>
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
    width: 200px;
    justify-content: space-between;
`
const ProfitContainer = styled.div`
    display: flex;
    width: 200px;
    justify-content: space-between;

`
const TotalValue = styled.div`
    display: flex;
    width: 200px;
    justify-content: space-between;

`

const SummaryContainer = styled.div`
    height: 100px;
    display:flex;
    flex-direction: column;
    justify-content: space-around;

`