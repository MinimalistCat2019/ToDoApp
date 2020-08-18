import React from "react";
import Navbar from '../Components/Navbar';
import styled from 'styled-components';
import { theme } from '../theme';
import Brand from './Brand';

const Header = () => {
    return (
        <StyledHeader>
            <Brand />
            <Navbar />
        </StyledHeader>
    )
}

export default Header;

const StyledHeader = styled.header`
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    // z-index: 1;
    font-size: 1.4rem;
    align-items: center;
    background-color: ${theme.primaryLight};
    display: flex;
    flex-flow: row nowrap;
    height: 70px;
`;