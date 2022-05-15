import * as React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import logo from "../assets/logo.png";
import { Button } from "@mui/material";

const StyledHeader = styled.header`
  border-bottom: 1px solid #ededed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledLogoIcon = styled.img`
  height: 49px;
  padding: 15px 50px;
  cursor: pointer;
`;

const MenuItems = styled.div`
  display: flex;
  padding-right: 25px;
`;

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <StyledLogoIcon src={logo} onClick={() => navigate("/")} />
      <MenuItems>
        <Button color="secondary">Purchase</Button>
        <Button color="secondary">My Orders</Button>
        <Button color="secondary">Sell</Button>
      </MenuItems>
    </StyledHeader>
  );
};
