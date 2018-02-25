import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class HomePage extends Component {
    state = {
        users: []
    }

    componentWillMount = () => {
        this.getUsers()
    }

    getUsers = async () => {
        const response = await axios.get(`/api/users`)
        this.setState({users: response.data})
    }

    render() {
        return (
            <div>
                {/* <Link to= */}


            </div>
        )
    }
}

export default HomePage