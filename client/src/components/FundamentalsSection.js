import React, { Component } from 'react';
import { DetailValue, SectionTitle, Detail, DetailKey } from './styled-components/Details'
import styled from 'styled-components'

const FundamentalsSection = (props) => {
    return (
        <Fundamentals>
            <FundamentalsDetails>
                <SectionTitle>Key Metrics</SectionTitle>
                <Detail>
                    <DetailKey>Market Cap:</DetailKey><DetailValue> {props.fundamentals.marketcap}</DetailValue>
                </Detail>
                <Detail>
                    <DetailKey>EBITDA:</DetailKey><DetailValue> {props.fundamentals.EBITDA}</DetailValue>
                </Detail>
                <Detail>
                    <DetailKey>52 Week High:</DetailKey><DetailValue> {props.fundamentals.week52high}</DetailValue>
                </Detail>
                <Detail>
                    <DetailKey>52 Week Low:</DetailKey><DetailValue> {props.fundamentals.week52low}</DetailValue>
                </Detail>
                <Detail>
                    <DetailKey>Price-to-book:</DetailKey><DetailValue> {props.fundamentals.priceToBook}</DetailValue>
                </Detail>
                <Detail>
                    <DetailKey>Price-to-sales:</DetailKey><DetailValue> {props.fundamentals.priceToSales}</DetailValue>
                </Detail>
            </FundamentalsDetails>
        </Fundamentals>
    );
}

export default FundamentalsSection;


const FundamentalsDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: space-between;
    width: 300px;
    border-radius: 5px;
    border: 1px solid black;
    /* background-color: rgba(0,0,0, .2); */
    padding: 10px;
`

const Fundamentals = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;
`