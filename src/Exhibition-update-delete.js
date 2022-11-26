import React from "react";
import { useGlobalContext } from "./context";
import SingleProduct from "./SingleProduct";
import SingleProductShortUpdateDelete from "./SingleProductShort-update-delete";

// import stlyle from "./styles/";

function ExhibitionUpdateDelete({ products }) {
  //const { productsOfSearchResult } = useGlobalContext();
  return (
    <div>
      <div className="ExhibitionUpdateDelete-component">
        {products && products !== undefined ? (
          products.map((product, index) => {
            return (
              <SingleProductShortUpdateDelete key={index} product={product} />
            );
          })
        ) : (
          <p>no catgory</p>
        )}
      </div>
    </div>
  );
}
export default ExhibitionUpdateDelete;
