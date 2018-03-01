import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

class StockNews extends Component {
    
    state = {
        showMore: false
    }
    
    render() {
        
        return (
            <div>
                {this.props.newsReady ? 

                    this.props.news.slice(1, 10).map((item, index) => {
                        return <NewsItem>
                        
                        <NewsTitle><Link to={`${item.url}`} key={index}>{item.title}</Link></NewsTitle>
                        <div>{item.summary}</div>
                        
                        </NewsItem>
                    })
                : 
                null
                }
            </div>
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
        color: 
    }

`