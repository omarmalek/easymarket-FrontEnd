import React, { useEffect, useState } from "react";
import ExhibitionUpdateDelete from "./Exhibition-update-delete";
import HeaderControl from "./Header-Control";

function SearchResult() {
  const [resultOfSearch, setResultOfSearch] = useState([]);
  const searchThisText = (str) => {
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
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <input type="text" onChange={searchThisText} />
      <ExhibitionUpdateDelete products={resultOfSearch} />
    </>
  );
}
export default SearchResult;
