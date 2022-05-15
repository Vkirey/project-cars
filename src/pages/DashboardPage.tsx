import styled from "@emotion/styled";
import * as React from "react";
import { CarsTable } from "../components/CarsTable/CarsTable";
import { Filter } from "../components/Filter";
import { PageLayout } from "../components/PageLayout";
import { CarTableProvider } from "../providers/CarTableProvider";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const DashboardPage: React.FC = () => {
  return (
    <PageLayout>
      <DashboardContainer>
        <CarTableProvider>
          <Filter />
          <CarsTable />
        </CarTableProvider>
      </DashboardContainer>
    </PageLayout>
  );
};
