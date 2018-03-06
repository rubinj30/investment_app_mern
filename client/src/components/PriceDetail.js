
class PriceDetail extends Component {
    render() {
        return(

            <PriceDetail>
<PricingDetail>
    <PricingDetailDiv>
        <CurrentPrice>Current Price: </CurrentPrice><DetailValue> {accounting.formatMoney(this.state.investment.price)}</DetailValue>
    </PricingDetailDiv>
    <PricingDetailDiv>
        <CurrentPrice>Purchase Price: </CurrentPrice><DetailValue> {accounting.formatMoney(this.state.investment.stockPurchasePrice)}</DetailValue>
    </PricingDetailDiv>
    <PricingDetailDiv>
        <CurrentPrice>Overall % Gain/Loss: </CurrentPrice><GainLossDetailValue> {percentagGainLoss.toFixed(1)}%</GainLossDetailValue>
    </PricingDetailDiv>
</PricingDetail>
{/* <Detail>
    <DetailKey>% Change Since Yesterday: </DetailKey><DetailValue> {this.state.investmentInfo.employees}</DetailValue>
</Detail> */}

</PriceDetail>

        )
    }
}

export default PriceDetail