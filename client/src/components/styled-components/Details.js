import styled from 'styled-components'

export const StockDetails = styled.div`
    width: 300px;
    margin: 30px 0;
    padding: 40px;
    /* background-color: #947CB0; */
    border: 1px solid black;
    border-radius: 5px;
    padding: 8px;
    @media (min-width:700px) {
        margin: 0px;
    }
`

export const DetailKey = styled.div`
    color: #666666;
`

export const DetailValue = styled.div`
    text-align: right;
`

export const Website = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
`

export const SectionTitle = styled.div`
    font-size: 20px;
    padding-bottom: 10px;
`

export const Detail = styled.div`
    display:flex;
    justify-content: space-between;
`

export const BuyInput = styled.input`
    border: 1px white solid;
    border-bottom: 2px solid black;
    width: 80px;
    height: 20px;
    font-size: 18px;
`

export const InputTitle = styled.div`
    margin-top: 15px;
    color: #666666;
`

export default { StockDetails, SectionTitle, Detail, Website, DetailValue, DetailKey}