import styled from "styled-components";

export const BannerView=styled.div`
     @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&family=Noto+Sans:wght@400;600&display=swap');
    display: flex;
    padding: 1rem;
    position: relative;
    div{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding-left: 1rem;
        padding-right: 1rem;
        flex: 5;
    }
    border: 0.1px solid grey;
    border-radius: 2px;
    margin-bottom: 1rem;
    background-color: white;
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
    @media screen and (max-width: 600px){
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        div{
            padding-left: 0rem;
        padding-right: 0rem;
        }
    }
`