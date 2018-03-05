import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
var Spinner = require('react-spinkit');

class StockNews extends Component {

    state = {
        showMore: false
    }

    render() {

        return (
            <NewsContainer>
                <NewsSectionTitle>News Related to {this.props.investmentName}</NewsSectionTitle>

                {this.props.newsReady ?

                    this.props.news.slice(1, 10).map((item, index) => {
                        return <NewsItem key={index}>

                            <NewsTitle><Link to={`${item.url}`} key={index}>{item.title}</Link></NewsTitle>
                            <div>{item.summary} <Link to={`${item.url}`} key={index}>See more...</Link></div>
                        </NewsItem>
                    })
                    :
                        <Spinner name="line-scale" />

                }
            </NewsContainer>
        );
    }
}

export default StockNews;


const NewsItem = styled.div`
    width: 75vw;
    padding: 10px;
`

const NewsTitle = styled.div`
    padding: 5px;
    a {
        text-decoration: none;
        color: #238dce;
    }
`

const NewsContainer = styled.div`
    padding-top: 30px;
    display:flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 40px;
`

const NewsSectionTitle = styled.div`
    max-width: 300px;
    font-size: 20px;
    padding-bottom: 20px;
    text-align: center;
`

const SpinnerContainer = styled.div`
    display: flex;
`