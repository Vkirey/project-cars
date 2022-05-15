type Milleage = {
    number: number;
    unit: string;
}

export type Car = {
    stockNumber: number;
    manufacturerName: string;
    modelName: string;
    color: string;
    mileage: Milleage;
    fuelType: string;
    pictureUrl: string;
}

export type CarTableContextType = {
    manufacturerOptions: Array<Manufacturer>;
    colorOptions: Array<string>;
    page: number;
    carsToShow: Array<Car>;
    total: number;
    pagesCount: number;
    color?: string;
    manufacturer?: string;
    searchByColor: (c: string) => void;
    searchByManufacturer: (m: string) => void;
    loading: boolean;
    setPageNumber: (pageN: number) => void;
    toNextPage: () => void,
    toPrevPage: () => void,
    toLastPage: () => void
}

export type Model = {
    name: string;
}

export type Manufacturer = {
    name: string;
    models: Array<Model>;
}


// Responses

export type ManufacturersResponse = {
    manufacturers: Array<Manufacturer>;
}

export type ColorsResponse = {
    colors: Array<string>;
}

export type CarsResponse = {
    cars: Array<Car>;
    totalPageCount: number;
    totalCarsCount: number;
}

export type CarResponse = {
    car: Car
}