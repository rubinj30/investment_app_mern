import React, { Component } from 'react'
import { NewsTitle, NewsContainer, NewsSectionTitle, UserNewsItem, DateSpan, NewsSectionTitlePlacement} from './styled-components/News'
import styled from 'styled-components'
import moment from 'moment'
var Spinner = require('react-spinkit');


class StockNews extends Component {

    state = {
        showMore: false
    }

    render() {
        console.log(this.props.news);

        return (
            <div>
                <NewsSectionTitlePlacement>
                    <NewsSectionTitle>News Related to {this.props.investmentName}</NewsSectionTitle>
                </NewsSectionTitlePlacement>
                <NewsContainer>
                    {this.props.newsReady ?
                        this.props.news.map((item, index) => {
                            return <UserNewsItem key={index}>
                                <NewsTitle><a target='_blank' href={`${item.url}`} key={index}>{item.headline}</a></NewsTitle>
                                <div>{item.summary.substring(0, 150)} <a href={`${item.url}`} key={index}>See more...</a><DateSpan>  ({moment(item.datetime).format("MMM Do YY")})</DateSpan></div>
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
