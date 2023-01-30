import React, { useEffect, useState } from "react";
import Alert from "../Alert";
import ExhibitionUpdateDelete from "./Exhibition-update-delete";
import HeaderControl from "./Header-Control";

function SearchResult() {
  const [resultOfSearch, setResultOfSearch] = useState([]);
  const [searchText, setSearchText] = useState(
    localStorage.getItem("searchText")
  );
  const [alert, setAlert] = useState({ show: true, style: "", msg: "" });
  useEffect(() => {
    searchRef.current.focus();
  }, []);
  useEffect(() => {
    if (searchText) {
      searchforProduct(searchText);
    }
  }, []);
  const searchRef = React.useRef("");

  const handlSearch = (e) => {
    let str = e.target.value;
    setSearchText(str);
    localStorage.setItem("searchText", str);
    if (str.length > 0) {
      searchforProduct(str);
    }
  };
  const reSearch = () => {
    //searchforProduct(searchText);
    window.location.reload();
  };

  const searchforProduct = (string) => {
    showAlert("", "جاري البحث عن المنتج ...");
    let pageIndex = 0;
    let pageSize = 20;

    try {
      fetch(
        `http://localhost:8080/products/byname/${string}/${pageIndex}/${pageSize}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("admintoken"),
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            removeAlert();
            setResultOfSearch(data);
          } else {
            setResultOfSearch([]);
            showAlert("", "النتيجة غير متوفرة");
          }
        });
    } catch (error) {
      if (!error.response) {
        showAlert("", "الخادم لا يستجيب");
      } else if (error.response.status === 401) {
        showAlert("", "unauthorized!");
        console.log("unauthorized!");
      } else if (error.response.status === 403) {
        showAlert("", "forbidden!");
        console.log("forbidden!");
      }
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
            ref={searchRef}
            onChange={handlSearch}
          />
          <div className="alert">
            {alert.show && <Alert {...alert} removeAlert={removeAlert} />}
          </div>
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
