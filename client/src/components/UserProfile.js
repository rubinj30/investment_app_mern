import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FaFolderOpenO } from 'react-icons/lib/fa'
import HeaderBar from './HeaderBar'
import styled from 'styled-components'


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
        console.log(response.data.user)
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
                        backLink={`/users/${this.state.user._id}/investments`}
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

            </div>
        )
    }
}

export default UserProfile


const UserHeaderWrapper = styled.div`
    background-color: #45b9f2;
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
    font-size: 20px;r
`