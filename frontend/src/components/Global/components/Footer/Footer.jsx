import { colors } from "../../../../colors";
import React from "react";
import styled from "styled-components";
import Section from "../Section/Section";

const FooterContainer = styled.div`
  text-align: center;
  background: ${colors.secondary}1A;
  color: ${colors.darkBrown};
  padding: 20px 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Section>Made By Usman</Section>
    </FooterContainer>
  );
};

export default Footer;
