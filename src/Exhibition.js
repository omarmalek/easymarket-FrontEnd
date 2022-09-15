import React from "react";
import { useGlobalContext } from "./context";
import SingleProduct from "./SingleProduct";
// import stlyle from "./styles/";

function Exhibition() {
  const { catgory } = useGlobalContext();
  return (
    <div className="exhibition-component ">
      {catgory && catgory !== undefined ? (
        catgory.contents.map((item, index) => {
          return <SingleProduct key={index} item={item} />;
        })
      ) : (
        <p>no catgory</p>
      )}
    </div>
  );
}
export default Exhibition;
