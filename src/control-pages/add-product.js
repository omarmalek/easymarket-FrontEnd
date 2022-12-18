import React, { useState } from "react";
import { useGlobalContext } from "../context";
import HeaderControl from "./Header-Control";

function AddProduct() {
  const { catgories } = useGlobalContext();
  const [imgesFiles, setImgesFiles] = useState("");
  const [product, setProduct] = useState({
    id: 0,
    catgoryId: "",
    name: "",
    unitPrice: 0,
    backagePrice: "",
    packtype: "",
    numberOfPieces: "",
    img: "",
    avilable: "",
    weight: "",
    company: "",
    country: "",
    desc: "",
    barcode: "",
    storeLocation: "",
    supplayerId: "",
    dateOfProduct: "",
    dateOfExpery: "",
    periodOfValidity: "",
  });

  const updateProduct = (event) => {
    const { name, value } = event.target;
    setProduct((pdct) => {
      return { ...pdct, [name]: value };
    });
    console.log("updating Product info: ");
    console.log(product);
  };
  const updateProductImage = (event) => {
    setImgesFiles(event.target.files[0]); //I used the first picture only
    //if I want to use mutipel photos is use:...
    // const imgArray = event.target.files;
    // for (var i = 0; i < imgArray.length; i++) {
    //   formData.append("imgesFile", file[i].file, file[i].name);
    // }
    // setImgesFile(imgArray);
  };
  const addProduct = (e) => {
    //e.preventDefault();

    var formData = new FormData();
    formData.append("imgesFiles", imgesFiles);
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );
    try {
      fetch("http://localhost:8080/api/productmedia", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data from fetch is: ");
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  console.log("product is >>  >>  >>");
  console.log(product);
  return (
    <>
      <HeaderControl />
      <div className="add-product-component">
        <br></br>
        <br></br>

        <h1>اضافة منتج</h1>
        <form>
          <div className="row">
            <div className="form-item id">
              <label>رقم المنتج</label>
              <input type="text" name="id" value={product.id} readOnly />
            </div>
          </div>
          <div className="row">
            <div className="form-item">
              <label>اسم المنتج</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={updateProduct}
              />
            </div>
            <div className="form-item">
              <label>السعر</label>
              <input
                type="text"
                name="unitPrice"
                value={product.unitPrice}
                onChange={updateProduct}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-item">
              <label>التصنيف</label>
              <select
                name="catgoryId"
                className="select-class"
                onChange={updateProduct}
              >
                <option value="0">اختر التصنيف</option>
                {catgories && catgories !== undefined
                  ? catgories.map((cat, index) => {
                      return (
                        <option key={index} value={cat.id}>
                          {cat.name}
                        </option>
                      );
                    })
                  : "No Cargory"}
              </select>
            </div>
            <div className="form-item">
              <label>شكل العبوة</label>
              <input
                type="text"
                name="packtype"
                value={product.packtype}
                onChange={updateProduct}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-item">
              <label> الوزن</label>
              <input
                type="text"
                name="weight"
                value={product.weight}
                onChange={updateProduct}
              />
            </div>
            <div className="form-item">
              <label>الشركة المصنعة</label>
              <input
                type="text"
                name="company"
                value={product.company}
                onChange={updateProduct}
              />
            </div>
            <div className="form-item">
              <label>دولة المنشأ</label>
              <input
                type="text"
                name="country"
                value={product.country}
                onChange={updateProduct}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-item">
              <label>رابط الصورة</label>
              <input
                type="text"
                name="img"
                value={product.img}
                onChange={updateProduct}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-item">
              <label>الصورة</label>
              <input
                type="file"
                //value={product.img}
                onChange={updateProductImage}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-item">
              <label>وصف المنتج</label>
              <input
                type="text"
                name="desc"
                value={product.desc}
                onChange={updateProduct}
              />
            </div>
          </div>
          <div className="control-btns">
            <button onClick={addProduct}>إدخال منتج</button>
            <button>مسح الحقول</button>
          </div>
        </form>
      </div>
    </>
  );
}
export default AddProduct;
