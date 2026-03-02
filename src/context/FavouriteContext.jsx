import { createContext, useContext, useState } from "react";

const FavouriteContext = createContext();

export const useFavourite = () => useContext(FavouriteContext);

export const FavouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const toggleFavourite = (product) => {
    const exist = favourites.find((item) => item._id === product._id);
    if (exist) {
      setFavourites(favourites.filter((item) => item._id !== product._id));
    } else {
      setFavourites([...favourites, product]);
    }
  };

  return (
    <FavouriteContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouriteContext.Provider>
  );
};
