import React from "react";
import { useGlobalContext } from "./context";
import cartLogo from "./images/cart.png";
import { FaTimes } from "react-icons/fa";
import { links, social } from "./data";
import CustomerInfo from "./CustomerInfo";

const Cart = () => {
  const {
    isCartOpen,
    closeCart,
    cart,
    deleteFromCart,
    emptyCart,
    cartTotal,
    cartCount,
    incProductQuantityInCart,
    decreasProductAmount,
    updateProductQuantity,
    showCustomerInfo,
    isCustomerInfoShown,
  } = useGlobalContext();
  const doNothing = () => {};
  return (
    <div className="cart-scroll">
      <aside className={isCartOpen ? "cart show-cart" : "cart "}>
        <div className="cart-header">
          <button className="cart-close" onClick={closeCart}>
            <FaTimes />
          </button>
          <h3>سلة المشتريات</h3>
          <i className="fa fa-cart-shopping cart-logo">
            <span>{cartCount > 0 ? cartCount : ""}</span>
          </i>
        </div>
        <div className="cart-body">
          <table className="table">
            <thead>
              <tr>
                <th>م</th>
                <th>الصنف</th>
                <th>السعر</th>
                <th className="amount-caption">الكمية</th>
                <th>المجموع</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => {
                let sumOfRow = product.unitPrice * product.amount;
                sumOfRow = parseFloat(sumOfRow.toFixed(2));

                return (
                  <tr key={product.id}>
                    <td className="counter">
                      <span id="counter"></span>
                    </td>
                    <td>{product.name}</td>
                    <td>
                      {product.unitPrice}
                      <span> شيقل</span>
                    </td>
                    <td>
                      <div className="amount under-btn ">
                        <button
                          onClick={() => incProductQuantityInCart(product)}
                        >
                          +
                        </button>
                        <input
                          type="text"
                          value={product.amount + " " + product.packType}
                          onChange={updateProductQuantity}
                        />

                        <button onClick={() => decreasProductAmount(product)}>
                          -
                        </button>
                      </div>
                      {/* <input
                      className="input-amount"
                      type="number"
                      value={product.amount}
                      min="1"
                      onChange={doNothing}
                    />
                    <span> {product.unitName}</span> */}
                    </td>
                    <td>
                      {sumOfRow} <i className="fa-solid fa-shekel-sign"></i>
                    </td>
                    <td>
                      <button
                        className="remov-btn"
                        onClick={() => deleteFromCart(product.id)}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="cart-summary">
            <span>المجموع</span>
            <input
              id="total"
              type="text"
              value={cartTotal}
              onChange={updateProductQuantity}
            />
            <span> شيكل</span>
            <div>
              <button id="empty-cart" onClick={emptyCart}>
                أفرغ السلة <i className="fas fa-trash"></i>
              </button>
              <br></br>
              <button id="empty-cart" onClick={showCustomerInfo}>
                <a href="#customer-info"> التالي</a>
              </button>
            </div>
          </div>
        </div>
        {isCustomerInfoShown && <CustomerInfo />}
        <p>الطلبية قيد الاحضار</p>
        <p> رقم الطلبية</p>
        <p>اجمالي الطلبية</p>
        <p> سيتم التسليم خلال:....</p>
        <p>بيان الطلبية</p>
        <p>معرف عامل الدييفري</p>
        <p>رقم هاتف الديليفري</p>
        <p>الغاء الطلبية</p>
        <p>
          (سيتم عدم تفعيل زر الغاء الطلبية في حال تم تسليمها الى عامل الديليفري){" "}
        </p>
        <p>تقييم الزبون</p>
        تصفير الكارت
      </aside>
    </div>
  );
};
export default Cart;
//go to this website -> https://fontawesome.com/icons/moped?s=solid&f=classic
