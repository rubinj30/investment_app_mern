import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
import styled from 'styled-components'
import { NewsItem, UserNewsItem, NewsTitle, NewsContainer, NewsSectionTitle, DateSpan } from './styled-components/News'

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
            const URL = `https://newsapi.org/v2/top-headlines?sources=the-economist&apiKey=${api_key}`
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
                <NewsSectionTitle>IN THE NEWS...</NewsSectionTitle>
                <UserNewsList>


                    {
                        this.state.articles.map((article, index) => {
                            return <UserNewsItem key={index}>
                                <NewsImageHolder>
                                    <a href={article.url} target='_blank'>
                                        <NewsImage width="100" src={article.urlToImage} alt="" />
                                    </a>
                                </NewsImageHolder>
                                <div>
                                    <NewsTitle><Link to={`${article.url}`}> {article.title}</Link></NewsTitle>
                                    <div>{article.description} <DateSpan>  ({moment(article.publishedAt).format("MMM Do YY")})</DateSpan> </div>
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
    flex-direction: column;
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