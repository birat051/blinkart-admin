import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const HeaderContainer=styled.header`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700;400&display=swap');
    display: flex;
    width: 100%;
    padding: 1rem 2rem 1rem 2rem;
    background-color: rgb(41,116,241);
    justify-content: space-between;
    button{
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        font-size: 0.9em;
        border: none;
        cursor: pointer;
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
        min-width: 120px;
        border-radius: 1px;
        white-space: nowrap;
        background-color: white;
        color: rgb(41,116,241);
        padding: 0.5rem;
    }
`

export const DesktopLink=styled.li`
    @media screen and (max-width:800px){
        display: none;
    }
`

export const ImageComponent=styled.div`
     display: flex;
     justify-content: flex-start;
     align-items: center;
     /* margin-right: 1rem; */
    @media screen and (max-width:800px){
        flex: 4;
    }
`
export const Navigation=styled.nav`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex: 1;
    align-items: center;
    z-index: 2;
    scrollbar-width: none; 
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
    display: none;
  }
`

export const UnorderedLink=styled.ul`
    list-style: none;
    display: flex;
    flex-direction: row;
    flex: 2;
    justify-content: space-evenly;
`

export const DropDownLink= styled.li`
    position: relative;
    display: block;
`

export const MobileIcon=styled(FontAwesomeIcon)`
    display: none;
    color: white;
    @media screen and (max-width:600px){
        display: block;
        width: 20px;
        height: 20px;
    }
`