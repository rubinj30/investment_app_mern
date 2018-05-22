import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaArrowCircleLeft, FaLineChart, FaArrowLeft, FaUser } from 'react-icons/lib/fa'
import NameAndBackDiv from './styled-components/NameAndBackDiv'

class HeaderBar extends Component {

    render() {

        return (
            <Header>
                <UserDiv>
                    <Link to={`/users/${this.props.user._id}`}>
                        <Holder>
                            <Username>{this.props.user.username}</Username>
                            <UserIconSize><FaUser /></UserIconSize>
                        </Holder>
                    </Link>
                </UserDiv>
                <NameAndBackDiv>
                    <ArrowSize><Link to={`${this.props.backLink}`}><FaArrowLeft /></Link></ArrowSize>
                    <Link to={`/users`}><AppTitle><AppText>StockUp</AppText><FaLineChart /></AppTitle></Link>
                    <Blank>
                    <Link to={`/users/${this.props.user._id}`}>
                            <UserIconSizeMobile><FaUser /></UserIconSizeMobile>
                    </Link>
                    </Blank>
                </NameAndBackDiv>
            </Header>
        )
    }
}

export default HeaderBar

const UserDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100vw;
    a {
        text-decoration: none;
        color: white;
    }

        @media(max-width: 415px) {
        font-size: 0px;
    }

`
const Username = styled.div`
    padding-top:7px;
    display: flex;
    align-items: center;
`

const Holder = styled.div`
    display: flex;
    align-items: center;
`


const IconSize = styled.div`
    width: 20px;
    @media(max-width: 415px) {
        width: 0px;
    }
`


const ArrowSize = styled.div`
    font-size: 35px;
    display:flex;
    padding-bottom: 15px;
    align-self: flex-start;
    @media(max-width: 415px) {
        font-size: 20px;
        padding-bottom: 7px;
    }
`


const UserIconSize = styled.div`
    font-size: 20px;
    color: white;
    padding: 0 10px;
    @media(max-width: 415px) {
        font-size: 0px;
    }
`

const UserIconSizeMobile = styled.div`
    font-size: 0px;
    width: 10px;
    @media(max-width: 415px) {
        font-size: 18px;
        color: white;
    }
`

const AppTitle = styled.div`
    font-size: 30px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    @media(max-width: 415px) {
        font-size: 20px;
    }
`

const Header = styled.div`
`

const AppText = styled.div`
    padding-right: 6px;
`

const Blank = styled.div`
    width: 35px;
`