import React from "react";
const Control = () => {
  return (
    <div className="control-component">
      <div className="control-header">
        <h1>Orders</h1>
        <i className="somelogo">
          <span>number of new orders</span>
        </i>
      </div>
      <table>
        <thead>
          <tr>
            <th>م</th>
            <th>رقم الطلبية</th>
            <th>اسم الزبون</th>
            <th>فئة الزبون</th>
            <th>بيان الطلبية</th>
            <th>مبلغ الطلبية</th>
            <th>العنوان</th>
            <th>وقت الطلب</th>
            <th>وقت التسليم</th>
            <th>طريقة الدفع</th>
            <th>عامل الديليفري</th>
            <th>فئة التوصيل</th>
            <th>تم التحضير</th>
            <th>تم التسليم</th>
            <th>تم الدفع</th>
            <th>ملغاة</th>
            <th>مرفوضة</th>
            <th>تقييم الزبون</th>
            <th>ملاحظات الكونترول</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};
export default Control;
