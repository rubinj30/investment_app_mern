import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class HomePage extends Component {
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
                

                {this.state.users.map(user => (
                    <div>

                        <Link key={user._id} to={`/users/${user._id}/`}>
                            {user.username}
                        </Link>

                    </div>
                ))}
                
            </div>
        )
    }
}

export default HomePage