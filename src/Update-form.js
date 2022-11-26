import { useEffect, useState } from "react";
import React from "react";
import { useGlobalContext } from "./context";
import { FaTimes } from "react-icons/fa";

function UpdateForm({ prodctToUpdate, setShowUpdateForm }) {
  const { catgories } = useGlobalContext();
  const [product, setProduct] = useState(prodctToUpdate);
  const [imgesFiles, setImgesFiles] = useState("abc");

  // useEffect(() => {
  //   if (product.imgesFiles) {
  //     setImgesFiles("data:image/jpeg;base64," + product.imgesFiles[0]);
  //   }
  // }, []);
  const closeForm = () => {
    setShowUpdateForm(false);
  };

  const updateProduct = (event) => {
    const { name, value } = event.target;
    setProduct((prdct) => {
      return { ...prdct, [name]: value };
    });
    // console.log("updating Product info: ");
    // console.log(product);

    // console.log("checking image : ");
    // console.log(imgesFiles);
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
    e.preventDefault();
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
          console.log("Files successfully uploaded!");
          console.log("data is: ");
          console.log(data);
        });
    } catch (error) {
      console.log("catch...................................");
      console.log(error);
    }
    setShowUpdateForm(false);
  };
  return (
    <div className="update-form-component">
      <button className="form-close" onClick={closeForm}>
        <FaTimes />
      </button>
      <h1>تعديل منتج</h1>
      <form>
        <div className="row">
          <div className="form-item id">
            <label>رقم المنتج</label>
            <input type="text" name="id" value={product.id} readOnly />
          </div>
        </div>
        <div className="row">
          <div className="form-item">
            <lable>اسم المنتج</lable>
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
              value={
                product.productImages[0] ? product.productImages[0].picType : ""
              }
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
          <button onClick={addProduct}> تعديل</button>
        </div>
      </form>
    </div>
  );
}
export default UpdateForm;
