import react from "react";
import style from "./styles/single-product.css";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const SingleProduct = ({ item }) => {
  const { id, name, price, img } = item;
  return (
    <div key={id} className="single-product">
      <div className="img-container green-border">
        <img src={img} alt="product" />
      </div>
      <div className="product-details row">
        <div className="info col-6">
          <h3>{name}</h3>
          <h4>{price}</h4>
        </div>
        <div className="control col-4 red-border">
          <button className="btn ">Buy</button>
          <div className="under-btn">
            <button>
              <HiChevronDoubleLeft />
            </button>
            <input type="text" value="0" />
            <button>
              <HiChevronDoubleRight />
            </button>
            <img src="" alt="check" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleProduct;
