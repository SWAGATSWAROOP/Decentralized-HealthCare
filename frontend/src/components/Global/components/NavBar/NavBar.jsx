import React from "react";
import { colors } from "../../../../colors";
import { fonts } from "../../../../fonts";
import styled from "styled-components";
import Button from "../Button/Button";
import Section from "../Section/Section";
import Logo from "../../../../assets/images/Logo.svg";
import { Link, NavLink } from "react-router-dom";

const Nav = styled.nav`
  padding: 20px 0;
  background: ${colors.white};
  position: sticky;
  top: 0;
  z-index: 2;
`;
const NavSection = styled(Section)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLeft = styled.div``;
const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  font-weight: ${fonts.regular};
  font-size: 20px;
`;
const LinkContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledNavLink = styled(NavLink)`
  color: ${colors.black};
`;
const ButtonContainer = styled.div``;

const NavBar = () => {
  return (
    <Nav>
      <NavSection>
        <NavLeft>
          <Link to="/">
            <img src={Logo} alt={"Doctor Logo"} />
          </Link>
        </NavLeft>
        <NavRight>
          <LinkContainer>
            <StyledNavLink to="/" exact activeStyle={{ color: colors.primary }}>
              Home
            </StyledNavLink>
            <StyledNavLink
              to="/about"
              exact
              activeStyle={{ color: colors.primary }}
            >
              About
            </StyledNavLink>
            <StyledNavLink
              to="/covid19"
              exact
              activeStyle={{ color: colors.primary }}
            >
              Covid19
            </StyledNavLink>
            <StyledNavLink
              to="/doctors"
              exact
              activeStyle={{ color: colors.primary }}
            >
              Doctors
            </StyledNavLink>
          </LinkContainer>
          <ButtonContainer>
            <Link to="/login_options">
              <Button>Get Started</Button>
            </Link>
          </ButtonContainer>
        </NavRight>
      </NavSection>
    </Nav>
  );
};

export default NavBar;
