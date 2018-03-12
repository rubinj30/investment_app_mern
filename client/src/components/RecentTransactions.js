import React, { Component } from 'react'
import styled from 'styled-components'
import accounting from 'accounting'
import moment from 'moment'

class RecentTransactions extends Component {
    render() {

        return (
            <div>
                {this.props.user.transactions.length > 0 ? <RecentSaleTitle>Recent Sales of Investments</RecentSaleTitle> : null}
                {
                    this.props.user.transactions.map((transaction, index) => {
                        return <TransactionItem key={index} >
                            <TransactionTitle>SOLD - {transaction.company_name} ({transaction.ticker})
                                <SaleDataSpan>{moment(transaction.saleDate).format('LL')}</SaleDataSpan>
                            </TransactionTitle>
                            <div>Shares: {transaction.quantity} shares at {transaction.shareSellPrice}</div>
                            <div>Original Price: {accounting.formatMoney(transaction.sharePurchasePrice)}</div>
                            <ProfitLossContainer profitLossColor={transaction.profitLossColor}>Profit/Loss for this investment: {accounting.formatMoney(transaction.gainLoss)}</ProfitLossContainer>

                        </TransactionItem>
                    })
                }

            </div>
        );
    }
}

export default RecentTransactions;

const TransactionItem = styled.div`
    border: black 1px solid;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
    width: 350px;
    font-size: 14px;
`

const TransactionTitle = styled.div`
    font-size: 16px;
    padding-bottom: 7px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    /* text-decoration: underline; */
`

const ProfitLossContainer = styled.div`
    background-color: ${props => props.profitLossColor};
    padding: 2px; 
    margin-top: 7px;
    border-radius: 5px;
    color: white;
    text-align: center;

`

const RecentSaleTitle = styled.div`
    font-size: 20px;
    padding-bottom: 15px;
    padding-top: 30px;
    text-align: center;
`

const SaleDataSpan = styled.span`
    color: grey;

`