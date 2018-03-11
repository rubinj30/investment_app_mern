import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { NewsItem, NewsTitle, NewsContainer, NewsSectionTitle, UserNewsItem, DateSpan, NewsSectionTitlePlacement} from './styled-components/News'
import styled from 'styled-components'
import moment from 'moment'
var Spinner = require('react-spinkit');


class StockNews extends Component {

    state = {
        showMore: false
    }

    render() {

        return (
            <div>
                <NewsSectionTitlePlacement>
                    <NewsSectionTitle>News Related to {this.props.investmentName}</NewsSectionTitle>
                </NewsSectionTitlePlacement>
                <NewsContainer>
                    {this.props.newsReady ?
                        this.props.news.slice(1, 10).map((item, index) => {
                            return <UserNewsItem key={index}>
                                <NewsTitle><a target='_blank' href={`${item.url}`} key={index}>{item.title}</a></NewsTitle>
                                <div>{item.summary} <Link to={`${item.url}`} key={index}>See more...</Link><DateSpan>  ({moment(item.publication_date).format("MMM Do YY")})</DateSpan></div>
                            </UserNewsItem>
                        })
                        :
                        <Spinner name="line-scale" />
                    }
                </NewsContainer>
            </div>
        );
    }
}

export default StockNews;

const SpinnerContainer = styled.div`
    display: flex;
`
