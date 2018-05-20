import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import styled from 'styled-components'

class LineGraph extends Component {

    state = {
        chartTimeFrame: 'one-year'
    }

    toggleToOneMonth = () => {
        this.setState({ chartTimeFrame: 'one-month' })
    }

    toggleToThreeMonth = () => {
        this.setState({ chartTimeFrame: 'three-month' })
    }

    toggleToOneYear = () => {
        this.setState({ chartTimeFrame: 'one-year' })
    }

    toggleToTwoYear = () => {
        this.setState({ chartTimeFrame: 'two-year' })
    }

    render() {
        const length = this.props.last2YearStockPrices.length
        const lastMonthStockPrices = this.props.last2YearStockPrices.slice(length - 22, length)
        const last3MonthStockPrices = this.props.last2YearStockPrices.slice(length - 65, length)
        const last1YearStockPrices = this.props.last2YearStockPrices.slice(length - 253, length)

        console.log("TEST ", this.props.yAxisDimensions.low);
        console.log("TEST ", this.props.yAxisDimensions.low);
        console.log("TEST ", this.props.yAxisDimensions.high);
        if (this.state.chartTimeFrame === 'one-month') {
            return (
                < ChartSubContainer >
                    <TimeFrameLabel>Past Month</TimeFrameLabel>
                    <LineChart width={350} height={200} data={lastMonthStockPrices}
                        margin={{ top: 5, right: 10, left: 1, bottom: 5 }}>
                        <XAxis dataKey="name" tick={{fontSize: 11}} interval={3} angle={-15} textAnchor="end" />
                        <YAxis tick={{fontSize: 11}} domain={['auto', 'auto']}/>
                        <CartesianGrid />
                        <Tooltip />
                        <Legend />
                        <Line dot={false} type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                    <TimeFrameContainer>
                        <SelectedTimeFrame onClick={this.toggleToOneMonth}>1-Month</SelectedTimeFrame>
                        <UnselectedTimeFrame onClick={this.toggleToThreeMonth}>3-Month</UnselectedTimeFrame>
                        <UnselectedTimeFrame onClick={this.toggleToOneYear}>1-Year</UnselectedTimeFrame>
                        <UnselectedTimeFrame onClick={this.toggleToTwoYear}>2-Year</UnselectedTimeFrame>
                    </TimeFrameContainer>
                </ChartSubContainer>)

        } else if (this.state.chartTimeFrame === 'three-month') {
            return (
                <ChartSubContainer>
                    <TimeFrameLabel>Past 3 Months</TimeFrameLabel>
                    <LineChart width={350} height={200} data={last3MonthStockPrices}
                        margin={{ top: 5, right: 10, left: 1, bottom: 5 }}>
                        <XAxis dataKey="name" tick={{fontSize: 11}} interval={11} angle={-15} textAnchor="end" />
                        <YAxis tick={{fontSize: 11}} domain={['auto', 'auto']}/>
                        <CartesianGrid />
                        <Tooltip />
                        <Legend />
                        <Line dot={false} type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                    <TimeFrameContainer>
                        <UnselectedTimeFrame onClick={this.toggleToOneMonth}>1-Month</UnselectedTimeFrame>
                        <SelectedTimeFrame onClick={this.toggleToThreeMonth}>3-Month</SelectedTimeFrame>
                        <UnselectedTimeFrame onClick={this.toggleToOneYear}>1-Year</UnselectedTimeFrame>
                        <UnselectedTimeFrame onClick={this.toggleToTwoYear}>2-Year</UnselectedTimeFrame>
                    </TimeFrameContainer>
                </ChartSubContainer>
            )
        } else if (this.state.chartTimeFrame === 'one-year') {
            return (
                <ChartSubContainer>
                    <TimeFrameLabel>Past Year</TimeFrameLabel>
                    <LineChart width={370} height={200} data={last1YearStockPrices}
                        margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <XAxis dataKey="name" tick={{fontSize: 11}} interval={45} angle={-15} textAnchor="end"/>
                        <YAxis tick={{fontSize: 11}} domain={['auto', 'auto']}/>
                        <CartesianGrid stroke={"rgb(190,190,190, 0.9)"}/>
                        <Tooltip />
                        <Legend />
                        <Line dot={false} type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                    <TimeFrameContainer>
                        <UnselectedTimeFrame onClick={this.toggleToOneMonth}>1-Month</UnselectedTimeFrame>
                        <UnselectedTimeFrame onClick={this.toggleToThreeMonth}>3-Month</UnselectedTimeFrame>
                        <SelectedTimeFrame onClick={this.toggleToOneYear}>1-Year</SelectedTimeFrame>
                        <UnselectedTimeFrame onClick={this.toggleToTwoYear}>2-Year</UnselectedTimeFrame>
                    </TimeFrameContainer>
                </ChartSubContainer>
            )
        } else if (this.state.chartTimeFrame === 'two-year') {
            return (
                <ChartSubContainer>
                    <TimeFrameLabel>Past 2 Years</TimeFrameLabel>
                    <LineChart width={350} height={200} data={this.props.last2YearStockPrices}
                        margin={{ top: 5, right: 10, left: 1, bottom: 5 }}>
                        <XAxis dataKey="name" tick={{fontSize: 11}} interval={90} angle={-15} textAnchor="end"/>
                        <YAxis tick={{fontSize: 11}} domain={['auto', 'auto']}/>
                        <CartesianGrid stroke={"	rgb(190,190,190, 0.9)"}/>
                        <Tooltip />
                        <Legend />
                        <Line dot={false} type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                    <TimeFrameContainer>
                        <UnselectedTimeFrame onClick={this.toggleToOneMonth}>1-Month</UnselectedTimeFrame>
                        <UnselectedTimeFrame onClick={this.toggleToThreeMonth}>3-Month</UnselectedTimeFrame>
                        <UnselectedTimeFrame onClick={this.toggleToOneYear}>1-Year</UnselectedTimeFrame>
                        <SelectedTimeFrame onClick={this.toggleToTwoYear}>2-Year</SelectedTimeFrame>
                    </TimeFrameContainer>
                </ChartSubContainer>
            )
        }
    }
}


export default LineGraph

const LineChartContainer = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SelectedTimeFrame = styled.div`
    border-radius: 5px;
    background-color : #947CB0;
    color: white;
    padding: 3px;
    width: 75px;
    margin: 3px;

`

const UnselectedTimeFrame = styled.div`
    /* border: 2px black solid; */
    color: #947CB0;
    border-radius: 5px;
    padding: 1px;
    width: 75px;
    margin: 3px;
    background-color: white;
    text-align: center;
`

const ChartSubContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    
`
const TimeFrameContainer = styled.div`
    display: flex;
`
const TimeFrameLabel = styled.div`
    font-size: 20px;
`