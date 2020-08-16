import React from 'react';
import styled from 'styled-components';

const Home = () => (
    <StyledContainer>
        <h1>Welcome to Paula's Todo App</h1>
        {/* <img src="https://paulatemptwo.s3.eu-west-2.amazonaws.com/WhatsApp+Image+2020-08-11+at+12.37.40.jpeg" alt="flowers" /> */}
    </StyledContainer>
)

export default Home;



const StyledContainer = styled.div`
    width: 100%;
    height: 100%;
    margin: 10px auto;
    background-image: ${props => `url(${props.img})`};
    background-size:cover;
`