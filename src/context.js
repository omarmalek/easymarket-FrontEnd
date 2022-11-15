import React, { useState, useEffect, useContext } from "react";
//for testing...
// import { catgories } from "./catgories-data";
import { tempCart } from "./tempCart";
import { ordersData } from "./orders-data";
import e from "cors";

const AppContext = React.createContext();

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

  // ----------------------------   states for app2    -------------------------------------

  const [controlOrders, setControlOrders] = useState([
    {
      id: "0",
      customerId: "0",
      orderSetterId: "0",
      deliveryManId: "0",
      delivaryCharge: "0",
      OrderCart: [{}],
      cartTotal: "0",
      date: "0",
      paymentType: "0",
      delivaryServiceType: "0",
      packed: "0",
      sentDelivery: "0",
      delivered: "0",
      paid: "0",
      cancelled: "0",
      rejected: "0",
      customerEvaluation: "0",
      controlNotes: "0",
      customerName: "0",
      customerPhone: "0",
      customerAddress: "0",
    },
  ]);
  const [setterOrders, setSetterOrders] = useState([
    {
      id: "0",
      customerId: "0",
      orderSetterId: "0",
      deliveryManId: "0",
      delivaryCharge: "0",
      OrderCart: [{}],
      cartTotal: "0",
      date: "0",
      paymentType: "0",
      delivaryServiceType: "0",
      packed: "0",
      sentDelivery: "0",
      delivered: "0",
      paid: "0",
      cancelled: "0",
      rejected: "0",
      customerEvaluation: "0",
      controlNotes: "0",
      customerName: "0",
      customerPhone: "0",
      customerAddress: "0",
    },
  ]);

  const [controlOldOrders, setControlOldOrders] = useState([
    {
      id: "0",
      customerId: "0",
      orderSetterId: "0",
      deliveryManId: "0",
      delivaryCharge: "0",
      OrderCart: [{}],
      cartTotal: "0",
      date: "0",
      paymentType: "0",
      delivaryServiceType: "0",
      packed: "0",
      sentDelivery: "0",
      delivered: "0",
      paid: "0",
      cancelled: "0",
      rejected: "0",
      customerEvaluation: "0",
      controlNotes: "0",
      customerName: "0",
      customerPhone: "0",
      customerAddress: "0",
    },
  ]);
  // ----------------------------   Effect     ----------------------------------------

  useEffect(() => {
    fetchCatgories();
  }, []);

  useEffect(() => {
    computCartTotal();
    computeCartCount();
  }, [cart]);

  useEffect(() => {
    console.log();
    fetchProductsOfCurrentCatgory(1);
  }, []);
  useEffect(() => {
    fetchControlOrders();
  }, []);
  useEffect(() => {
    fetchSetterOrders();
  }, []);

  useEffect(() => {
    fetchControlOldOrders();
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
  const fetchControlOldOrders = () => {
    let pageIndex = 0;
    let pageSize = 10;

    try {
      fetch(
        `http://localhost:8080/api/controloldorders/${pageIndex}/${pageSize}`
      )
        .then((response) => response.json())
        .then((data) => {
          setControlOldOrders(data);
        });
    } catch (error) {
      console.log(error);
      // setLoading(false);
    }
  };
  const updateOrderFinal = (newUpdatedOrder) => {
    console.log("updatine order run..............");
    fetch("http://localhost:8080/api/order", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUpdatedOrder),
    });
  };
  const fetchSetterOrders = () => {
    let pageIndex = 0;
    let pageSize = 10;

    try {
      fetch(`http://localhost:8080/api/setterorders/${pageIndex}/${pageSize}`)
        .then((response) => response.json())
        .then((data) => {
          setSetterOrders(data);
        });
    } catch (error) {
      console.log(error);
      // setLoading(false);
    }
  };
  // ------------------------------------------------- Fetch functions ---------------Ends
  // ------------------------------------------------  Functions-------------------
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

  const updateAnyOrder = (orderTarget, orderId, property, value) => {}; // to be done

  const updateOrder = (order, property) => {
    let newUpdatedOrder = { ...order, [property]: true };
    updateOrderFinal(newUpdatedOrder);
  };
  // ---------------------------  Functions--------------------------------------------------------- Ends
  // ---------------------------  Functions--------------------------------------------------------- Ends
  // ---------------------------  Functions--------------------------------------------------------- Ends
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
        productsOfCurrentCatgory,
        customer,
        sendOrder,
        updateCusomerInfo,
        controlOrders,
        setterOrders,
        controlOldOrders,
        updateOrder,
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
//note: to send sms message to the customer by form
