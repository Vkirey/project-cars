import React from "react";
import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { FavouritesContext } from "../../providers/FavouritesProvider";
import { CarTableRow } from "../CarsTable/CarTableRow";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const renderWithProvider = (
  ui: React.ReactElement,
  value: any
) => {
  return render(
    <FavouritesContext.Provider value={value}>{ui}</FavouritesContext.Provider>
  );
};

test("CarTableRow renders properly", async () => {
  const history = createMemoryHistory();
  const handleToggleFavouriteFunc = jest.fn();

  const provider = {
    favourites: [],
    handleToggleFavourite: handleToggleFavouriteFunc,
  };

  const rowData = {
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
  };

  renderWithProvider(
    <Router location={history.location} navigator={history}>
      <CarTableRow rowData={rowData} />
    </Router>,
    provider
  );

  expect(screen.getByTestId("car-name")).toHaveTextContent("BMW 3 series");

  expect(screen.getByTestId("car-details")).toHaveTextContent(
    "Stock # 1 - 123 km - Petrol - Red"
  );

  expect(screen.getByTestId("car-details")).toHaveTextContent(
    "Stock # 1 - 123 km - Petrol - Red"
  );

  fireEvent.click(screen.getByTestId('car-favour-btn'))

  expect(handleToggleFavouriteFunc).toHaveBeenCalledWith("1")
});
