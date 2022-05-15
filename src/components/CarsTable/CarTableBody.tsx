import styled from "@emotion/styled";
import * as React from "react";
import { useCarsContext } from "../../providers/CarTableProvider";
import { CarTableRow, CarTableRowEmpty } from "./CarTableRow";

const CarTableBodyContainer = styled.div``;

export const CarTableBody: React.FC = () => {
  const { carsToShow, loading } = useCarsContext();
  return (
    <CarTableBodyContainer>
      {loading ? (
        <CarTableRowEmpty />
      ) : (
        carsToShow.map((car) => <CarTableRow key={`car-index-${car.stockNumber}`} rowData={car} />)
      )}
    </CarTableBodyContainer>
  );
};
