import React from "react";
import { useGlobalContext } from "../context";

function PhoneBox() {
  const {
    customer,
    sendOrder,
    updateCusomerInfo,
    checkIfUserExist,
  } = useGlobalContext();
  return (
    <div className="phone-box-component" id="phone-box">
      <h1>بيانات الزبون</h1>

      <form>
        <label htmlFor="">رقم الجوال</label>
        <input
          type="text"
          value={customer.phoneNumber}
          name="phoneNumber"
          onChange={updateCusomerInfo}
        />

        <button onClick={checkIfUserExist}>
          <a href="#customer-info"> موافق</a>
        </button>
      </form>
    </div>
  );
}
export default PhoneBox;
