import {
  Car,
  CarResponse,
  CarsResponse,
  ColorsResponse,
  Manufacturer,
  ManufacturersResponse,
} from "../types/Car.types";
import { encodeObjToQuery } from "./Utils";

export const useApi = () => {
  const get = <T,>(url: string): Promise<T> => {
    return fetch(url, { headers: { origin: "*" } }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<T>;
    });
  };

  const getManufacturers = async (): Promise<Array<Manufacturer>> => {
    return (
      await get<ManufacturersResponse>(
        "https://auto1-mock-server.herokuapp.com/api/manufacturers"
      )
    ).manufacturers;
  };

  const getColors = async (): Promise<Array<string>> => {
    return (
      await get<ColorsResponse>(
        "https://auto1-mock-server.herokuapp.com/api/colors"
      )
    ).colors;
  };

  const getCarsData = async (
    page?: number,
    manufacturer?: string,
    color?: string
  ): Promise<CarsResponse> => {
    const query: any = {};
    if (page) {
      query.page = page;
    }
    if (manufacturer) {
      query.manufacturer = manufacturer;
    }
    if (color) {
      query.color = color;
    }
    return await get<CarsResponse>(
      `https://auto1-mock-server.herokuapp.com/api/cars?${encodeObjToQuery(
        query
      )}`
    );
  };

  const getCar = async (id: string): Promise<Car> => {
    return (
      await get<CarResponse>(
        "https://auto1-mock-server.herokuapp.com/api/cars/" + id
      )
    ).car;
  };

  return {
    getManufacturers,
    getColors,
    getCarsData,
    getCar,
  };
};
