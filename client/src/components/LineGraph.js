import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import styled from 'styled-components'
// import StyledButton from './styled-components/StyledButton'

class LineGraph extends Component {

    state = {
        dailyChartTimeFrame: true
    }

    toggleChartTimeFrame = () => {
        this.setState({dailyChartTimeFrame: !this.state.dailyChartTimeFrame})
    }

    render() {
        const investmentName = this.props.investmentName
        // const ticker = this.props.investment.ticker


        const dailyStockPrices = this.props.dailyStockPrices

        const lineData = []
        for (var property1 in dailyStockPrices) {
            const ticker = parseInt(dailyStockPrices[property1]['4. close'])
            lineData.push({name: '', price: parseInt(dailyStockPrices[property1]['4. close']), amt: 100})
        }

        const reversedLineData = lineData.slice(1, 30).reverse()

        const monthlyStockPrices = this.props.monthlyStockPrices
        const monthlyLineData = []
        for (var property1 in monthlyStockPrices){
            const ticker = parseInt(monthlyStockPrices[property1]['4. close'])
            monthlyLineData.push({name: '', price: parseInt(monthlyStockPrices[property1]['4. close']), amt: 5})
        }

        const reversedMonthlyData = monthlyLineData.slice(1, 36).reverse()

        return (
            <LineChartContainer>
                { this.state.dailyChartTimeFrame ? 
                <ChartSubContainer>
                    <TimeFrameLabel>Past Month</TimeFrameLabel>
                    <LineChart width={360} height={200} data={reversedLineData}
                        margin={{ top: 5, right: 10, left: 3, bottom: 5 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line dot={false} type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                    <TimeFrameContainer>
                        <SelectedTimeFrame onClick={this.toggleChartTimeFrame}>1-Month</SelectedTimeFrame>
                        <UnselectedTimeFrame onClick={this.toggleChartTimeFrame}>3-Year</UnselectedTimeFrame>
                    </TimeFrameContainer>
                </ChartSubContainer>
                : 
                <ChartSubContainer>
                    <TimeFrameLabel>Past 3 Years</TimeFrameLabel>
                    <LineChart width={360} height={200} data={reversedMonthlyData}
                        margin={{ top: 5, right: 10, left: 3, bottom: 5 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line dot={false} type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                    <TimeFrameContainer>
                        <UnselectedTimeFrame onClick={this.toggleChartTimeFrame}>1-Month</UnselectedTimeFrame>
                        <SelectedTimeFrame onClick={this.toggleChartTimeFrame}>3-Year</SelectedTimeFrame>
                    </TimeFrameContainer>
                </ChartSubContainer>
                } 

            </LineChartContainer>
        );
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