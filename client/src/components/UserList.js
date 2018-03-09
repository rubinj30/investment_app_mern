import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import HeaderBar from './HeaderBar'
import FullPageBackground from './styled-components/FullPageBackground'

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

            <FullPageBackground>

                {/* header bar is using "user._id" but there is no one specific user */}
                {/* <HeaderContainerDiv>
                <HeaderBar
                        backLink={`/users`}
                    />
                </HeaderContainerDiv> */}
                <div>
                    <UserListTitle>Current Users:</UserListTitle>
                    {this.state.users.map(user => (
                        <UserNameList>

                            <Link key={user._id} to={`/users/${user._id}/`}>
                                {user.username}
                            </Link>

                        </UserNameList>
                    ))}

                </div>
            </FullPageBackground>
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

// const FullBackground = styled.div`
//     background-color: #45b9f2;
//     color: white;
//     height: 100vh; 
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     text-decoration: none;
// `

const UserNameList = styled.div`
    padding: 10px;
    font-size: 20px;
    a {
        color: white;
        text-decoration: underline;
    }
`

const UserListTitle = styled.div`
    color: white;
    font-size: 25px;
    padding: 10px;
`