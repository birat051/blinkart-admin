import { Bar, Pie } from "react-chartjs-2";
import styled from "styled-components";
import { HomePageRightColumn } from "./global.style";

type headingElementType={
    backgroundcolor:string
}


export const DashboardContainer=styled(HomePageRightColumn)`
@media screen and (max-width: 600px){
    align-items: center;
}
`

export const HomeHeading=styled.div.attrs((props) => ({
    className: props.className, 
  }))`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    column-gap: 1rem;
    margin-bottom: 1rem;
    @media screen and (max-width:600px){
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
    &.admin{
        grid-template-columns: repeat(4,1fr);  
    }
`

export const HomeHeadingElement=styled.div`
     @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
    background-color: ${(props:headingElementType)=>props.backgroundcolor};
    border-radius: 8px;
    border: none;
    padding: 1rem;
    flex: 1;
    /* margin-left: 1rem; */
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1{
        color: white;
        font-family: 'Inter',sans-serif;
        font-size: 1.5em;
        font-weight: 600;
        text-align: left;
    }
    h2{
        color: white;
        font-family: 'Inter',sans-serif;
        font-size: 1em;
        font-weight: 400;
        margin-bottom: 1rem;
        text-align: left;
    }
    @media screen and (max-width:1500px){
        h1{
            font-size: 1em;
            /* white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis; */
        }
        h2{
            font-size: 0.75em; 
            /* white-space: nowrap;
             overflow: hidden;
            text-overflow: ellipsis; */
        }
    }
    @media screen and (max-width:600px){
        margin-bottom: 0.5rem;
        margin-left: 0rem;
        width: 80%;
    }
  `

export const GraphContainerRow=styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 1rem;
    /* flex-direction: row; */
    /* max-width: 300px; */
    justify-content: space-between;
    /* max-width: 95%; */
    @media screen and (max-width: 1300px){
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: flex-start;
    }
    @media screen and (max-width: 600px){
        width: 80%;
    }
`

export const GraphContainer=styled.div`
 @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');
     display: flex;
     h1{
        color: black;
        font-family: 'Inter',sans-serif;
        font-size: 1em;
        font-weight: 600;
        margin-bottom: 0.5rem;
        text-align: left;
     }
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 0.1px solid grey;
    flex: 2;
    padding: 1rem;
    aspect-ratio: 4/3;
    border-radius: 8px;
    /* max-width: 100%; */
    width: 100%;
    height: 500px;
    grid-column: 1/2;
    @media screen and (max-width: 1300px){
        margin-left: 0rem;
        /* width: 100%; */
        margin-bottom: 1rem;
        max-width: 350px;
    }
`

export const PieChartContainer=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');
     display: flex;
     h1{
        color: black;
        font-family: 'Inter',sans-serif;
        font-size: 1em;
        font-weight: 600;
        margin-bottom: 0.5rem;
        text-align: left;
     }
     /* flex-direction: column; */
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 0.1px solid grey;
    border-radius: 8px;
    height: 500px;
    /* max-width: 300px; */
    @media screen and (max-width: 1300px){
        margin-left: 0rem;
        margin-bottom: 1rem;
        max-width: 350px;
    }
`