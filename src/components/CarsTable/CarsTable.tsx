import * as React from "react";
import styled from "@emotion/styled";
import { TableInfo } from "./TableInfo";
import { CarTableBody } from "./CarTableBody";
import { Pagination } from "./Pagination";

const StyledCarsTableContainer = styled.div`
  flex: 2;
  padding: 8px;
`;

export const CarsTable: React.FC = () => {
  return (
    <StyledCarsTableContainer>
      <TableInfo />
      <CarTableBody />
      <Pagination />
    </StyledCarsTableContainer>
  );
};
