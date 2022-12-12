import React, { useState } from "react";
import { useGlobalContext } from "../context";
import Loading from "../Loading";
import SingleProduct from "./SingleProduct";

function Exhibition() {
  const { productsOfCurrentCatgory, openCart } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <div className="exhibition-component">
        {productsOfCurrentCatgory && productsOfCurrentCatgory !== undefined ? (
          productsOfCurrentCatgory.map((product, index) => {
            return <SingleProduct key={index} product={product} />;
          })
        ) : (
          <p>no catgory</p>
        )}
      </div>
      <div>
        <div>
          <button onClick={openCart}>تحضير الطلبية</button>
        </div>
      </div>
    </div>
  );
}
export default Exhibition;
