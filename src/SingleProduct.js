import react from "react";

import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
// import { AiOutlineCheck } from "react-icons/ai";

const SingleProduct = ({ item }) => {
  const { id, name, price, img, weight, country, desc, company } = item;
  return (
    <div key={id} className="single-product ">
      <div className="img-container ">
        <img src={img} alt="product" />
        <i class="fa-solid fa-award"></i>
        <i class="fa-solid fa-badge-percent"></i>
      </div>
      <div className="product-details row ">
        <div className="info  ">
          <h2 className="info--name ">{name}</h2>
          <h3 className="info--price">
            {price} <i class="fa-solid fa-shekel-sign"></i>
          </h3>
          {weight && <h4 className="info--weight">الوزن : {weight} غرام </h4>}
        </div>
        <div className="control ">
          <button className="btn">Buy</button>
          <div className="under-btn ">
            <button>-</button>
            <input type="text" value="0" />
            <button>+</button>
          </div>
        </div>
      </div>
      <div className="info-secondary">
        {company && <h3 className="info--company">الشركة : {company}</h3>}
        {country && <p className="info--country">بلد المنشأ : {country}</p>}
        {desc && <p className="info--desc">الوصف : {desc}</p>}
      </div>
    </div>
  );
};
export default SingleProduct;
