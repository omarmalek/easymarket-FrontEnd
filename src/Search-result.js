import React, { useEffect, useState } from "react";
import { json } from "react-router-dom";
import ExhibitionUpdateDelete from "./Exhibition-update-delete";
import HeaderControl from "./Header-Control";

function SearchResult() {
  const [resultOfSearch, setResultOfSearch] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (localStorage.getItem("searchText")) {
      setSearchText(localStorage.getItem("searchText"));
      searchforProduct();
    }
  });

  const handlSearch = (e) => {
    let str = e.target.value;
    setSearchText(str);
    localStorage.setItem("searchText", str);
    searchforProduct();
  };

  const searchforProduct = () => {
    let pageIndex = 0;
    let pageSize = 20;

    try {
      fetch(
        `http://localhost:8080/api/products/byname/${searchText}/${pageIndex}/${pageSize}`
      )
        .then((response) => response.json())
        .then((data) => {
          setResultOfSearch(data);
        });
    } catch (error) {
      console.log(error);

      // setLoading(false);
    }
  };
  return (
    <>
      <HeaderControl />
      <div className="search-result-component">
        <lable>بحث عن المنتج:</lable>
        <input
          type="text"
          className="input-search"
          value={searchText}
          onChange={handlSearch}
        />
        {resultOfSearch ? (
          <ExhibitionUpdateDelete products={resultOfSearch} />
        ) : (
          <h4>لا توجد نتائج</h4>
        )}
      </div>
    </>
  );
}
export default SearchResult;
