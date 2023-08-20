import styled from "styled-components";

export const CategoryView=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Sans:wght@400;600&display=swap');
    padding: 1rem;
    position: relative;
    border: 0.1px solid grey;
    border-radius: 2px;
    background-color: white;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1rem;
    h1{
        font-family: 'Noto Sans',sans-serif;
        font-size: 1em;
        color: black;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
    p{
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.8em;
        color: black;
        font-weight: 400;
        span{
            font-weight: 600;
        }
        margin-bottom: 0.5rem;
    }
    div{
        padding-left: 1rem;
        padding-right: 1rem;
        flex: 5;
    }
`

export const CategoryFilterContainer=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Sans:wght@400;600&display=swap');
    border: 0.1px solid grey;
    border-radius: 2px;
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: white;
    padding-bottom: 0.5rem;
    div{
        display: flex;
        max-width: 400px;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        align-items: baseline;
    }
    h1{
        font-family: 'Inter',sans-serif;
        font-size: 1.25em;
        color: black;
        font-weight: 600;
    }
    h2{
        font-family: 'Inter',sans-serif;
        font-size: 0.8em;
        color: black;
        font-weight: 400;
        margin-bottom: 0.5rem;  
    }
    label{
        font-family: 'Inter',sans-serif;
        font-size: 0.8em;
        color: black;
        font-weight: 500;
    }
    input[type=checkbox]
    {
        appearance: none; /* Hide default appearance */
        -webkit-appearance: none;
        -moz-appearance: none;
        width: 14px;
        height: 14px;
        accent-color: white;
        background-color: white;
        border: 1px solid black;
    }
    input[type=checkbox]:checked
    {
        border: 1px solid black;
        background-color: #2A73F1;
    }
    input[type=checkbox]:disabled
    {
        border: 1px solid black;
        background-color: #EBEBE4;
    }
    select
    {
        max-width: 150px;
        background-color: white;
        color: black;
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.8em;
        font-weight: 400;
        border-radius: 2px;
    }
    select:disabled
    {
        background-color: #EBEBE4;
    }
    @media screen and (max-width: 600px){
        div{
            max-width: 100%;
        }
    }
`