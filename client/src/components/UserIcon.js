import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/lib/fa'
import styled from 'styled-components'

class UserIcon extends Component {
    render() {
        return (
            <div>
                <UserDiv>
                    <Link to={`/users/${this.props.user._id}`}>
                        <Holder>
                            <Username>{this.props.user.username}</Username>
                            <FaUser />
                        </Holder>
                    </Link>
                </UserDiv>
            </div>
        );
    }
}

export default UserIcon

const UserDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 10px 25px;
    a {
        text-decoration: none;
    }
`
const Username = styled.div`
    padding-right: 10px;
    text-decoration: none;
`

const Holder = styled.div`
    display: flex;
    align-items: center;
`