import React from "react";
import { useGlobalContext } from "./context";

const OrderSetterDetails = () => {
  const { currentOrder } = useGlobalContext();
  const updateProductQuantity = () => {};
  console.log("OrderSetterDetails >>");
  console.log(currentOrder);
  const {
    id,
    customerId,
    orderSetterId,
    deliveryManId,
    delivaryCharge,
    cartTotal,
    date,
    paymentType,
    delivaryServiceType,
    isPacked,
    isDelivared,
    isPaid,
    isCancelled,
    isRejected,
    customerEvaluation,
    controlNotes,
    customerName,
    customerPhone,
    customerAddress,
  } = currentOrder;
  return (
    <div className="order-setter-details-component">
      <div className="order-setter-header">
        <h1>Orders Setter Details</h1>
        <i className="somelogo">
          <span>number of new orders</span>
        </i>
      </div>
      <div className="order-details" id="order-details">
        <form>
          <div className=" row1 row">
            <div className="form-item">
              <label htmlFor="">رقم الطلبية </label>
              <input type="text" value={id} readOnly />
            </div>
            <div className="form-item">
              <label htmlFor="">اسم الزبون</label>
              <input type="text" value={customerName} readOnly />
            </div>
            <div className="form-item">
              <label>مبلغ الطلبية </label>
              <input type="text" value={cartTotal} readOnly />
            </div>
            <div className="form-item">
              <label> وقت الطلب</label>
              <input type="text" value={date} readOnly />
            </div>
          </div>
          <div className=" row2 row">
            <div className="form-item">
              <label htmlFor=""> تم التحضير </label>
              <input type="text" value={isPacked ? "yes" : "No"} readOnly />
            </div>
            <div className="form-item">
              <label htmlFor=""> ارسلت ديليفري </label>
              <input type="text" value="unknown" readOnly />
            </div>
            <div className="form-item">
              <label htmlFor=""> تم التسليم</label>
              <input type="text" value={isDelivared ? "yes" : "No"} readOnly />
            </div>
            <div className="form-item">
              <label> ملغاة </label>
              <input type="text" value={isCancelled ? "yes" : "No"} readOnly />
            </div>
            <div className="form-item">
              <label> مرفوضة </label>
              <input type="text" value={isRejected ? "yes" : "No"} readOnly />
            </div>
          </div>
          <div className=" row3 row">
            <div className="form-item">
              <label> فئة التوصيل</label>
              <input type="text" value={delivaryServiceType} readOnly />
            </div>
            <div className="form-item">
              <label> الهاتف</label>
              <input type="text" value={customerPhone} readOnly />
            </div>
          </div>
          <div className=" row4 row">
            <div className="form-item">
              <label> العنوان</label>
              <input type="text" value={customerAddress} readOnly />
            </div>
          </div>

          <button> Update</button>
        </form>
      </div>

      <div className="order-cart">
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
            {currentOrder.orderCart.map((item, index) => {
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
    </div>
  );
};
export default OrderSetterDetails;
