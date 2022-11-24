import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useGlobalContext } from "./context";
import { useParams } from "react-router-dom";

function CustomerHistory() {
  const { customerid } = useParams();

  const [customer, setCustomer] = useState({
    id: 0,
    name: "زبوننا الكريم",
    phoneNumber: "",
    address: "",
    exist: false,
  });

  const [customerOrders, setCustomerOrders] = useState([
    {
      id: 0,
      customerName: "no name",
      cartTotal: "0",
      date: "0",
      packed: false,
      sentDelivery: false,
      delivered: false,
      cancelled: false,
      rejected: false,
      delivaryServiceType: "0",
      orderCart: [
        {
          id: 0,
          productId: 0,
          productName: "",
          unitPrice: "0",
          productAmount: "0",
          packType: "",
        },
      ],
      customerId: 0,
      orderSetterId: 0,
      deliveryManId: 0,
      delivaryCharge: 0,
      paymentType: 0,
      customerEvaluation: "0",
      controlNotes: "0",
      customerPhone: 0,
      customerAddress: "0",
    },
  ]);
  const [customerOldOrders, setCustomerOldOrders] = useState([
    {
      id: "0",
      customerName: "no name",
      cartTotal: "0",
      date: "0",
      packed: false,
      sentDelivery: false,
      delivered: false,
      cancelled: false,
      rejected: false,
      delivaryServiceType: "0",
      orderCart: [
        {
          id: 0,
          productId: 0,
          productName: "",
          unitPrice: "0",
          productAmount: "0",
          packType: "",
        },
      ],
      customerId: 0,
      orderSetterId: 0,
      deliveryManId: 0,
      delivaryCharge: 0,
      paymentType: 0,
      customerEvaluation: "0",
      controlNotes: "0",
      customerPhone: 0,
      customerAddress: "0",
    },
  ]);
  const [currentOrder, setCurrentOrder] = useState({
    id: 0,
    customerName: "",
    cartTotal: "0",
    date: "0",
    packed: false,
    sentDelivery: false,
    delivered: false,
    cancelled: false,
    rejected: false,
    delivaryServiceType: "0",
    orderCart: [
      {
        id: 0,
        productId: 0,
        productName: "",
        unitPrice: "0",
        productAmount: "0",
        packType: "",
      },
    ],
    customerId: 0,
    orderSetterId: 0,
    deliveryManId: 0,
    delivaryCharge: 0,
    paymentType: 0,
    customerEvaluation: "0",
    controlNotes: "0",
    customerPhone: 0,
    customerAddress: "0",
  });
  const [lastOrder, setLastOrder] = useState({
    id: "0",
    customerName: "",
    cartTotal: "0",
    date: "0",
    packed: false,
    sentDelivery: false,
    delivered: false,
    cancelled: false,
    rejected: false,
    delivaryServiceType: "0",
    orderCart: [
      {
        id: 0,
        productId: 0,
        productName: "",
        unitPrice: "0",
        productAmount: "0",
        packType: "",
      },
    ],
    customerId: 0,
    orderSetterId: 0,
    deliveryManId: 0,
    delivaryCharge: 0,
    paymentType: 0,
    customerEvaluation: "0",
    controlNotes: "0",
    customerPhone: 0,
    customerAddress: "0",
  });

  // =============================================   useEffect   ===========================================
  useEffect(() => {
    if (customerid !== 0) {
      fetchCustomer(customerid);
    }
  }, []);

  useEffect(() => {
    if (customerid !== 0) {
      fetchCustomerOrders();
    }
  }, []);
  useEffect(() => {
    if (customerid !== 0) {
      fetchCustomerOldOrders();
    }
  }, []);
  useEffect(() => {
    if (customerOrders.length > 0)
      setCurrentOrder(customerOrders[customerOrders.length - 1]); //no use until now
  }, [customerOrders]);
  useEffect(() => {
    if (customerOrders.length > 0)
      setLastOrder(customerOrders[customerOrders.length - 1]);
  }, [customerOrders]);

  //  ============================================   fetch    ========================================
  const fetchCustomer = () => {
    try {
      fetch(`http://localhost:8080/api/customer/${customerid}`)
        .then((response) => response.json())
        .then((data) => {
          setCustomer(data);
        });
    } catch (error) {
      console.log("Error in fetchCatgories: " + error);
    }
  };
  const fetchCustomerOrders = () => {
    console.log("CustomerHistory says: >>>>>>> fetchCustomerOrders runs..... ");
    let pageIndex = 0;
    let pageSize = 10;
    // setLoading(true);
    try {
      fetch(
        `http://localhost:8080/api/customerorders/${customerid}/${pageIndex}/${pageSize}`
      )
        .then((response) => response.json())
        .then((data) => {
          setCustomerOrders(data);
        });
    } catch (error) {
      console.log("Error in fetchCatgories: " + error);
    }
  };
  const fetchCustomerOldOrders = () => {
    let pageIndex = 0;
    let pageSize = 10;

    try {
      fetch(
        `http://localhost:8080/api/customeroldorders/${customerid}/${pageIndex}/${pageSize}`
      )
        .then((response) => response.json())
        .then((data) => {
          setCustomerOldOrders(data);
        });
    } catch (error) {
      console.log("Error in fetchCatgories: " + error);
      // setLoading(false);
    }
  };
  //                                  ------- fetch Ends    -------
  return (
    <div className="customer-history-component">
      <Header />
      <br></br>
      <br></br>
      <h1>مرحبا {customer.name}</h1>
      <h2>قائمة الطلبات السابقة</h2>
      <table>
        <thead>
          <tr>
            <th>م</th>
            <th>رقم الطلبية</th>
            <th>مبلغ الطلبية</th>
            <th>وقت الطلب</th>
            <th>تم التحضير</th>
            <th> ارسل ديلفيري</th>
            <th>تم التوصيل</th>
            <th>ملغاة</th>
            <th>فئة التوصيل</th>
          </tr>
        </thead>
        <tbody>
          {customerOldOrders !== null &&
          customerOldOrders !== undefined &&
          customerOldOrders !== []
            ? customerOldOrders.map((order) => {
                const {
                  //here we will take just the important info
                  id,
                  customerId,
                  orderSetterId,
                  deliveryManId,
                  delivaryCharge,
                  cartTotal,
                  date,
                  paymentType,
                  delivaryServiceType,
                  packed,
                  sentDelivery,
                  delivered,
                  paid,
                  cancelled,
                  rejected,
                  customerEvaluation,
                  controlNotes,
                  customerName,
                  customerPhone,
                  customerAddress,
                } = order;

                return (
                  <>
                    <tr
                      key={id}
                      onClick={() => setCurrentOrder(order)}
                      className={currentOrder.id === id ? "current-order" : ""}
                    >
                      <td className="counter">
                        <span id="counter"></span>
                      </td>
                      <td>{id}</td>
                      <td>
                        {cartTotal} <i className="fa-solid fa-shekel-sign"></i>
                      </td>
                      <td>{date}</td>
                      <td className={packed ? "selected" : ""}>
                        {packed ? "yes" : "No"}
                      </td>
                      <td className={sentDelivery ? "selected" : ""}>
                        {sentDelivery ? "yes" : "No"}
                      </td>
                      <td className={delivered ? "selected" : ""}>
                        {delivered ? "yes" : "No"}
                      </td>
                      <td className={cancelled ? "selected" : ""}>
                        {cancelled ? "yes" : "No"}
                      </td>
                      <td>{delivaryServiceType}</td>
                    </tr>
                  </>
                );
              })
            : "no list to view"}
        </tbody>
      </table>
      {/* ----------------------------------------------------------------------------------- */}
      <h2>الطلبيات في الانتظار</h2>
      <table>
        <thead>
          <tr>
            <th>م</th>
            <th>رقم الطلبية</th>
            <th>مبلغ الطلبية</th>
            <th>وقت الطلب</th>
            <th>تم التحضير</th>
            <th> ارسل ديلفيري</th>
            <th>تم التوصيل</th>
            <th>ملغاة</th>
            <th>فئة التوصيل</th>
          </tr>
        </thead>
        <tbody>
          {customerOrders
            ? customerOrders.map((order) => {
                const {
                  //here we will take just the important info
                  id,
                  customerId,
                  orderSetterId,
                  deliveryManId,
                  delivaryCharge,
                  cartTotal,
                  date,
                  paymentType,
                  delivaryServiceType,
                  packed,
                  sentDelivery,
                  delivered,
                  paid,
                  cancelled,
                  rejected,
                  customerEvaluation,
                  controlNotes,
                  customerName,
                  customerPhone,
                  customerAddress,
                } = order;
                return (
                  <>
                    <tr
                      key={id}
                      onClick={() => setCurrentOrder(order)}
                      className={currentOrder.id === id ? "current-order" : ""}
                    >
                      <td className="counter">
                        <span id="counter"></span>
                      </td>
                      <td>{id}</td>
                      <td>
                        {cartTotal} <i className="fa-solid fa-shekel-sign"></i>
                      </td>
                      <td>{date}</td>
                      <td className={packed ? "selected" : ""}>
                        {packed ? "yes" : "No"}
                      </td>
                      <td className={sentDelivery ? "selected" : ""}>
                        {sentDelivery ? "yes" : "No"}
                      </td>
                      <td className={delivered ? "selected" : ""}>
                        {delivered ? "yes" : "No"}
                      </td>
                      <td className={cancelled ? "selected" : ""}>
                        {cancelled ? "yes" : "No"}
                      </td>

                      <td>{delivaryServiceType}</td>
                    </tr>
                  </>
                );
              })
            : "no list to view"}
        </tbody>
      </table>
      <div className="details">
        {/* -------------------------------------------------------------------------------------------- */}
        <h2>تفاصيل الطلبية الأخيرة</h2>
        <table className="table">
          <thead>
            <tr>
              <th>م</th>
              <th>الصنف</th>
              <th>الكمية</th>
              <th>السعر</th>
              <th>المجموع</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {lastOrder.orderCart.map((item, index) => {
              const {
                id,
                productId,
                productName,
                unitPrice,
                productAmount,
                packType,
              } = item;
              let sumOfRow = 0;
              sumOfRow = unitPrice * productAmount;
              sumOfRow = parseFloat(sumOfRow.toFixed(2));
              return (
                <tr key={id}>
                  <td className="counter">
                    <span id="counter"></span>
                  </td>
                  <td>{productName}</td>
                  <td>{productAmount + " " + packType}</td>
                  <td>
                    {unitPrice}
                    <span> شيقل</span>
                  </td>
                  <td>
                    {sumOfRow} <i className="fa-solid fa-shekel-sign"></i>
                  </td>
                  <td>
                    <button
                      className="remov-btn"
                      // onClick={() => deleteFromCart(product.productId)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p>الطلبية قيد الاحضار</p>
      <p> سيتم التسليم خلال:....</p>
      <p>معرف عامل الدييفري</p>
      <p>رقم هاتف الديليفري</p>
      <p>الغاء الطلبية</p>
      <p>
        (سيتم عدم تفعيل زر الغاء الطلبية في حال تم تسليمها الى عامل الديليفري){" "}
      </p>
      <p>تقييم الزبون</p>
      تصفير الكارت
    </div>
  );
}
export default CustomerHistory;
