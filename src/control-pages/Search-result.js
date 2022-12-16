import React, { useEffect, useState } from "react";
import Alert from "../Alert";
import ExhibitionUpdateDelete from "./Exhibition-update-delete";
import HeaderControl from "./Header-Control";

function SearchResult() {
  const [resultOfSearch, setResultOfSearch] = useState([]);
  const [searchText, setSearchText] = useState(
    localStorage.getItem("searchText")
  );
  const [alert, setAlert] = useState({ show: false, style: "", msg: "" });

  useEffect(() => {
    if (searchText) {
      searchforProduct(searchText);
    }
  }, []);

  const handlSearch = (e) => {
    let str = e.target.value;
    setSearchText(str);
    localStorage.setItem("searchText", str);
    if (str.length > 0) {
      searchforProduct(str);
    }
  };
  const reSearch = () => {
    searchforProduct(searchText);
  };

  const searchforProduct = (string) => {
    showAlert("", "جاري البحث عن المنتج ...");
    let pageIndex = 0;
    let pageSize = 20;

    try {
      fetch(
        `http://localhost:8080/api/products/byname/${string}/${pageIndex}/${pageSize}`
      )
        .then((response) => response.json())
        .then((data) => {
          removeAlert();
          setResultOfSearch(data);
        });
    } catch (error) {
      console.log(error);
      showAlert("", "حدث خطأ ما ...");
      // setLoading(false);
    }
  };
  const showAlert = (style, msg) => {
    setAlert({ show: true, style, msg }); //ES6
  };
  const removeAlert = () => {
    setAlert({ show: false, style: "", msg: "" });
  };
  return (
    <>
      <HeaderControl />
      <div className="search-result-component">
        <div className="search-bar">
          <lable>بحث عن المنتج:</lable>
          <input
            type="text"
            className="input-search"
            value={searchText}
            onChange={handlSearch}
          />
          <p className="alert">
            {alert.show && <Alert {...alert} removeAlert={removeAlert} />}
          </p>
        </div>
        {resultOfSearch ? (
          <ExhibitionUpdateDelete
            products={resultOfSearch}
            reSearch={reSearch}
          />
        ) : (
          <h4>لا توجد نتائج</h4>
        )}
      </div>
    </>
  );
}
export default SearchResult;
