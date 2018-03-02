import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/lib/fa'
import styled from 'styled-components'
import { FaArrowCircleLeft, FaLineChart } from 'react-icons/lib/fa'

class UserIcon extends Component {
    render() {
        return (

            <Header>
                <UserDiv>
                    <ArrowSize><Link to={`${this.props.backLink}`}><FaArrowCircleLeft /></Link></ArrowSize>

                    <Link to={`/users/${this.props.user._id}`}>
                        <Holder>
                            <Username>{this.props.user.username}</Username>
                            <UserIconSize><FaUser /></UserIconSize>
                        </Holder>
                    </Link>
                </UserDiv>
                <AppTitle><AppText>StockUp</AppText><FaLineChart /></AppTitle>
            </Header>
        );
    }
}

export default UserIcon

const UserDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80vw;
    
    a {
        text-decoration: none;
        color: white;
    }
`
const Username = styled.div`
    text-decoration: none;
    padding: 10px;
    display: flex;
    align-items: center;
`

const Holder = styled.div`
    display: flex;
    align-items: center;
`

const IconSize = styled.div`
    width: 20px;
`

const ArrowSize = styled.div`
    font-size: 30px;
`

const UserIconSize = styled.div`
    font-size: 20px;
    color: white;
`

const AppTitle = styled.div`
    color: white;
    font-size: 30px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Header = styled.div`
    
`

const AppText = styled.div`
    padding-right: 6px;
`

