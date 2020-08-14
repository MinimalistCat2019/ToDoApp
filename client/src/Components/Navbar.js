import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import styled from 'styled-components';

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "#dce7f3" : "transparent"};
  color: ${props => props.primary ? "#3a405a" : "#dce7f3"};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #dce7f3;
  border-radius: 3px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
    color: #dce7f3;
    
`;

const Navbar = (props) => {
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

  const unauthenticatedNavBar = () => {
    return (
      <>
      <Button>
        <StyledLink to="/">
          Home
        </StyledLink>
      </Button>
      <Button>
        <StyledLink  to="/login">
          Login
        </StyledLink >
      </Button>
      <Button>
        <StyledLink  to="/register">
          Register
        </StyledLink >        
      </Button>
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <Button>
          <StyledLink  to="/">
            Home
          </StyledLink >
        </Button>
        <Button>
          <StyledLink  to="/todos">
            Todos
          </StyledLink >
        </Button>
        {user.role === "admin" ? (
          <Button>
          <StyledLink  to="/admin">
            Admin
          </StyledLink >
          </Button>
        ) : null}
        <Button primary onClick={onClickLogoutHandler}>
          Logout
        </Button>
      </>
    );
  };

  return (
    <nav>
        <ul>
          {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
        </ul>
    </nav>
  );
};

export default Navbar;
