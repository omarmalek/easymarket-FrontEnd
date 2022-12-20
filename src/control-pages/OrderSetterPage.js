import React from "react";
import OrderView from "./order-view";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import PaginationControl from "./PaginationControl";

export default function OrderSetterPage() {
  const [loading, setLoading] = useState(true);
  const [setterOrders, setSetterOrders] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchSetterOrders();
  }, [page]);

  const fetchSetterOrders = async () => {
    let pageIndex = page - 1;
    let pageSize = 3;

    try {
      const response = await fetch(
        `http://localhost:8080/api/setterorders/${pageIndex}/${pageSize}`
      );
      const data = await response.json();
      setLoading(false);
      setSetterOrders(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const selectPage = (pageLabel) => {
    setPage(pageLabel);
  };
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const role = "setterEmployee";
  return (
    <div>
      <h1 className="page-title">موظف التجهيز</h1>
      <OrderView orders={setterOrders} role={role} />
      <PaginationControl page={page} selectPage={selectPage} />
    </div>
  );
}
