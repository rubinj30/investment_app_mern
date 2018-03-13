import React, { Component } from 'react';
import FullPageBackground from './styled-components/FullPageBackground'
import styled from 'styled-components'
import HeaderBar from './HeaderBar'
import StyledButton from './styled-components/StyledButton'
import {Link} from 'react-router-dom'
// import { FaLineChart } from 'react-icons/lib/fa'
// import NameAndBackDiv from './styled-components/NameAndBackDiv'



class LogIn extends Component {

    login = () => {
        this.props.auth.login()
    }

    render() {
        return (
            <div>

                <FullPageBackground>

                    <StyledButton onClick={this.login}>Click Here to LogIn</StyledButton>
                    <Instructions>
                        <div>You can login with Facebook, sign-up a new user, or skip the login and just checkout the app!</div>

                        <div>(The users are pre-loaded, I was just testing Authentication)</div>    
                    </Instructions>
                    <Link to={`/users/`}><StyledButton>Skip the Login</StyledButton></Link>
                </FullPageBackground>
            </div>
        );
    }
}

export default LogIn;

const LogInInput = styled.input`
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    font-size: 16px;
`

const LogInTitle = styled.div`
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #45b9f2;
    color: white;
    text-align: center;
`

const LogInText = styled.div`
    padding-right: 6px;
`

const TitleDiv = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px;

`

const Instructions = styled.div`
    margin: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

