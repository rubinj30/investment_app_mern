import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import styled from 'styled-components'

class LineGraph extends Component {

    state = {
        chartTimeFrame: 'one-month'
    }

    toggleToDaily = () => {
        this.setState({ chartTimeFrame: 'one-month' })
    }

    toggleToThreeMonth = () => {
        this.setState({ chartTimeFrame: 'three-month'})
    }

    toggleToOneYear = () => {
        this.setState({ chartTimeFrame: 'one-year' })
    }

    toggleToThreeYear = () => {
        this.setState({ chartTimeFrame: 'three-year' })
    }


    render() {

        const dailyStockPrices = this.props.dailyStockPrices
        const dailyLineData = []
        for (var property1 in dailyStockPrices) {
            const ticker = parseInt(dailyStockPrices[property1]['4. close'])
            dailyLineData.push({ name: '', price: parseInt(dailyStockPrices[property1]['4. close']), amt: 100 })
        }

        const reversedOneMonthLineData = dailyLineData.slice(1, 22).reverse()
        const reversedThreeMonthLineData = dailyLineData.slice(1, 65).reverse()

        const monthlyStockPrices = this.props.monthlyStockPrices
        const monthlyLineData = []
        for (var property1 in monthlyStockPrices) {
            const ticker = parseInt(monthlyStockPrices[property1]['4. close'])
            monthlyLineData.push({ name: '', price: parseInt(monthlyStockPrices[property1]['4. close']), amt: 5 })
        }

        const reversedOneYearLineData = monthlyLineData.slice(1, 36).reverse()
        const reversedThreeYearLineData = monthlyLineData.slice(1, 36).reverse()

        if (this.state.chartTimeFrame === 'one-month') {
            return (
                < ChartSubContainer >
                    <TimeFrameLabel>Past Month</TimeFrameLabel>
                    <LineChart width={350} height={200} data={reversedOneMonthLineData}
                        margin={{ top: 5, right: 10, left: 3, bottom: 5 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line dot={false} type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                    <TimeFrameContainer>
                        <SelectedTimeFrame onClick={this.toggleToDaily}>1-Month</SelectedTimeFrame>
                        <UnselectedTimeFrame onClick={this.toggleToThreeMonth}>3-Month</UnselectedTimeFrame>
                        <UnselectedTimeFrame onClick={this.toggleToThreeYear}>3-Year</UnselectedTimeFrame>
                    </TimeFrameContainer>
                </ChartSubContainer>)

        } else if (this.state.chartTimeFrame === 'three-month') {
            return (
                <ChartSubContainer>
                    <TimeFrameLabel>Past Month</TimeFrameLabel>
                    <LineChart width={350} height={200} data={reversedThreeMonthLineData}
                        margin={{ top: 5, right: 10, left: 3, bottom: 5 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line dot={false} type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                    <TimeFrameContainer>
                        <UnselectedTimeFrame onClick={this.toggleToDaily}>1-Month</UnselectedTimeFrame>
                        <SelectedTimeFrame onClick={this.toggleToThreeMonth}>3-Months</SelectedTimeFrame>
                        <UnselectedTimeFrame onClick={this.toggleToThreeYear}>3-Years</UnselectedTimeFrame>
                    </TimeFrameContainer>
                </ChartSubContainer>
            )
        } else if (this.state.chartTimeFrame === 'three-year') {
            return (
                <ChartSubContainer>
                    <TimeFrameLabel>Past 3 Years</TimeFrameLabel>
                    <LineChart width={350} height={200} data={reversedThreeYearLineData}
                        margin={{ top: 5, right: 10, left: 3, bottom: 5 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line dot={false} type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                    <TimeFrameContainer>
                        <UnselectedTimeFrame onClick={this.toggleToHourly}>1-Day</UnselectedTimeFrame>
                        <UnselectedTimeFrame onClick={this.toggleToDaily}>1-Month</UnselectedTimeFrame>
                        <SelectedTimeFrame onClick={this.toggleToMonthly}>3-Year</SelectedTimeFrame>
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