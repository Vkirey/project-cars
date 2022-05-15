export type FavouritesContextType = {
    favourites: Array<string>;
    addFavourite: (stockN: string) => void
    removeFavourite: (stockN: string) => void
    handleToggleFavourite: (stockN: string) => void
}