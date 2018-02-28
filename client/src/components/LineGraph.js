import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import styled from 'styled-components'

class LineGraph extends Component {
    render() {
        const dailyStockPrices = this.props.dailyStockPrices
        const ticker = this.props.investment.ticker


        // { name: '2000-01-14', AMZN: close },

        const data = [
            { name: 'Page A', ticker: 4000, pv: 2400, amt: 2400 },
            { name: 'Page B', ticker: 3000, pv: 1398, amt: 2210 },
            { name: 'Page C', ticker: 2000, pv: 9800, amt: 2290 },
            { name: 'Page D', ticker: 2780, pv: 3908, amt: 2000 },
            { name: 'Page E', ticker: 1890, pv: 4800, amt: 2181 },
            { name: 'Page F', ticker: 2390, pv: 3800, amt: 2500 },
            { name: 'Page G', ticker: 3490, pv: 4300, amt: 2100 }
        ];

        return (
            <LineChartContainer>
                <LineChart width={350} height={200} data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="ticker" stroke="#82ca9d" />
                </LineChart>
            </LineChartContainer>
        );
    }
}

export default LineGraph

const LineChartContainer = styled.div`
    width:100%;
`