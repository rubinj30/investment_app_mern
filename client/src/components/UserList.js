import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
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
        console.log(this.state)

        return (

            <FullPageBackground>
                <div>
                    <UserListTitle>Current Users:</UserListTitle>
                    {this.state.users.map((user,index) => (
                        <UserNameList key={index}>

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