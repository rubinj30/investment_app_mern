import React, { Component } from 'react'
import styled from 'styled-components'
var Spinner = require('react-spinkit');

class WaitingPage extends Component {

    render() {

        const randomQuotes = [
            {
                quote: "Buy low, sell high",
                quoteBy: "Richie Rich",
                quotePic: ""
            },
            {
                quote: "Money for nothing and the chicks for free",
                quoteBy: "Dire Straits",
                quotePic: ""
            },
            {
                quote: "This app is the reason I'm rich",
                quoteBy: "Warren Buffet",
                quotePic: ""
            },
            {
                quote: "It's all about the benjamins, baby",
                quoteBy: "Puff Daddy",
                quotePic: ""
            },
            // {
            //     quote: "Time to get the data",
            //     quotePic: "http://images.mentalfloss.com/sites/default/files/styles/mf_image_16x9/public/make_the_donuts.jpg"
            // },

            // {
            //     quote: "We's are going to get the datas",
            //     quotePic: "https://vignette.wikia.nocookie.net/lotr/images/e/e1/Gollum_Render.png"
            // },
            {
                quote: "Hold, please. Calculating...",
                quotePic: "https://media3.giphy.com/media/3otO6OG1ki9305kZWg/giphy.gif"
            },
            {
                quote: "Hold, please. Calculating...",
                quotePic: "https://media3.giphy.com/media/3otO6OG1ki9305kZWg/giphy.gif"
            }
        ]

        const randomNumber = Math.floor(Math.random() * Math.floor(randomQuotes.length))

        return (
            <WaitingContainer>
                <Spinner name="line-scale" />
                <QuoteHolder>"{randomQuotes[randomNumber].quote}"</QuoteHolder>

                    {randomQuotes[randomNumber].quotePic.length > 0 ? 
                    <div>
                        <img width="200" src={randomQuotes[randomNumber].quotePic} alt="pic" />

                    </div>
                    :
                    <QuoteBy>
                    - {randomQuotes[randomNumber].quoteBy}
                    </QuoteBy>
                    }
                    
            </WaitingContainer>
        );
    }

}

export default WaitingPage;

const QuoteBy = styled.div`
    display:flex;
    justify-content: center;
    color: white;
`

const QuoteHolder = styled.div`
    color: white;
    padding: 20px;
`

const WaitingContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #45b9f2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`