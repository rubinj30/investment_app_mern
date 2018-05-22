import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FaFolderOpenO } from 'react-icons/lib/fa'
import HeaderBar from './HeaderBar'
import styled from 'styled-components'
import axios from 'axios'
import UserNews from './UserNews'
import RecentTransactions from './RecentTransactions'

class UserProfile extends Component {
    state = {
        user: {},
        pageReady: false
    }

    componentWillMount = async () => {
        this.getUserInformation()
    }

    getUserInformation = async () => {
        const response = await axios.get(`/api/users/${this.props.match.params.id}/`)
        this.setState({
            user: response.data,
            pageReady: true
        })
    }

    render() {
        const user = this.state.user
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
                        <FolderContainer>


                            <FolderDiv><Link to={`/users/${user._id}/investments`}>
                                <FaFolderOpenO />
                                <FolderText>See Stocks Portfolio</FolderText>
                            </Link>
                            <ProfileDetail>
                                <div padding-right='10px'>Number of Stocks Owned:</div><div>{user.investments.length}</div>
                            </ProfileDetail>
                            </FolderDiv>

                            <TransactionsList>
                                <RecentTransactions
                                    user={this.state.user}
                                />
                            </TransactionsList>
                        </FolderContainer>
                        : null
                }
                <NewsHR width="80%" />
                <UserNews />
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
    position : fixed;
    z-index : 999;
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
    font-size: 14px;
    width: 200px;
`

const FolderDiv = styled.div`
    font-size: 90px;
    text-align: center;
    padding-bottom: 40px;
    a {
        text-decoration: none;
        color: black;
        &:hover {
            color: #45b9f2;
        }
    }
`

const FolderText = styled.div`
    font-size: 25px;
    color: #45b9f2;
    &:hover {
        color: #45b9f2;
        text-decoration: underline;
    }
`

const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    background-color: #45b9f2;
    color: white;
    padding-bottom: 10px;
`

const NewsHR = styled.hr`
    margin-bottom: 20px;
`

const TransactionsList = styled.div`
    display: flex;
    justify-content: center;
`

const FolderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
`