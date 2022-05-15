import * as React from "react";
import styled from "@emotion/styled";

const StyledFooter = styled.footer`
  height: 80px;
  text-align: center;
  border-top: 1px solid #ededed;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const Footer: React.FC = () => {
  return <StyledFooter>© VASYL KIRIEI 2022</StyledFooter>;
};
