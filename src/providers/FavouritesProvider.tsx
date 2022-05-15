import * as React from "react";
import { localStorageManager } from "../helpers/LocalStorageManager";
import { FavouritesContextType } from "../types/Favourites.types";

export const FavouritesContext: React.Context<FavouritesContextType | null> =
  React.createContext<FavouritesContextType | null>(null);

export const FavouritesProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [favourites, setFavourites] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    const favouritesFromLS = localStorageManager.get("favourites");
    if (favouritesFromLS) {
      try {
        const favouritesParsed: Array<string> = JSON.parse(favouritesFromLS);
        setFavourites(favouritesParsed);
      } catch (e) {
        console.error(
          "Failed to get exising favourites from local storage. Data may be corrupted, clearing it to empty list"
        );
        localStorageManager.remove("favourites");
      }
    }
  }, []);

  const addFavourite = React.useCallback(
    (stockN: string) => {
      if (!favourites.includes(stockN)) {
        let favouritesToSave = [...favourites, stockN];
        setFavourites(favouritesToSave);

        localStorageManager.remove("favourites");
        localStorageManager.add("favourites", JSON.stringify(favouritesToSave));
      }
    },
    [favourites]
  );

  const removeFavourite = React.useCallback(
    (stockN: string) => {
      if (favourites.includes(stockN)) {
        let favouritesToSave = favourites.filter((x) => x !== stockN);
        setFavourites(favouritesToSave);

        localStorageManager.remove("favourites");
        localStorageManager.add("favourites", JSON.stringify(favouritesToSave));
      }
    },
    [favourites]
  );

  const handleToggleFavourite = React.useCallback(
    (stockN: string) => {
      let favouritesToSave;
      if (!favourites.includes(stockN)) {
        favouritesToSave = [...favourites, stockN];
      } else {
        favouritesToSave = favourites.filter((x) => x !== stockN);
      }
      setFavourites(favouritesToSave);

      localStorageManager.remove("favourites");
      localStorageManager.add("favourites", JSON.stringify(favouritesToSave));
    },
    [favourites]
  );

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addFavourite,
        removeFavourite,
        handleToggleFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavouritesContext = (): FavouritesContextType => {
  const favouritesContext = React.useContext(FavouritesContext);
  if (!favouritesContext) {
    throw new Error(
      "useFavouritesContext() hook requires a <FavouritesProvider> higher in the tree"
    );
  }

  return favouritesContext;
};
