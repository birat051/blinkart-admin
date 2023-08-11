import styled from "styled-components";


export const LoginPageForm=styled.form`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Sans:wght@400;600&display=swap');
    position: absolute;
    top: 30%;
    left: 50%;
    width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    transform: translate(-50%,-30%);
    p{
        margin-bottom: 1rem;
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.8em;
        color: red;
        font-weight: 400;
    }
    label
    {
        font-family: 'Inter',sans-serif;
        font-size: 1em;
        color: black;
        font-weight: 600;
        margin-bottom:  1rem;
    }
    input{
        background-color: white;
        color: black;
        border: 0.1px solid grey;
        padding: 0.5rem;
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.8em;
        border-radius: 2px;
        margin-bottom: 1rem;
        font-weight: 400;
    }
    button
    {
        font-family: 'Inter',sans-serif;
        font-size: 1em;
        color: white;
        border: none;
        border-radius: 2px;
        background-color: #FA651B;
        padding: 0.5rem;
        cursor: pointer;
        font-weight: 600;
    }
`