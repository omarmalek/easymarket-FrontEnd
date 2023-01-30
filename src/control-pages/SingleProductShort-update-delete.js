import React, { useState } from "react";
import { useGlobalContext } from "../context";
import noProductImg from "../images/no product image.png";
// import { AiOutlineCheck } from "react-icons/ai";
import UpdateForm from "./Update-form";

const SingleProductShortUpdateDelete = ({ product, reSearch }) => {
  const { getQuantity } = useGlobalContext();

  const [showSecondaryInfo, setShowSecondaryInfo] = React.useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [prodctToUpdate, setProdctToUpdate] = useState({});
  // -------------------------------------------------------------------------------------
  const selectToUpdateProduct = (product, reSearch) => {
    setProdctToUpdate(product);
    setShowUpdateForm(true);
  };

  const {
    id,
    name,
    unitPrice,
    img,
    weight,
    country,
    desc,
    company,
    productImages,
    catgoryId,
  } = product;

  // console.log("--------------productImages---------------");
  // console.log(productImages);

  let image = "";
  if (!img) {
    if (productImages[0]) {
      image = "data:image/jpeg;base64," + productImages[0].picByte;
    }
  }
  let amount = 0;
  amount = getQuantity(id);
  // console.log("SingleProductShort component >> amount is: " + amount);
  const toggleInfoSecondry = () => {
    setShowSecondaryInfo(!showSecondaryInfo);
    window.addEventListener("scroll", function() {
      setShowSecondaryInfo(false);
    });
  };
  const deleteProduct = (id) => {
    var result = window.confirm("Want to delete?");
    if (result) {
      try {
        fetch(`http://localhost:8080/product/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("admintoken"),
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Deleted!");
          });
      } catch (error) {
        console.log("catch on Delete...................................");
        console.log(error);
      }
      window.location.reload();
    }
  };
  //console.log("SingleProductShort component >> running... ");
  return (
    <div key={id} className="single-product-update-delete-component row">
      <div
        className={amount > 0 ? "photo-and-basic choosen" : "photo-and-basic"}
      >
        <div className="img-container ">
          <img src={img || image || noProductImg} alt="product" />
          {/* <i class="fa-solid fa-award"></i> */}
          {/* <i class="fa-solid fa-badge-percent"></i> */}
        </div>
        <div className={"product-details row "}>
          <div className={amount > 0 ? "info incart " : "info"}>
            <div className="catid">
              <h4>{catgoryId}</h4>-<h4>{id}</h4>
            </div>

            <h2 className="info--name ">{name}</h2>
            <h3 className="info--price">
              {unitPrice} <i className="fa-solid fa-shekel-sign"></i>
            </h3>
            {weight && <h4 className="info--weight">الوزن : {weight}</h4>}
            <button
              className="btn extra-details-btn"
              onClick={toggleInfoSecondry}
            >
              التفاصيل
            </button>
          </div>
          <div className="control ">
            <button
              className="btn"
              onClick={() => selectToUpdateProduct(product)}
            >
              Update
            </button>
            <button className=" btn cancel" onClick={() => deleteProduct(id)}>
              Delete
            </button>
          </div>
        </div>
        <div
          className={
            showSecondaryInfo
              ? "info-secondary show-info-secondary"
              : "info-secondary"
          }
        >
          <button
            className="close-info-secondary fa fa-times"
            onClick={toggleInfoSecondry}
          ></button>
          {company && <h3 className="info--company">الشركة : {company}</h3>}
          {country && <p className="info--country">بلد المنشأ : {country}</p>}
          {desc && <p className="info--desc">الوصف : {desc}</p>}
        </div>
      </div>
      {showUpdateForm && (
        <UpdateForm
          prodctToUpdate={prodctToUpdate}
          setShowUpdateForm={setShowUpdateForm}
          reSearch={reSearch}
        />
      )}
    </div>
  );
};
export default SingleProductShortUpdateDelete;
