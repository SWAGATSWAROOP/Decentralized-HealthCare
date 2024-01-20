import React from "react";
import { colors } from "../../../../colors";
import GridLeftImage from "../../../../assets/images/login-grid-left.svg";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  min-height: 100vh;
`;

const Left = styled.div`
  display: grid;
  place-content: center;
`;

const Right = styled.div``;

const Line = styled.div`
  height: 1px;
  background: ${colors.secondary};
  height: 80%;
  align-self: center;
`;

const LoginLayout = ({ children }) => {
  return (
    <Container>
      <Left>
        <img src={GridLeftImage} alt={"Login Grid Left"} />
      </Left>
      <Line />
      <Right>{children}</Right>
    </Container>
  );
};

export default LoginLayout;
