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
                {
                    this.state.pageReady ?
                        <div>
                            <UserHeaderWrapper>
                                <HeaderBar
                                    user={this.state.user}
                                    backLink={`/users/${this.state.user._id}/investments`}
                                />
                            </UserHeaderWrapper>
                            <div>
                                Username: {user.username}
                            </div>
                            <div>
                                E-mail: {user.email}
                            </div>
                            <div>
                                # of Stocks Owned: {user.investments.length}
                            </div>
                            <Link to={`/users/${user._id}/investments`}>
                                Go to Investment Porftolio <FaFolderOpenO />
                            </Link>
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
