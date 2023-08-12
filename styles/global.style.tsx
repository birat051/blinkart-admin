import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type buttonStyle={
    backgroundcolor:string
    color: string
    height?: string
}


type gridIconStyle={
    gridcolumnstart?: number,
    gridcolumnend?: number,
    gridrowstart?: number,
    gridrowend?: number
}


type iconStyle={
    width: string
    height: string
    color: string
    display?: string
}

export const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  width: ${(props:iconStyle)=>props.width};
  height: ${(props:iconStyle)=>props.height};
  color: ${(props:iconStyle)=>props.color};
  flex: 1;
  display: ${(props:iconStyle)=>props.display??'block'};

  @media screen and (max-width:800px){
   display : block;
  }
`;

export const GridIcon = styled(StyledFontAwesomeIcon)`
  grid-column-start: ${(props:gridIconStyle)=>props.gridcolumnstart};
  grid-column-end: ${(props:gridIconStyle)=>props.gridcolumnend};
  grid-row-end: ${(props:gridIconStyle)=>props.gridrowend};
  grid-row-start: ${(props:gridIconStyle)=>props.gridrowstart};
`;



export const CustomButton = styled.button`
     @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap');
    background-color: ${(props:buttonStyle)=>props.backgroundcolor};
    justify-content: center;
    align-items: center;
    display: flex;
    height: ${(props:buttonStyle)=>props.height??'28px'};
    color: ${(props:buttonStyle)=>props.color};
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 0.9em;
    border: none;
    cursor: pointer;
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
    min-width: 120px;
    border-radius: 1px;
    white-space: nowrap;
    span{
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 10px;
    padding-right: 10px;
    max-width: 100px;
    }
    @media screen and (max-width: 800px){
        min-width:40px;
        padding: 10px;
    }
`
export const HomeContentContainer=styled.main`
    min-height: 100vh;
    background-color: white;
    position: relative;
    display: flex;
    justify-content: stretch;
`

export const HomePageRightColumn=styled.div`
    border: 0.1px solid grey;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    flex: 4;
    background-color: rgb(240,242,246);
    padding: 1rem;
`


export const ErrorContainer=styled(HomePageRightColumn)`
     @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap');
    align-items: center;
    justify-content: center;
    p{
        font-size: 1em; 
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        color: black;
    }
`