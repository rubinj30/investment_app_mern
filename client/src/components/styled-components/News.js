import styled from 'styled-components'

export const NewsItem = styled.div`
    width: 75vw;
    padding: 10px;
`

export const NewsTitle = styled.div`
    padding: 5px;

    a {
        text-decoration: none;
        color: #238dce;
    }
`

export const NewsContainer = styled.div`
    padding-top: 30px;
    padding-bottom: 40px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`

export const NewsSectionTitle = styled.div`
    max-width: 350px;
    font-size: 25px;
    /* padding-bottom: 20px; */
    text-align: center;
    text-transform: uppercase;
`

export const DateSpan = styled.span`
    color: grey;
`

export const UserNewsItem = styled.div`
    /* width: 75vw; */
    padding: 15px;
    margin: 15px 25px;
    display: flex;
    max-width: 350px;
    height: 100%;
    flex-direction: column;
    align-items: center;
    -webkit-box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.75);
    border-radius: 5px;
    @media (min-width: 400) {
        margin: 25px 30px;
    }
`

export const NewsSectionTitlePlacement = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 35px;
`

export default { NewsItem, NewsTitle, NewsContainer, NewsSectionTitle, DateSpan, UserNewsItem, NewsSectionTitlePlacement}