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
        if (this.state.articles) {
            console.log("testing", this.state.articles[0]);
        }
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
                                        {/* API deprecated but looks like they have a new one with image, headline, and maybe more? */}
                                        <NewsImage width="100" src={article.urlToImage} alt="" />
                                    </a>
                                </NewsImageHolder>
                                <div>
                                    <NewsTitle><a target='_blank' href={`${article.url}`}> {article.title}</a></NewsTitle>
                                    <a target='_blank' href={`${article.url}`}>Go to article</a>
                                        <DateSpan>  ({moment(article.publishedAt).format("MMM Do YY")})</DateSpan> </div>
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

