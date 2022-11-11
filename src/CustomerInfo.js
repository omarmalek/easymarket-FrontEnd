import React from "react";
import { useGlobalContext } from "./context";

function CustomerInfo() {
  const { customer, sendOrder, updateCusomerInfo } = useGlobalContext();
  return (
    <div className="customer-and-payment-info">
      <div className="customer-info" id="customer-info">
        <h1>بيانات الزبون</h1>
        <form>
          <label>رقم الهاتف</label>
          <input
            type="phone"
            value={customer.phoneNumber}
            name="phoneNumber"
            onChange={updateCusomerInfo}
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
          <button>مسح البيانات</button>
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
          <button onClick={sendOrder}>طلب نهائي</button>
          <br></br>
          <button>مسح البيانات</button>
        </form>
      </div>
    </div>
  );
}
export default CustomerInfo;
