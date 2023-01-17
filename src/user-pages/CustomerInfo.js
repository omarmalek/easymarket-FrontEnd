import React from "react";
import { useGlobalContext } from "../context";
import { Link, useNavigate } from "react-router-dom";

function CustomerInfo() {
  // let navigate = useNavigate();
  //const customerId = useParams();
  const {
    customer,
    sendOrder,
    updateCusomerInfo,
    clearCustomerInfo,
  } = useGlobalContext();

  return (
    <div className="customer-and-payment-info">
      <div className="customer-info" id="customer-info">
        <h1>بيانات الاتصال</h1>

        <form>
          <label htmlFor="">رقم الجوال</label>
          <input
            type="text"
            value={customer.phoneNumber}
            name="phoneNumber"
            onChange={updateCusomerInfo}
            required
          />

          <label htmlFor="">اسم المستخدم</label>
          <input
            type="text"
            value={customer.name}
            name="name"
            onChange={updateCusomerInfo}
          />
          <label>العنوان</label>
          <input
            type="text"
            value={customer.address}
            name="address"
            className="address"
            onChange={updateCusomerInfo}
          />
          <button onClick={clearCustomerInfo}>مسح البيانات</button>
        </form>
      </div>
      <div className="pay-info">
        <h1>بيانات الدفع</h1>
        <form>
          <label>طريقة الدفع </label>
          <select>
            <option>نقداً عند التسليم</option>
            <option>Credit Card </option>
            <option>محفظة جوال </option>
            <option>حساب بنك فلسطين </option>
          </select>
          <button onClick={sendOrder}>اتمام الطلب </button>
          <p>
            لرؤية تقدم الطلبية ولمشاهدة الطلبات السابقة وحماية بياناتك يمكنك
            تسجيل الدخول الى المنصة
            <span>
              <Link to="signup"> من هنا</Link>
            </span>
            .
          </p>
          <br></br>
          <button onClick={clearCustomerInfo}>مسح البيانات</button>
        </form>
      </div>
    </div>
  );
}
export default CustomerInfo;
