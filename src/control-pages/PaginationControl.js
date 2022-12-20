import React, { useEffect, useState } from "react";

function PaginationControl({ page, selectPage }) {
  const [pageListIcons, setPageListIcon] = useState([]);
  useEffect(() => {
    if (page <= 3) {
      setPageListIcon([1, 2, 3, 4, 5]);
    }
    if (page > 3) {
      const center = page;
      setPageListIcon([center - 2, center - 1, center, center + 1, center + 2]);
    }
  }, [page]);
  const getNextPage = () => {
    selectPage(page + 1);
  };
  const getPrevPage = () => {
    if (page > 1) selectPage(page - 1);
  };
  const asignPage = (label) => {
    // let selectedPage = parseInt(e.target.value);
    selectPage(label);
  };
  return (
    <div className="container">
      <div className="pagination">
        <button onClick={getPrevPage}>&laquo; السابق</button>
        {pageListIcons.map((label) => {
          return (
            <button
              key={label}
              className={label === page ? "active" : ""}
              onClick={() => asignPage(label)}
            >
              {label}
            </button>
          );
        })}

        <button onClick={getNextPage}>التالي &raquo;</button>
      </div>
    </div>
  );
}

export default PaginationControl;
