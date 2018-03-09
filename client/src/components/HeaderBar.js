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
                    <AppTitle><AppText>StockUp</AppText><FaLineChart /></AppTitle>
                    <Blank></Blank>
                </NameAndBackDiv>
            </Header>
        )
    }
}

export default HeaderBar

const UserDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 90vw;
    
    a {
        text-decoration: none;
        color: white;
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
`

const ArrowSize = styled.div`
    font-size: 35px;
    display:flex;
    /* flex-direction: column;
    justify-content: center; */
    padding-bottom: 15px;
    align-self: flex-start;
`

const UserIconSize = styled.div`
    font-size: 20px;
    color: white;
`


const AppTitle = styled.div`
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

// const NameAndBackDiv = styled.div`
//     display:flex;
//     align-items: center;
//     justify-content: space-between;
//     text-decoration: none;
//     color: white;
//     a {
//         text-decoration: none;
//         color: white;
//     }
    
// `

const Blank = styled.div`
    width: 35px;
`