import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useParams, Link } from "react-router-dom";
import Loading from "../Loading";
import axios from "axios";
import { useGlobalContext } from "../context";

function CustomerHistory() {
  //const { customerid } = useParams();
  const { customer } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [userNotFound, setUserNotFound] = useState(false);

  const [customerOrders, setCustomerOrders] = useState([]);
  const [customerOldOrders, setCustomerOldOrders] = useState([]);
  const [lastOrder, setLastOrder] = useState({});
  // =============================================   useEffect   ===========================================
  // useEffect(() => {
  //   if (customer.id !== 0 && customer.id !== "0") {
  //     fetchCustomer(customer.id);
  //   } else {
  //     setUserNotFound(true);
  //   }
  // }, []);

  useEffect(() => {
    // if (!userNotFound) {
    fetchCustomerOrders();
    // }
  }, []);
  useEffect(() => {
    // if (!userNotFound) {
    fetchCustomerOldOrders();
    //  }
  }, []);

  useEffect(() => {
    if (customerOrders.length > 0)
      setLastOrder(customerOrders[customerOrders.length - 1]);
  }, [customerOrders]);

  //  ============================================   fetch    ========================================
  const fetchCustomer = async () => {
    //do we need that
    let url = `http://localhost:8080/customer/${customer.id}`;
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        withCredentials: true,
      });
      setLoading(false);
      if (response.data.name === "notFound") {
        //change this and redirect to login page
        setUserNotFound(true);
      }
    } catch (error) {
      console.log("Error in fetchCustomer: " + error);
      setLoading(false);
    }
  };
  const fetchCustomerOrders = async () => {
    setLoading(true);
    let pageIndex = 0;
    let pageSize = 10;
    const url = `http://localhost:8080/customerorders/${customer.id}/${pageIndex}/${pageSize}`;

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        withCredentials: true,
      });
      const data = await response.json();
      setLoading(false);
      setCustomerOrders(data);
      // console.log("customerorders");
      // console.log(data);
    } catch (error) {
      console.log("Error in fetchCustomerOrders: " + error);
      setLoading(false);
    }
  };
  const fetchCustomerOldOrders = async () => {
    let pageIndex = 0;
    let pageSize = 10;
    const url = `http://localhost:8080/customeroldorders/${customer.id}/${pageIndex}/${pageSize}`;

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        withCredentials: true,
      });
      setCustomerOldOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error in fetchCustomerOldOrders: " + error);
      setLoading(false);
    }
  };
  //                                  ------- fetch Ends    -------
  if (loading) {
    return <Loading />;
  }
  if (userNotFound) {
    return (
      <div>
        <h1>sorry ... No user with this id!</h1>
        <Link to="/">Go to main page.</Link>
      </div>
    );
  }
  return (
    <div>
      <Header />
      <br></br>
      <br></br>
      <div className="header">
        <h1 className="center">مرحبا {customer.name || "زبوننا الكريم"}</h1>
      </div>

      <div className="customer-history-component">
        {customerOldOrders.length > 0 ? (
          <div>
            <h2 className="center">قائمة الطلبات السابقة</h2>
            <table>
              <thead>
                <tr>
                  <th>م</th>
                  <th>رقم الطلبية</th>
                  <th>مبلغ الطلبية</th>
                  <th>اليوم</th>
                  <th>التاريخ</th>
                  <th>فئة التوصيل</th>
                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {customerOldOrders.map((order) => {
                  const {
                    id,
                    cartTotal,
                    date,
                    delivaryServiceType,
                    delivered,
                    cancelled,
                  } = order;

                  return (
                    <tr
                      key={id}
                      // onClick={() => setCurrentOrder(order)}
                      // className={currentOrder.id === id ? "current-order" : ""}
                    >
                      <td className="counter">
                        <span id="counter"></span>
                      </td>
                      <td>{id}</td>
                      <td>
                        {cartTotal} <i className="fa-solid fa-shekel-sign"></i>
                      </td>
                      <td></td>
                      <td>{date}</td>
                      <td>{delivaryServiceType}</td>
                      <td>
                        {!cancelled
                          ? delivered
                            ? "تمت"
                            : "Rejected"
                          : "قمت بإلغائها"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}
        <h2>الطلبيات في الانتظار</h2>
        {customerOrders.length > 0 ? (
          <div className="customer-order-section">
            <table>
              <thead>
                <tr>
                  <th>م</th>
                  <th>رقم الطلبية</th>
                  <th>مبلغ الطلبية</th>
                  <th> اليوم</th>
                  <th>وقت الطلب</th>
                  <th>التاريخ</th>
                  <th>فئة التوصيل</th>
                  <th>حالة الطلبية</th>
                </tr>
              </thead>
              <tbody>
                {customerOrders
                  ? customerOrders.map((order) => {
                      const {
                        id,
                        cartTotal,
                        date,
                        delivaryServiceType,
                        packed,
                        sentDelivery,
                      } = order;
                      return (
                        <tr
                          key={id}
                          // onClick={() => setCurrentOrder(order)}
                          // className={currentOrder.id === id ? "current-order" : ""}
                        >
                          <td className="counter">
                            <span id="counter"></span>
                          </td>
                          <td>{id}</td>
                          <td>
                            {cartTotal}{" "}
                            <i className="fa-solid fa-shekel-sign"></i>
                          </td>
                          <td></td>
                          <td>{date}</td>
                          <td></td>

                          <td>{delivaryServiceType}</td>
                          <td>
                            {!sentDelivery
                              ? packed
                                ? "تم تجهيز الطلبية"
                                : "في الانتظار"
                              : "تم ارسال الطلبية"}
                          </td>
                        </tr>
                      );
                    })
                  : "no list to view"}
              </tbody>
            </table>
            <div className="details">
              <h2>تفاصيل الطلبية الأخيرة</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>م</th>
                    <th>الصنف</th>
                    <th>الكمية</th>
                    <th>السعر</th>
                    <th>المجموع</th>
                  </tr>
                </thead>
                <tbody>
                  {lastOrder.orderCart &&
                    lastOrder.orderCart.map((item, index) => {
                      const {
                        id,
                        // productId,
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
                            {sumOfRow}{" "}
                            <i className="fa-solid fa-shekel-sign"></i>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="center"> "لا يوجد طلبيات في الانتظار"</p>
        )}
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
          (سيتم عدم تفعيل زر الغاء الطلبية في حال تم تسليمها الى عامل الديليفري)
        </p>
        <p>تقييم الزبون</p>
        تصفير الكارت
      </div>
    </div>
  );
}
export default CustomerHistory;
