import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import styled from 'styled-components';
import { theme } from '../theme';

import { useSpring, animated } from 'react-spring';

const CollapseMenu = (props) => {
  const { open } = useSpring({ open: props.navbarState ? 0 : 1 });

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
    <CollapseWrapper style={{
        transform: open.interpolate({
          range: [0, 0.2, 0.3, 1],
          output: [0, -20, 0, -200],
        }).interpolate(openValue => `translate3d(0, ${openValue}px, 0`),
      }}
      >
      <NavLinks>
        <Link href="/" onClick={props.handleNavbar}>Home</Link>
        <Link href="/login" onClick={props.handleNavbar}>Login</Link>
        <Link href="/register" onClick={props.handleNavbar}>Register</Link>
      </NavLinks>
    </CollapseWrapper>
    );
  };

  const authenticatedNavBar = (props) => {
    return (
        <CollapseWrapper style={{
                transform: open.interpolate({
                range: [0, 0.2, 0.3, 1],
                output: [0, -20, 0, -200],
                }).interpolate(openValue => `translate3d(0, ${openValue}px, 0`),
            }}
        >
            <NavLinks>
                <Link href="/" onClick={props.handleNavbar}>Home</Link>
                <Link href="/todos" onClick={props.handleNavbar}>Todos</Link>
                {user.role === "admin" ? (
                <Link to="/admin" onClick={props.handleNavbar}>
                    Admin 
                </Link>
                ) : null}
                <Link href="/" onClick={props.onClickLogoutHandler}>Logout</Link>
            </NavLinks>
        </CollapseWrapper>
    );
  };

  if (props.navbarState === true) {
    return (
      <CollapseWrapper style={{
        transform: open.interpolate({
          range: [0, 0.2, 0.3, 1],
          output: [0, -20, 0, -200],
        }).interpolate(openValue => `translate3d(0, ${openValue}px, 0`),
      }}
      >
        <>
        {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
        </>
      </CollapseWrapper>
    );
  }
  return null;
};

export default CollapseMenu;

const CollapseWrapper = styled(animated.div)`
  background: #2d3436;
  position: fixed;
  top: 4.5rem;
  left: 0;
  right: 0;
`;

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 2rem 1rem 2rem 2rem;

  & li {
    transition: all 300ms linear 0s;
  }

  & a {
    font-size: 1.4rem;
    line-height: 2;
    color: ${theme.primaryDark};
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: ${theme.primaryHover};
      border-bottom: 1px solid ${theme.primaryDark};
    }
  }
`;
