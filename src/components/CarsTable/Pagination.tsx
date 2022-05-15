import * as React from "react";
import styled from "@emotion/styled";
import { useCarsContext } from "../../providers/CarTableProvider";
import { Button } from "@mui/material";

const PaginationContainer = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: center;
  gap: 12px;
`;

const PagesInfo = styled.div`
  font-size: 14px;
  line-height: 20px;
`;

const StyledPageButton = styled(Button)`
  background: transparent;
  height: 20px;
  font-weight: normal;
  font-size: 14px;

  :hover {
    text-decoration: underline;
  }
`;

export const Pagination: React.FC = () => {
  const {
    page,
    pagesCount,
    setPageNumber,
    toNextPage,
    toPrevPage,
    toLastPage,
  } = useCarsContext();

  return (
    <PaginationContainer>
      <StyledPageButton onClick={() => setPageNumber(1)} disabled={page <= 1}>
        First
      </StyledPageButton>
      <StyledPageButton onClick={() => toPrevPage()} disabled={page <= 1}>
        Previous
      </StyledPageButton>
      <PagesInfo>
        Page {page} of {pagesCount}
      </PagesInfo>
      <StyledPageButton
        onClick={() => toNextPage()}
        disabled={page >= pagesCount}
      >
        Next
      </StyledPageButton>
      <StyledPageButton
        onClick={() => toLastPage()}
        disabled={page >= pagesCount}
      >
        Last
      </StyledPageButton>
    </PaginationContainer>
  );
};
