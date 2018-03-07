import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import HeaderBar from './HeaderBar'

class UserList extends Component {
    
    state = {
        users: [],
        pageReady: false
    }

    componentWillMount = () => {
        this.getUsers()
    }

    getUsers = async () => {
        const response = await axios.get(`/api/users`)
        this.setState({ users: response.data, pageReady: true })
    }

    render() {

        return (
                
            <div>

                {/* header bar is using "user._id" but there is no one specific user */}
                {/* <HeaderContainerDiv>
                <HeaderBar
                        backLink={`/users`}
                    />
                </HeaderContainerDiv> */}
                <div>
                    {this.state.users.map(user => (
                        <div>

                            <Link key={user._id} to={`/users/${user._id}/`}>
                                {user.username}
                            </Link>

                        </div>
                    ))}

                </div>
            </div>
        )
    }
}
export default UserList



const HeaderContainerDiv = styled.div`
    display: flex;
    justify-content: center;
    background-color: #45b9f2;
    color: white;
    padding-bottom: 10px;
`