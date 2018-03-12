import React, { Component } from 'react'
import moment from 'moment'
import axios from 'axios'
import styled from 'styled-components'
import { NewsItem, UserNewsItem, NewsTitle, NewsContainer, NewsSectionTitle, DateSpan, NewsSectionTitlePlacement } from './styled-components/News'

class UserNews extends Component {

    state = {
        articles: []
    }

    componentWillMount = () => {
        this.getFinancialNews()
    }

    getFinancialNews = async () => {
        try {
            const api_key = '5194b3242e02413a976154e8596866fb'
            const URL = `https://newsapi.org/v2/top-headlines?sources=bloomberg&apiKey=${api_key}`
            const response = await axios.get(URL)
            const articles = response.data.articles.map((article) => {
                return article
            })
            this.setState({ articles: articles })
        }
        catch (err) {
            console.log(err)
        }
    }

    render() {
        const user = this.state.user
        return (
            <div>
                <NewsSectionTitlePlacement>
                    <NewsSectionTitle>Today's Financial News</NewsSectionTitle>
                </NewsSectionTitlePlacement>
                <UserNewsList>


                    {
                        this.state.articles.map((article, index) => {
                            return <UserNewsItem key={index}>
                                <NewsImageHolder>
                                    <a target='_blank' href={article.url} >
                                        <NewsImage width="100" src={article.urlToImage} alt="" />
                                    </a>
                                </NewsImageHolder>
                                <div>
                                    <NewsTitle><a target='_blank' href={`${article.url}`}> {article.title}</a></NewsTitle>
                                    <div>{article.description.substring(0, 150)}...
                                    <a target='_blank' href={`${article.url}`}> see more</a>
                                        <DateSpan>  ({moment(article.publishedAt).format("MMM Do YY")})</DateSpan> </div>
                                </div>
                            </UserNewsItem>
                        })
                    }
                </UserNewsList>
            </div>
        );
    }
}

export default UserNews;

const UserNewsList = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

`

const NewsImageHolder = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* padding-right: 10px; */

`

const NewsImage = styled.img`
    width: 100%;
`

