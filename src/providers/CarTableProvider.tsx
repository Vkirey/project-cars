import * as React from "react";
import { useApi } from "../helpers/Api";
import { Car, CarTableContextType, Manufacturer } from "../types/Car.types";

export const CarTableContext: React.Context<CarTableContextType | null> =
  React.createContext<CarTableContextType | null>(null);

export const CarTableProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const loading = React.useRef(false)
  const [color, setColor] = React.useState('');
  const [manufacturer, setManufacturer] = React.useState('');
  const [page, setPage] = React.useState(1)
  const [total, setTotal] = React.useState(0)
  const [pagesCount, setTotalPagesCount] = React.useState(0)
  const [carsToShow, setCarsToShow] = React.useState<Array<Car>>([])

  const [manufacturerOptions, setManufacturerOptions] = React.useState<
    Array<Manufacturer>
  >([]);

  const [colorOptions, setColorOptions] = React.useState<
    Array<string>
  >([]);

  const { getManufacturers, getColors, getCarsData } = useApi();

  React.useEffect(() => {
    loading.current = true
    getManufacturers()
      .then((manufacturers) => setManufacturerOptions(manufacturers))
      .catch((e) => console.error("Failed to retrieve manufacturers"));

      getColors()
      .then((colors) => setColorOptions(colors))
      .catch((e) => console.error("Failed to retrieve colors"));

      getCarsData()
      .then((data) => {
        setCarsToShow(data.cars)
        setTotal(data.totalCarsCount)
        setTotalPagesCount(data.totalPageCount)
        loading.current = false
      })
      .catch((e) => console.error("Failed to retrieve colors"));
  }, []);

  const searchByColor = (c: string) => {
    if(colorOptions.includes(c)) {
      setColor(c)
    } else {
      setColor('')
    }
  }

  const searchByManufacturer = (m: string) => {
    if(manufacturerOptions.find(x => x.name === m)) {
      setManufacturer(m)
    } else {
      setManufacturer('')
    }
  }

  React.useEffect(() => {
    if(loading.current) {
      return;
    }

    loading.current = true
    getCarsData(1, manufacturer, color)
    .then((data) => {
      setCarsToShow(data.cars)
      setTotal(data.totalCarsCount)
      setTotalPagesCount(data.totalPageCount)
      loading.current = false
    })
  }, [color, manufacturer])

  React.useEffect(() => {
    if(loading.current) {
      return;
    }

    loading.current = true
    getCarsData(page, manufacturer, color)
    .then((data) => {
      setCarsToShow(data.cars)
      setTotal(data.totalCarsCount)
      setTotalPagesCount(data.totalPageCount)
      loading.current = false
    })

  }, [page])

  const setPageNumber = (pageN: number) => {
    setPage(pageN)
  }

  const toNextPage = () => {
    setPage(page => ++page)
  }

  const toPrevPage = () => {
    setPage(page => --page)
  }

  const toLastPage = () => {
    setPage(pagesCount)
  }

  return (
    <CarTableContext.Provider
      value={{
        manufacturerOptions,
        colorOptions,
        color,
        manufacturer,
        searchByColor,
        searchByManufacturer,
        page,
        total,
        carsToShow,
        pagesCount,
        loading: loading.current,
        setPageNumber,
        toNextPage,
        toPrevPage,
        toLastPage
      }}
    >
      {children}
    </CarTableContext.Provider>
  );
};

export const useCarsContext = (): CarTableContextType => {
  const carsContext = React.useContext(CarTableContext);
  if (!carsContext) {
    throw new Error(
      "useCarsContext() hook requires a <CarsProvider> higher in the tree"
    );
  }

  return carsContext;
};
