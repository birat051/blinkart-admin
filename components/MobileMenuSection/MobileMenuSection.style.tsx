import styled from "styled-components";

export const MobileMenuContainer=styled.div`
    display: flex;
    flex-direction: column;
    background-color: #1F2837;
    ul{
        list-style-type: none;
    }
    position: fixed;
    top: 0;
    right: 0;
    z-index: 2;
    min-height: 100vh;
    padding-top: 2rem;
    @media screen and (min-width:600px){
        display: none;
    }
`