import styled from "styled-components";

export const AddProductForm=styled.form`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Sans:wght@400&display=swap');
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    background-color: white;
    border-radius: 2px;
    max-width: 350px;
    div{
        display: flex;
        justify-content: space-between;
        p{
            flex: 2;
            color: black;
            margin-bottom: 0.5rem;
            span{
            margin-right: 0.5rem;
            }
        }
    }
    input{
        border: 0.1px solid grey;
        border-radius: 2px;
        padding: 0.5rem;
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.8em;
        font-weight: 400;
        color: black;
        margin-bottom: 1rem;
        background-color: white;
        flex: 2;
    }
    textarea{
        border: 0.1px solid grey;
        border-radius: 2px;
        padding: 0.5rem;
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.8em;
        font-weight: 400;
        color: black;
        margin-bottom: 1rem;
        background-color: white;
    }
    label{
        font-family: 'Inter',sans-serif;
        font-size: 1em;
        font-weight: 600;
        color: black;
        margin-bottom: 0.5rem;
    }
    select{
        background-color: white;
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.8em;
        font-weight: 400;
        padding: 0.5rem;
        color: black;
        margin-bottom: 1rem;
    }
    button
    {
        font-family: 'Inter',sans-serif;
        font-size: 1em;
        font-weight: 600;
        color: white;
        padding: 0.5rem;
        border-radius: 2px;
        border: none;
        background-color: #FA651B;
    }
    option{
        padding: 0.5rem;
        font-family: 'Noto Sans',sans-serif;
        font-size: 1em;
        font-weight: 400;
        color: black;
    }
    p{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: 'Noto Sans',sans-serif;
        margin-bottom: 0.5rem;
        font-size: 0.8em;
        font-weight: 400;
        color: red;
        margin-bottom: 1rem;
    }
`