import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import styled from 'styled-components'
import StyledButton from './styled-components/StyledButton'

class LineGraph extends Component {

    state = {
        dailyChartTimeFrame: true
    }

    toggleChartTimeFrame = () => {
        this.setState({dailyChartTimeFrame: !this.state.dailyChartTimeFrame})
    }

    render() {
        const investmentName = this.props.investmentName
        const ticker = this.props.investment.ticker


        const dailyStockPrices = this.props.dailyStockPrices

        const lineData = []
        for (var property1 in dailyStockPrices) {
            const ticker = parseInt(dailyStockPrices[property1]['4. close'])
            lineData.push({name: '', stock: parseInt(dailyStockPrices[property1]['4. close']), amt: 100})
        }

        const reversedLineData = lineData.slice(1, 30).reverse()

        const monthlyStockPrices = this.props.monthlyStockPrices
        const monthlyLineData = []
        for (var property1 in monthlyStockPrices){
            const ticker = parseInt(monthlyStockPrices[property1]['4. close'])
            monthlyLineData.push({name: '', stock: parseInt(monthlyStockPrices[property1]['4. close']), amt: 5})
        }

        const reversedMonthlyData = monthlyLineData.slice(1, 52).reverse()

        return (
            <LineChartContainer>
                <div>{investmentName} ({ticker})</div>
                { this.state.dailyChartTimeFrame ? 
                <ChartSubContainer>
                    <div>1 Month</div>
                    <LineChart width={300} height={200} data={reversedLineData}
                        margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line dot={false} type="monotone" dataKey="stock" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                    <div>
                        <UnselectedTimeFrame onClick={this.toggleChartTimeFrame}>1-Year</UnselectedTimeFrame>
                        <SelectedTimeFrame onClick={this.toggleChartTimeFrame}>1-Month</SelectedTimeFrame>
                    </div>
                </ChartSubContainer>
                : 
                <ChartSubContainer>
                    <div>Monthly Performance</div>
                    <LineChart width={300} height={200} data={reversedMonthlyData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line dot={false} type="monotone" dataKey="stock" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                    <div>
                        <SelectedTimeFrame onClick={this.toggleChartTimeFrame}>1-Year</SelectedTimeFrame>
                        <UnselectedTimeFrame onClick={this.toggleChartTimeFrame}>1-Month</UnselectedTimeFrame>
                    </div>
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

const SelectedTimeFrame = styled.button`
    border-radius: 5px;
    background-color : #947CB0;
    border: 2px black solid;
    color: white;
    padding: 3px;
    width: 100px;
    margin: 3px;

`

const UnselectedTimeFrame = styled.button`
    border: 2px black solid;
    color: #947CB0;
    border-radius: 5px;
    padding: 1px;
    width: 100px;
    margin: 3px;
`

const ChartSubContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`