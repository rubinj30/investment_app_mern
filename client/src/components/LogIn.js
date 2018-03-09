import React, { Component } from 'react';
import FullPageBackground from './styled-components/FullPageBackground'
import styled from 'styled-components'
import HeaderBar from './HeaderBar'
import StyledButton from './styled-components/StyledButton'
import { FaLineChart } from 'react-icons/lib/fa'
import NameAndBackDiv from './styled-components/NameAndBackDiv'

class LogIn extends Component {
    render() {
        return (
            <div>
                <NameAndBackDiv>
                    <TitleDiv>

                        <LogInTitle><LogInText>StockUp</LogInText><FaLineChart /></LogInTitle>
                    </TitleDiv>
                </NameAndBackDiv>

                <FullPageBackground>

                    <div>E-mail</div>
                    <LogInInput type="text" />
                    <div>Password</div>
                    <LogInInput type="text" />
                    <StyledButton>LogIn</StyledButton>
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

