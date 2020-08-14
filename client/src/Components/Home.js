import React from 'react';
import styled from 'styled-components';

export const StyledContainer = styled.div`
    width: 100%;
    height: 100%;
    margin: 10px auto;
    background-image: ${props => `url(${props.img})`};
    background-size:cover;
`
const Home = () => (
    <StyledContainer>
        <h1>Welcome to Paula's Todo App</h1>
        {/* <img src="https://paulatemptwo.s3.eu-west-2.amazonaws.com/93019451_240248337026843_9118538514277417567_n.jpg" alt="flowers" /> */}
    </StyledContainer>
)

export default Home;