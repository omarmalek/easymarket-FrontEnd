import React from "react";
import { useGlobalContext } from "../context";

import SingleProduct from "./SingleProduct";

// import stlyle from "./styles/";

function Exhibition() {
  const { productsOfCurrentCatgory, openCart } = useGlobalContext();

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
