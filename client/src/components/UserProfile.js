import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FaFolderOpenO } from 'react-icons/lib/fa'
import HeaderBar from './HeaderBar'
import styled from 'styled-components'
import axios from 'axios'


class UserProfile extends Component {
    state = {
        user: {},
        pageReady: false,
        articles: []
    }

    componentWillMount = async () => {
        this.getUserInformation()
        this.getFinancialNews()
    }

    getUserInformation = async () => {
        const response = await axios.get(`/api/users/${this.props.match.params.id}/`)
        console.log(response.data.user)
        this.setState({
            user: response.data,
            pageReady: true
        })
    }

    getFinancialNews = async () => {
        try {
            const URL = 'https://newsapi.org/v2/top-headlines?sources=the-economist&apiKey=5194b3242e02413a976154e8596866fb'
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
        const articleList = this.state.articles.map((article, index) => {
            return <div key={index}>
                <div color="red">{article.title}</div>
                <div>{article.description}</div>
                <a href={article.url} target='_blank'>
                    <img width="100" src={article.urlToImage} alt="" />
                </a>

            </div>
        })
        return (
            <div>

                <UserHeaderWrapper>
                    <HeaderBar
                        user={this.state.user}
                        backLink={`/users`}
                    // userProfileLink={`/users/${user._id}`}
                    />
                </UserHeaderWrapper>
                {
                    this.state.pageReady ?
                        <div>
                            <DetailsContainer>

                                <ProfileDetail>
                                    <div>Username: </div><div>{user.username}</div>
                                </ProfileDetail>
                                <ProfileDetail>
                                    <div>E-mail: </div><div>{user.email}</div>
                                </ProfileDetail>
                                <ProfileDetail>
                                    <div># Stocks Owned:</div><div>{user.investments.length}</div>
                                </ProfileDetail>


                            </DetailsContainer>

                            <FolderDiv><Link to={`/users/${user._id}/investments`}>
                                <FaFolderOpenO />
                                <FolderText>Go to Stock Portfolio</FolderText>

                            </Link>
                            </FolderDiv>
                        </div>
                        : null
                }
                {articleList}

            </div>
        )
    }
}

export default UserProfile

const UserHeaderWrapper = styled.div`
    background-color: #45b9f2;
    display: flex;
    justify-content: center;
    color: white;
    padding-bottom: 10px;
`
const DetailsContainer = styled.div`
    width: 300px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid black;
    margin: 0 auto;
    margin-top: 30px;
    font-size: 20px;
`

const ProfileDetail = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    padding-bottom: 5px;

`

const FolderDiv = styled.div`
    font-size: 75px;
    text-align: center;
    
    a {
        text-decoration: none;
        color: black;
    }
`

const FolderText = styled.div`
    font-size: 20px;
`

const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    background-color: #45b9f2;
    color: white;
    padding-bottom: 10px;
`