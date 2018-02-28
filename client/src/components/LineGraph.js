import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import styled from 'styled-components'

class LineGraph extends Component {
    render() {
        const dailyStockPrices = this.props.dailyStockPrices
        const ticker = this.props.investment.ticker

        const lineData = []
        for (var property1 in dailyStockPrices) {
            // console.log(typeof(dailyStockPrices[property1]['4. close']))
            console.log({name: '', pv: parseInt(dailyStockPrices[property1]['4. close']), amt: 150})
            lineData.push({name: '', pv: parseInt(dailyStockPrices[property1]['4. close']), amt: 66666})
        }
        console.log(lineData)

        // const test = this.state.dailyStockPrices.map((stock, index) => {
        //     return {name: `date ${index}`, stock: 1000, pv: stock.open, amt: 2000}
        // })
        // console.log("TESTTESTETSETETSETES", test)

        // { name: '2000-01-14', AMZN: close },d
        { name: ''}
        // name is the date which is the object name, but how do i grab that while looping thru
        // { name: '2000-01-14, AMZN:, pv: 2400, amt: 2400 }
        const data = [
            { name: '', stock: 4000, pv: 2400, amt: 2400 },
            { name: '', stock: 3000, pv: 1398, amt: 2210 },
            { name: '', stock: 2000, pv: 9800, amt: 2290 },
            { name: '', stock: 2780, pv: 3908, amt: 2000 },
            { name: '', stock: 1890, pv: 4800, amt: 2181 },
            { name: '', stock: 2390, pv: 3800, amt: 2500 },
            { name: '', stock: 3490, pv: 4300, amt: 2100 }
        ];

        return (
            <LineChartContainer>
                <LineChart width={350} height={200} data={lineData}
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