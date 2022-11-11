import React, { useState, useEffect, useContext } from "react";

//for testing...
// import { catgories } from "./catgories-data";

import { tempCart } from "./tempCart";
import { ordersData } from "./orders-data";
import e from "cors";

const AppContext = React.createContext();
//const customer = { name: "primary abc" };
const AppProvider = ({ children }) => {
  // ----------------------------   states     -------------------------------------
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [catgories, setCatgories] = useState([]);
  const [isSearchBarshown, setIsSearchBarshown] = useState(false);
  const [isCustomerInfoShown, setIsCustomerInfoShown] = useState(false);
  const [isNextBtnInCartShown, setIsNextBtnInCartShown] = useState(false);

  const [productsOfCurrentCatgory, setProductsOfCurrentCatgory] = useState([]);
  const [showNvbar, setshowNvbar] = useState(false);
  const [cart, setCart] = useState(tempCart);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [customer, setCustomer] = useState({
    name: "",
    phoneNumber: "",
    address: "",
  });
  const [userOrders, setUserOrders] = useState([]);
  // const [userOrder, setUserOrder] = useState({
  //   customerId: "",
  //   cartTotal: "",
  //   paymentType: "",
  //   DelivaryServiceType: "",
  //   orderCart: [{ productId: "", productAmount: "" }],
  // });

  // ----------------------------   states for app2    -------------------------------------
  const [orders, setOreders] = useState([]); // well be deleted
  const [controlOrders, setControlOrders] = useState([
    {
      id: "",
      customerId: "",
      orderSetterId: "",
      deliveryManId: "",
      delivaryCharge: "",
      OrderCart: [],
      cartTotal: "",
      date: "",
      paymentType: "",
      delivaryServiceType: "",
      isPacked: "",
      isDelivared: "",
      isPaid: "",
      isCancelled: "",
      isRejected: "",
      customerEvaluation: "",
      controlNotes: "",
      customerName: "",
      customerPhone: "",
      customerAddress: "",
    },
  ]);

  const [currentOrder, setCurrentOrder] = useState({
    id: "",
    customerName: "",
    cartTotal: "",
    date: "",
    isPacked: "",
    isDelivared: "",
    isCancelled: "",
    isRejected: "",
    delivaryServiceType: "",
    orderCart: [],
  });

  // ----------------------------   Effect     ----------------------------------------

  useEffect(() => {
    console.log("useEffect runs >> on intial [] to run fetchCatgories()");
    fetchCatgories();
  }, []);

  useEffect(() => {
    console.log("useEffect runs >> on change of [cart] ");
    computCartTotal();
    computeCartCount();
  }, [cart]);

  useEffect(() => {
    console.log(
      "useEffect runs >> on intial [] to run fetchProductsOfCurrentCatgory()"
    );
    fetchProductsOfCurrentCatgory(1);
  }, []);
  // useEffect(() => {
  //   console.log("useEffect runs >> on intial [] to run fetchOrders()");
  //   fetchOrders();
  // }, []);
  useEffect(() => {
    console.log("useEffect runs >> on intial [] to run fetchControlOrders()");
    fetchControlOrders();
    console.log("controlOrders is: ");
    console.log(controlOrders);
  }, []);

  // ----------------------------   Effect     ------------------------- Ends
  // --------------------------- fetch functions  -------------------
  const fetchCatgories = () => {
    // setLoading(true);
    try {
      let list = fetch("http://localhost:8080/api/catgories")
        .then((response) => response.json())
        .then((data) => setCatgories(data));
    } catch (error) {
      console.log("Error in fetchCatgories: " + error);
      // setLoading(false);
    }
  };

  const fetchProductsOfCurrentCatgory = (catid) => {
    // setLoading(true);
    console.log(
      "fetchProductsOfCurrentCatgory >> currentCatgoryId is: " + catid
    );
    let pageIndex = 0;
    let pageSize = 10;

    try {
      fetch(
        `http://localhost:8080/api/products/bycatgory/${catid}/${pageIndex}/${pageSize}`
      )
        .then((response) => response.json())
        .then((data) => {
          setProductsOfCurrentCatgory(data);
        });
    } catch (error) {
      console.log(error);
      // setLoading(false);
    }
  };

  const fetchControlOrders = () => {
    let pageIndex = 0;
    let pageSize = 10;

    try {
      fetch(`http://localhost:8080/api/controlorders/${pageIndex}/${pageSize}`)
        .then((response) => response.json())
        .then((data) => {
          setControlOrders(data);
        });
    } catch (error) {
      console.log(error);
      // setLoading(false);
    }
  };

  // --------------------------- Fetch functions ---------------Ends
  // ---------------------------  Functions-------------------
  const choosCatgory = (catgoryId) => {
    console.log("choosCatgory>> catgoryId  is:" + catgoryId);
    //console.log("choosCatgory>> All catgories  are:" + catgories);

    fetchProductsOfCurrentCatgory(catgoryId);
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
    cart.map((item) => {
      //ma be I can use forEach insted of map
      if (item.id === product.id) {
        if (item.amount > 0) item.amount = item.amount - 1;
      }
      return item;
    });
    let newCart = cart.filter((item) => {
      return item.amount !== 0;
    });
    setCart(newCart);
  };

  const updateProductQuantity = () => {};

  const buyProduct = (product) => {
    console.log("bayProduct function >> product is: ");
    console.log(product);
    if (inCart(product)) {
      console.log("product already in cart...!");
      incProductQuantityInCart(product);
    }
    if (!inCart(product)) {
      // console.log("context >> buyProduct >> buying new product: " + product);
      product.amount = 1;
      setCart((cart) => [...cart, product]);
    }
    // console.log("bayProduct function >> cart is: " + cart);
  };
  const inCart = (product) => {
    return cart.some((currentProduct) => currentProduct.id === product.id);
  };
  const getQuantity = (id) => {
    let quantity = 0;
    cart.map((product) => {
      // console.log("context >> product.amount: " + product.amount);
      if (product.id === id) {
        quantity = product.amount;
      }
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
    let total = 0;
    cart.map((product) => {
      total += product.unitPrice * product.amount;
    });
    setCartTotal(total);
  };
  const computeCartCount = () => {
    // let count = cart ? cart.length : 0;
    setCartCount(cart.length);
  };
  const showCustomerInfo = () => {
    setIsCustomerInfoShown(true);
  };
  const showNextBtnInCart = () => {};
  const showOrderDetails = (id) => {
    setCurrentOrder(controlOrders.find((order) => order.id === id));
  };
  const sendOrder = () => {
    console.log("starting sendOrder() -------->   -------->  ------->");
    let cartSummary = cart.map((product) => {
      return { productId: product.id, productAmount: product.amount };
    });

    const userOrder = {
      customerName: customer.name,
      customerPhone: customer.phoneNumber,
      customerAddress: customer.address,
      cartTotal: cartTotal,
      paymentType: "abc",
      delivaryServiceType: "abc",
      orderCart: cartSummary, //I dont send the cart... I send this summary
    };

    fetch("http://localhost:8080/api/userorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userOrder),
    });
  };
  const updateCusomerInfo = (event) => {
    const { name, value } = event.target;
    setCustomer((cstmr) => {
      return { ...cstmr, [name]: value };
    });
    console.log("updating customer info: ");
    console.log(customer);
  };

  // ---------------------------  Functions------------------- Ends
  return (
    <AppContext.Provider
      value={{
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
        updateProductQuantity,
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
        orders,
        currentOrder,
        showOrderDetails,
        productsOfCurrentCatgory,
        customer,
        sendOrder,
        updateCusomerInfo,
        controlOrders,
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
// const getProduct = (id) => {
//   let targetList = catgories.map((subCat) => {
//     return subCat.contents.find((product) => product.id === id);
//   });
//   return targetList[0];
// };
