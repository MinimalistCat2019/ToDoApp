import React from 'react'
import styled from "styled-components";
import {theme} from "../theme";

import logo from '../logo.png';

const Brand = () => {
    return (
    <> 
      <Image src={logo} alt="Company Logo" />
      {/* <CompanyName>  Todo App  </CompanyName> */}
    </>
    )
  }
  
export default Brand
  
const Image = styled.img`
    height: 85%;    
    margin: auto 0;
`;

const  CompanyName = styled.h1`
  color: ${theme.primaryDark}
`;
