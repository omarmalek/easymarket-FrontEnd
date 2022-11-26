import React, { useEffect, useState } from "react";
import ExhibitionUpdateDelete from "./Exhibition-update-delete";
import HeaderControl from "./Header-Control";

function SearchResult() {
  const [resultOfSearch, setResultOfSearch] = useState([]);
  const [searchText, setSearchText] = useState("");

  // useEffect(()=>{},[])
  const searchThisText = (event) => {
    let str = event.target.value;
    setSearchText(str);
    let pageIndex = 0;
    let pageSize = 20;

    try {
      fetch(
        `http://localhost:8080/api/products/byname/${str}/${pageIndex}/${pageSize}`
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
          onChange={searchThisText}
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
