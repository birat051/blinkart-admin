import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const ProductContainer =styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: white;
    border: 0.1px solid grey;
    margin-bottom: 1rem;
    position: relative;
`

export const ProductImage=styled.img`
    width: 250px;
        height: 375px;
        object-fit: contain;
        @media screen and (max-width: 1000px){
        min-width: none;
        width: 100px;
        height: 150px;
        object-fit: contain;
    }
    @media screen and (max-width: 600px){
        /* max-width: 100px; */
        min-width: 0px;
        width: 100px;
        height: 155px;
        object-fit: contain;
    }
`

export const ProductSpecification = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&family=Noto+Sans:wght@400;500&display=swap');
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex: 5;
    h1
    {
        color: black;
        font-size: 1em;
        font-family: 'Inter',sans-serif;
        font-weight: 600;
        margin-bottom: 1.25rem;
    }
    p
    {
        color: black;
        font-size: 0.8em;
        font-family: 'Noto Sans',sans-serif;
        font-weight: 400;
        margin-bottom: 0.5rem;
    }
    p span{
      color  : grey;
      margin-right: 10px;
    }
    @media screen and (max-width: 1000px){
        flex: 4;
        margin-left: 1em;
        margin-right: 1em;
        h1{
            font-size: 0.9em;
        }
    }
    @media screen and (max-width: 600px){
        flex: 4;
        margin-left: 0.25em;
        margin-right: 0.25em;
        h1{
            font-size: 0.75em;
        }
        p{
            font-size: 0.6em;
        }
    }
`

export const PriceView=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;500;600display=swap');
    flex: 1;
    h2{
        font-family: 'Inter',sans-serif;
        color: black;
        font-weight: 700;
        font-size: 1.25em;
        /* text-align: right; */
        /* text-align: justify; */
        text-align: left;
        margin-bottom: 0.5rem;
    }
    p{
        font-family: 'Inter',sans-serif;
        color: #60B86C;
        font-size: 0.8em;
        font-weight: 600;
        text-align: left;
    }
    p span{
        text-decoration: line-through;
        color: grey;
        font-weight: 500;
        font-size: 1em;
        padding-right: 5px;
    }
    flex: 2;
    @media screen and (max-width: 1000px){
        h2{
            font-size: 0.9em;
        }
        p{
            font-size: 0.75em;
        }
        p span{
            font-size: 0.8em;
        }
    }
    @media screen and (max-width: 1000px){
        h2{
            font-size: 0.75em;
        }
        p{
            font-size: 0.6em;
        }
        p span{
            font-size: 0.6em;
        }
    }
`

export const ProductOptionsIcon=styled(FontAwesomeIcon)`
    cursor:'pointer';
    @media screen and (max-width:1000px){
        display: none;
    }

`

export const EditIcon=styled(FontAwesomeIcon)`
   @media screen and (min-width:1000px){
        display: none;
    } 
`

export const ProductPopupOptions = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');
    z-index: 2;
    display: flex;
    border-radius: 2px;
    border: 0.2px solid grey;
    flex-direction: column;
    padding: 0.5rem;
    padding-bottom: 0.25rem;
    position: absolute;
    right: 5%;
    background-color: white;
    /* transform: translateX(50%); */
    top: 4%;
    /* width: 80px; */
    /* height: 50px; */
    h2{
        font-family: 'Inter',sans-serif;
        font-weight: 400;
        cursor: pointer;
        font-size: 0.75em;
        color: black;
        margin-bottom: 0.75rem;
        :hover{
            color: #2872F1;
            font-weight: 500;
        }
    }
`