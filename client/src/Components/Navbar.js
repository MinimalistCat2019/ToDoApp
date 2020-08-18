import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import styled from 'styled-components';
import { theme } from '../theme';
import { useSpring, animated, config } from 'react-spring';

const Navbar = (props) => {

  const barAnimation = useSpring({
    from: { transform: 'translate3d(0, -10rem, 0)' },
    transform: 'translate3d(0, 0, 0)',
  });

  const linkAnimation = useSpring({
    from: { transform: 'translate3d(0, 30px, 0)', opacity: 0 },
    to: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    delay: 800,
    config: config.wobbly,
  });

  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const unauthenticatedNavBar = (props) => {
    return (
      <StyledMainNav style={barAnimation}>
        <Button>
          <StyledLink style={linkAnimation} to="/">
            Home
          </StyledLink>
        </Button>
        <Button>
          <StyledLink style={linkAnimation} to="/login">
            Login
          </StyledLink >
        </Button>
        <Button>
          <StyledLink style={linkAnimation}  to="/register">
            Register
          </StyledLink >        
        </Button>
      </StyledMainNav>
    );
  };

  const authenticatedNavBar = (props) => {
    return (
      <>
      <StyledMainNav style={barAnimation}> 
        <Button>
          <StyledLink style={linkAnimation} to="/">
            Home
          </StyledLink >
        </Button>
        <Button>
          <StyledLink style={linkAnimation} to="/todos">
            Todos
          </StyledLink >
        </Button>
        {user.role === "admin" ? (
          <Button>
          <StyledLink style={linkAnimation}  to="/admin">
            Admin
          </StyledLink >
          </Button>
        ) : null}
        <Button style={barAnimation} primary onClick={onClickLogoutHandler} >
          Logout
        </Button>
      </StyledMainNav>
      </>
    );
  };

  return (
    <>

      <StyledMainNav style={barAnimation}>
          <FlexContainer>
            {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
          </FlexContainer>
      </StyledMainNav>
    </>
  );
};

export default Navbar;

const Button = styled.button`
  background: ${props => props.primary ? theme.primaryDark : "transparent"};
  color: ${props => props.primary ? theme.primaryLight : theme.primaryDark};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${theme.primaryDark};
  border-radius: 5px;
  &:hover {
    text-decoration: none;
    color: ${theme.primaryHover};
}
  @media (max-width: 768px) {
      font-size: .65em;
      padding: .25em .2em;
      margin: 0.2em;
    }
`;

const StyledLink = styled(Link)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  &  {
    color: ${props => props.primary ? theme.primaryLight : theme.primaryDark};
    text-transform: uppercase;
    font-weight: 600;
    border-bottom: 1px solid transparent;
    margin: 0 1.5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;
    text-decoration: none;

    &:focus, &:hover {
      text-decoration: none;
      color: ${theme.primaryHover};
      border-bottom: 1px solid ${theme.primaryLight};
  }
  
  @media (max-width: 768px) {
      font-size: .8em;
      padding: .25em .2em;
      margin: 0.2em;
    }
  }  
`;

const StyledMainNav = styled(animated.nav)`
    {/* position: fixed; */}
    width: 100%;
    top: 0;
    left: 0;
    
    z-index: 1;
    font-size: 1.4rem;
    align-items: center;
    background-color: ${theme.primaryLight};
    display: flex;
    flex-flow: row nowrap;
    height: 56px;
`
const FlexContainer = styled.div`
  max-width: 120rem;
  display: flex;
  margin: auto;
  padding: 0 2rem;;
  justify-content: space-between;
  height: 3rem;
  flex-direction: row-reverse;
`;