import Link from "next/link";
import styled from "styled-components";

export const MainPageLinkContainer=styled.div`
    display: flex;
    flex-direction: column;
    background-color: #1F2837;
    ul{
        list-style-type: none;
    }
    @media screen and (max-width:600px){
        display:none;        
    }
`

export const MenuLink=styled.li.attrs((props) => ({
    className: props.className, 
  }))`
    background-color: #202839;
    color: #EDEEF4;
    padding: 1rem;
    display: flex;
    :hover
    {
        color: rgb(41,116,241);
    }
    &.active{
        background-color: #384152;
    }
`

export const MenuLinkNav=styled(Link)`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');
    margin-left: 1rem;
    font-family: 'Inter',sans-serif;
    font-size: 1em;
    /* color: white; */
    font-weight: 600;
    cursor: pointer;
`

