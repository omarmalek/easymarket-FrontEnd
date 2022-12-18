import React from "react";
import SingleProductShortUpdateDelete from "./SingleProductShort-update-delete";

// import stlyle from "./styles/";

function ExhibitionUpdateDelete({ products, reSearch }) {
  //const { productsOfSearchResult } = useGlobalContext();
  return (
    <div>
      <div className="ExhibitionUpdateDelete-component">
        {products && products !== undefined ? (
          products.map((product, index) => {
            return (
              <SingleProductShortUpdateDelete
                key={index}
                product={product}
                reSearch={reSearch}
              />
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
