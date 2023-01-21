import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { temp_catgories } from "./data";
import { temp_full_catgories } from "./data";

const AppContext = React.createContext();

const getCustomerLocalInfo = () => {
  if (localStorage.getItem("customerInfo")) {
    return JSON.parse(localStorage.getItem("customerInfo"));
  } else {
    return {
      id: 0,
      name: "",
      phoneNumber: "",
      address: "",
      exist: false,
    };
  }
};

const AppProvider = ({ children }) => {
  // let navigate = useNavigate();
  // ----------------------------   states     -------------------------------------
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [catgories, setCatgories] = useState(temp_catgories);
  const [isSearchBarshown, setIsSearchBarshown] = useState(false);
  const [isCustomerInfoShown, setIsCustomerInfoShown] = useState(false);
  // const [isNextBtnInCartShown, setIsNextBtnInCartShown] = useState(false);

  const [productsOfCurrentCatgory, setProductsOfCurrentCatgory] = useState([]);
  const [showNvbar, setshowNvbar] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [customer, setCustomer] = useState(getCustomerLocalInfo());
  const [page, setPage] = useState(1);
  const [currentCatId, setCurrentCatId] = useState(1);

  // ===============================================   Effect     =================================

  useEffect(() => {
    fetchCatgories();
  }, []);

  useEffect(() => {
    computCartTotal();
    computeCartCount();
  }, [cart]);

  useEffect(() => {
    // setProductsAternativly(1);
    fetchProductsOfCurrentCatgory(currentCatId, page);
  }, [page]);
  useEffect(() => {
    localStorage.setItem("customerInfo", JSON.stringify(customer));
  }, [customer]);

  //                                 ---     Effect     ---ends
  //-------------------------------------Fetch functions  --------------------------------
  const fetchCatgories = async () => {
    try {
      const response = await fetch("http://localhost:8080/catgories");
      const data = await response.json();
      setCatgories(data);
    } catch (error) {
      console.log("Error in fetchCatgories: " + error);
      setCatgories(temp_catgories);
      setLoading(false);
    }
  };
  const fetchProductsOfCurrentCatgory = async (catid) => {
    // setLoading(true);

    let pageIndex = page - 1;

    let pageSize = 9;

    try {
      const response = await fetch(
        `http://localhost:8080/products/bycatgory/${catid}/${pageIndex}/${pageSize}`
      );
      const data = await response.json();
      setLoading(false);
      setProductsOfCurrentCatgory(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setProductsAternativly(catid);
    }
  };

  const updateOrderFinal = (newUpdatedOrder) => {
    fetch("http://localhost:8080/admin/order", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUpdatedOrder),
    });
  };

  const fetchSearchResult = (str) => {
    let pageIndex = 0;
    let pageSize = 50;
    if (str.length > 0) {
      try {
        fetch(
          `http://localhost:8080/products/byname/${str}/${pageIndex}/${pageSize}`
        )
          .then((response) => response.json())
          .then((data) => {
            setProductsOfCurrentCatgory(data);
          });
      } catch (error) {
        console.log(error);
        // setLoading(false);
      }
    }
  };

  //                                       ------- Fetch functions --------ends
  // ------------------------------------------- Functions -----------------------------
  const updateCusomerInfo = (event) => {
    const { name, value } = event.target;
    setCustomer((cstmr) => {
      return { ...cstmr, [name]: value };
    });

    console.log("updating customer info: ");
    console.log(customer);
  };

  const choosCatgory = (catgoryId) => {
    setCurrentCatId(catgoryId);
    setPage(1);
    setProductsAternativly(catgoryId);
    setLoading(false);
    fetchProductsOfCurrentCatgory(catgoryId);
  };
  const selectPage = (pageLabel) => {
    setPage(pageLabel);
    // fetchProductsOfCurrentCatgory(currentCatId, pageLabel);
  };
  const openCart = () => {
    setIsCartOpen(true);
    closeSerchBar();
  };
  const closeCart = () => {
    setIsCartOpen(false);
  };
  const showSearchBar = () => {
    setIsSearchBarshown(!isSearchBarshown);
    setshowNvbar(false);
    closeCart();
  };
  const toggleNavbar = () => {
    setshowNvbar(!showNvbar);
    setIsSearchBarshown(false);
  };
  const closeSerchBar = () => {
    setIsSearchBarshown(false);
  };
  const setProductsAternativly = (id) => {
    const targetCatgory = temp_full_catgories.map((cat) => cat.id === id);
    setProductsOfCurrentCatgory(targetCatgory.contents);
  };

  const showCustomerInfo = () => {
    setIsCustomerInfoShown(true);
  };
  const showNextBtnInCart = () => {};

  const sendOrder = (e) => {
    e.preventDefault();
    let cartSummary = cart.map((product) => {
      return { productId: product.id, productAmount: product.amount };
    });
    const userOrder = {
      customerId: customer.id,
      customerName: customer.name,
      customerPhone: customer.phoneNumber,
      customerAddress: customer.address,
      cartTotal: cartTotal,
      paymentType: "Cash",
      delivaryServiceType: "Normal",
      orderCart: cartSummary, //I don't send the cart... I send this summary
    };
    try {
      fetch("http://localhost:8080/userorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userOrder),
      })
        .then((response) => response.json())
        .then((data) => {
          window.location.assign(`/`);
          // setCustomer({ ...customer, id: data.customerId }); //data is orderDTO
          //window.location.assign(`/customerhistory/${customer.id}`);
          // navigate(`/`);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // const updateAnyOrder = (orderTarget, orderId, property, value) => {}; // to be done

  const updateOrder = (order, property) => {
    let newUpdatedOrder = { ...order, [property]: true };
    updateOrderFinal(newUpdatedOrder);
  };
  // const checkIfUserExist = (e) => {
  //   //e.preventDefault();
  //   try {
  //     fetch(`http://localhost:8080/customerbyphone/${customer.phoneNumber}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setCustomer({ ...data, exist: true }); //include id and phone in case of new customer
  //       });
  //   } catch (error) {
  //     console.log(error);
  //     setCustomer({ ...customer, exist: false });
  //   }
  //   setIsCustomerInfoShown(true);
  // };
  const handleSearch = (e) => {
    let str = e.target.value;
    fetchSearchResult(str);
  };
  const clearCustomerInfo = (e) => {
    e.preventDefault();
    setCustomer({
      id: 0,
      name: "",
      phoneNumber: "",
      address: "",
      exist: false,
    });
  };

  //                                  -------------  Functions ---------Ends

  // ------------------------------------------- Calculating Cart Functions ---------------------------
  const incProductQuantityInCart = (product) => {
    let newCart = cart.map((item) => {
      //ma be I can use forEach insted of map
      if (item.id === product.id) {
        item.amount = item.amount + 1;
      }
      return item;
    });
    setCart(newCart);
  };
  const decreasProductAmount = (product) => {
    let newCart = cart
      .map((item) => {
        if (item.id === product.id) {
          item.amount = item.amount - 1;
        }
        return item;
      })
      .filter((item) => item.amount !== 0);
    setCart(newCart);
  };
  // const updateProductQuantity = () => {};
  const buyProduct = (product) => {
    if (inCart(product)) {
      console.log("product already in cart...!");
      incProductQuantityInCart(product);
    }
    if (!inCart(product)) {
      product.amount = 1;
      setCart((cart) => [...cart, product]);
    }
  };
  const inCart = (product) => {
    return cart.some((currentProduct) => currentProduct.id === product.id);
  };
  const getQuantity = (id) => {
    let quantity = 0;
    cart.map((product) => {
      if (product.id === id) {
        quantity = product.amount;
      }
      return 0;
    });
    return quantity;
  };
  const deleteFromCart = (id) => {
    let newCart = cart.filter((product) => product.id !== id);
    setCart(newCart);
  };
  const emptyCart = () => {
    setCart([]);
    setIsCustomerInfoShown(false);
  };
  const computCartTotal = () => {
    let total = cart.reduce(
      (total, product) => (total += product.unitPrice * product.amount),
      0
    );
    setCartTotal(total);
    // let total = 0;
    // cart.map((product) => {
    //   total += product.unitPrice * product.amount;
    //   total = parseFloat(total.toFixed(2));
    // });
  };
  const computeCartCount = () => {
    let count = 0;
    cart.map((product) => {
      count += product.amount;
      return count;
    });
    setCartCount(count);
  };
  //                                      --- Calculating Cart   ---ends

  return (
    <AppContext.Provider
      value={{
        loading,
        isCartOpen,
        openCart,
        closeCart,
        catgories,
        choosCatgory,
        isSearchBarshown,
        showSearchBar,
        closeSerchBar,
        showNvbar,
        toggleNavbar,
        // updateProductQuantity,
        cart,
        buyProduct,
        incProductQuantityInCart,
        decreasProductAmount,
        getQuantity,
        deleteFromCart,
        emptyCart,
        cartTotal,
        cartCount,
        showCustomerInfo,
        isCustomerInfoShown,
        showNextBtnInCart,
        productsOfCurrentCatgory,
        customer,
        setCustomer,
        clearCustomerInfo,
        sendOrder,
        updateCusomerInfo,

        updateOrder,
        // checkIfUserExist,
        handleSearch,
        selectPage,
        page,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
//custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
//note: to send sms message to the customer by form
