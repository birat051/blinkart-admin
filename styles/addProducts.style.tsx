import styled from "styled-components";

export const AddProductForm=styled.form`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Sans:wght@400&display=swap');
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    background-color: #F5FBFF;
    border-radius: 2px;
    max-width: 350px;
    margin-bottom: 1rem;
    position: relative;
    div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        p{
            flex: 2;
            color: black;
            margin-bottom: 0.5rem;
            span{
            margin-right: 0.5rem;
            }
        }
        button{
            background-color: white;
            color: #2872F1;
            border: 1px solid #2872F1;
            margin-bottom: 1rem;
            padding: 0.25rem 1rem 0.25rem 1rem;
        }
        input{
            margin-bottom: 0rem;
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
    input:disabled{
        background-color: #EBEBE4;
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
        cursor: pointer;
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
    h2{
        font-family: 'Inter',sans-serif;
        font-size: 1em;
        font-weight: 600;
        color: #2872F1;
        margin-bottom: 1rem;
    }
    h3{
        font-family: 'Inter',sans-serif;
        font-size: 0.8em;
        font-weight: 600;
        color: grey;
        margin-bottom: 1rem;
    }
`