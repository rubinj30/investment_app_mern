import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'

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
                            <div>
                                Username: {user.username}
                            </div>
                            <div>
                                E-mail: {user.email}
                            </div>
                            <div>
                                # of Stocks Owned: {user.investments.length}
                            </div>
                        </div>
                        : null
                }

            </div>
        )
    }
}

export default UserProfile