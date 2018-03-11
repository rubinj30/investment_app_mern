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
    display:flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 40px;
`

export const NewsSectionTitle = styled.div`
    max-width: 300px;
    font-size: 25px;
    padding-bottom: 20px;
    text-align: center;
    text-transform: uppercase;
`

export const DateSpan = styled.span`
    color: grey;
`

export const UserNewsItem = styled.div`
    width: 75vw;
    padding: 10px;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    -webkit-box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.75);
box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.75);
border-radius: 5px;
`

export default { NewsItem, NewsTitle, NewsContainer, NewsSectionTitle, DateSpan, UserNewsItem}