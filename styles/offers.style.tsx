import styled from "styled-components";

export const OfferViewContainer=styled.div`
     @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&family=Noto+Sans:wght@400;600&display=swap');
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 1rem;
    /* margin-bottom: 1rem; */
    border: 0.1px solid grey;
    border-radius: 2px;
    position: relative;
    background-color: white;
    height: fit-content;
    div{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding-left: 1rem;
        padding-right: 1rem;
        flex: 5;
    }
    h1{
        color: black;
        font-size: 1em;
        font-family: 'Inter',sans-serif;
        font-weight: 600;
        margin-bottom: 0.5rem;
      
    }
    p{
        color: black;
        font-size: 0.8em;
        font-family: 'Noto Sans',sans-serif;
        font-weight: 400;
        margin-bottom: 0.5rem;
        span{
            font-weight: 600;
        }
    }
`

export const OfferListView=styled.div`
    border: 0.1px solid grey;
    border-radius: 2px;
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 1rem;
    row-gap: 1rem;
    justify-content: flex-start;
    flex: 4;
    background-color: rgb(240,242,246);
    padding: 1rem;
    @media screen and (max-width: 1200px){
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
    }
`