import styled from "styled-components";

export const SellerViewContainer=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&family=Noto+Sans:wght@400;500&display=swap');
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border-radius: 2px;
    border: 0.1px solid grey;
    margin-bottom: 1rem;
    background-color: white;
    position: relative;
    p{
        font-size: 0.8em;
        margin-bottom: 1rem;
        font-family: 'Noto Sans',sans-serif;
        color: black;
        font-weight: 400; 
        span{
            font-weight: 600;
            font-family: 'Inter',sans-serif;
        }
    }

`

export const SellerHeading=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&family=Noto+Sans:wght@400;500&display=swap');
display: flex;
justify-content: space-between;
margin-bottom: 1rem;
h1{
        font-size: 1em;
        flex: 4;
        font-family: 'Inter',sans-serif;
        color: black;
        font-weight: 600;
    }
`