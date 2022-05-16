import React from "react";
import {
  render,
  screen,
} from "@testing-library/react";
import { CarTableContext } from "../../providers/CarTableProvider";
import { TableInfo } from "../CarsTable/TableInfo";

const renderWithProvider = (
  ui: React.ReactElement,
  value: any
) => {
  return render(
    <CarTableContext.Provider value={value}>{ui}</CarTableContext.Provider>
  );
};

test("TableInfo renders properly", async () => {
  const provider = {
    total: 3, 
    carsToShow: [{
        stockNumber: 1,
        color: "red",
        manufacturerName: "BMW",
        modelName: "3 series",
        pictureUrl: "www.picture.com",
        fuelType: "Petrol",
        mileage: {
          number: 123,
          unit: "km",
        },
      }, {
        stockNumber: 2,
        color: "blue",
        manufacturerName: "Audi",
        modelName: "A8",
        pictureUrl: "www.picture.com",
        fuelType: "Diesel",
        mileage: {
          number: 321,
          unit: "km",
        },
      }]
  };

  renderWithProvider(
      <TableInfo />,
    provider
  );

  expect(screen.getByTestId("table-info-text")).toHaveTextContent("Showing 2 of 3 results");
});
