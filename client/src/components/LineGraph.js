import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import styled from 'styled-components'

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

        const monthlyStockPrices = this.props.monthlyStockPrices
        const monthlyLineData = []
        for (var property1 in monthlyStockPrices){
            const ticker = parseInt(monthlyStockPrices[property1]['4. close'])
            monthlyLineData.push({name: '', stock: parseInt(monthlyStockPrices[property1]['4. close']), amt: 100})
        }

        console.log(monthlyLineData)

        return (
            <LineChartContainer>
                <div>{investmentName} ({ticker})</div>
                { this.state.dailyChartTimeFrame ? 
                <div>
                    <div>Daily Performance for Last 100 Days</div>
                    <LineChart width={300} height={200} data={lineData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="stock" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </div>
                : 
                <div>
                    <div>Monthly Performance</div>
                    <LineChart width={300} height={200} data={monthlyLineData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="stock" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </div>
                } 
                <button onClick={this.toggleChartTimeFrame}>Switch Timeframe</button>
            </LineChartContainer>
        );
    }
}

export default LineGraph

const LineChartContainer = styled.div`
    width:100%;
`