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

export default { NewsItem, NewsTitle, NewsContainer, NewsSectionTitle }