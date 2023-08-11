import styled from "styled-components";

export const UserNameContainer=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700;400&display=swap');
    display: flex;
    padding: 0.5rem;
    margin: 1rem;
    background-color: #384153;
    justify-content: flex-start;
    align-items: center;
    border-radius: 2px;
    div{
        display: flex;
        flex-direction: column;
        margin-left: 1rem;
    h1{
        font-size: 1em;
        font-family: 'Inter',sans-serif;
        font-weight:600;
        color: white;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 0.25rem;
    }
    h2{
        font-size: 0.8em;
        font-family: 'Inter',sans-serif;
        font-weight:400;
        color: #667178;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    }
`