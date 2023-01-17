import React from "react";
import { useGlobalContext } from "../context";
import Loading from "../Loading";
import Pagination from "../Pagination";
import SingleProduct from "./SingleProduct";

function Exhibition() {
  const { loading, productsOfCurrentCatgory, openCart } = useGlobalContext();
  // const [loading, setLoading] = useState(false);

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
            return <SingleProduct key={product.id} product={product} />;
          })
        ) : (
          <p>no catgory</p>
        )}
      </div>
      <Pagination />
      <div>
        <button onClick={openCart}>تحضير الطلبية</button>
      </div>
    </div>
  );
}
export default Exhibition;
