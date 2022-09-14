import React, { useState, useEffect, useContext } from "react";

const AppContext = React.createContext();

const catgories = [
  { id: "1", name: "Canned Food" },
  { id: "2", name: "غازية مشروبات" },
  { id: "3", name: "Dairy" },
];

const AppProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [catgory, setCatgory] = React.useState("");
  //  console.log(catgory);

  useEffect(() => {
    setCatgory("popular");
  }, []);

  const handleCatgory = (catgory) => {
    setCatgory(catgory);
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
        catgories,
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
