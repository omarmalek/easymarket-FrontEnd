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
    searchValue.current.focus();
  }, []);
  useEffect(() => {
    if (searchText) {
      searchforProduct(searchText);
    }
  }, []);
  const searchValue = React.useRef("");

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
          if (data) {
            removeAlert();
            setResultOfSearch(data);
          } else {
            setResultOfSearch([]);
          }
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
          <label>بحث عن المنتج:</label>
          <input
            type="text"
            className="input-search"
            ref={searchValue}
            onChange={handlSearch}
          />
          <p className="alert">
            {alert.show && <Alert {...alert} removeAlert={removeAlert} />}
          </p>
        </div>
        {resultOfSearch.length > 0 ? (
          <ExhibitionUpdateDelete
            products={resultOfSearch}
            reSearch={reSearch}
          />
        ) : (
          <div className="">
            <h4>لا توجد نتائج</h4>
          </div>
        )}
      </div>
    </>
  );
}
export default SearchResult;
