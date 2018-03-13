import React, { Component } from 'react'
import { DetailValue, SectionTitle, Detail, StockDetails, DetailKey, Website } from './styled-components/Details'


class StockDetailsSection extends Component {
    render() {

        const url = "http://" + this.props.investmentInfo.company_url
        
        return (
            <div>
                <StockDetails>
                    <SectionTitle>Company Details</SectionTitle>
                    <Detail>
                        <DetailKey>CEO:</DetailKey><DetailValue> {this.props.investmentInfo.ceo}</DetailValue>
                    </Detail>
                    <Detail>
                        <DetailKey># of Employees:</DetailKey><DetailValue> {this.props.investmentInfo.employees}</DetailValue>
                    </Detail>
                    <Detail>
                        <DetailKey>HQs Located in:</DetailKey><DetailValue> {this.props.investmentInfo.hq_state}</DetailValue>
                    </Detail>
                    <Detail>
                        <DetailKey>Industry:</DetailKey><DetailValue> {this.props.investmentInfo.industry_category}</DetailValue>
                    </Detail>
                    <Detail>
                        <DetailKey>Exchange:</DetailKey><DetailValue> {this.props.investmentInfo.stock_exchange}</DetailValue>
                    </Detail>

                    <Website>
                        <DetailValue><a href={url} target="_blank">Go to the {this.props.investmentInfo.name} website</a></DetailValue>
                    </Website>

                </StockDetails>
                
            </div>
        );
    }
}

export default StockDetailsSection