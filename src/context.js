import React, { useState, useEffect, useContext } from "react";
import { catgories } from "./catgories-data";

const AppContext = React.createContext();

const getCatgoriesNames = catgories.map((cat) => {
  const { id, catgoryTitle } = cat;
  return {
    id: id,
    name: catgoryTitle,
  };
  console.log(cat.catgoryTitle);
});
const AppProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [catgory, setCatgory] = useState();
  console.log(catgory);

  useEffect(() => {
    setCatgory(catgories[0]);
    // console.log(catgories[0]);
  }, []);

  const handleCatgory = (catgoryId) => {
    setCatgory(() => {
      let currentCat = catgories.filter((cat) => cat.id === catgoryId);
      return currentCat[0];
    });
  };
  const openCart = () => {
    setIsCartOpen(true);
  };
  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        isCartOpen,
        openCart,
        closeCart,
        catgory,
        getCatgoriesNames,
        handleCatgory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
