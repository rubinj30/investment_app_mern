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
                        <DetailKey>CEO:</DetailKey><DetailValue> {this.props.investmentInfo.CEO}</DetailValue>
                    </Detail>
                    <Detail>
                        <DetailKey>Industry:</DetailKey><DetailValue> {this.props.investmentInfo.industry}</DetailValue>
                    </Detail>
                    <Detail>
                        <DetailKey>Sector:</DetailKey><DetailValue> {this.props.investmentInfo.sector}</DetailValue>
                    </Detail>
                    <Detail>
                        <DetailKey>Exchange:</DetailKey><DetailValue> {this.props.investmentInfo.exchange}</DetailValue>
                    </Detail>
                    <p>{this.props.investmentInfo.description}</p>

                    <Website>
                        <DetailValue><a href={this.props.investmentInfo.website} target="_blank">Go to the {this.props.investmentInfo.name} website</a></DetailValue>
                    </Website>

                </StockDetails>
                
            </div>
        );
    }
}

export default StockDetailsSection

