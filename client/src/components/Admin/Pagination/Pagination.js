import React, { memo, Fragment } from "react";

const Pagination = ({
  isLoading,
  dataTable,
  counts,
  limit,
  isHideStart,
  isHideEnd,
  currentPage,
  handleChangePage,
  arrPage,
  skip,
}) => {

  return (
    <div
      className={
        `${isLoading}` === "true"
          ? "d-none"
          : "row justify-content-between mt-3"
      }
    >
      {(dataTable === undefined  || dataTable === null || dataTable?.length === 0) ? (         
        <></>
      ) : (
        <Fragment>
          <div id="user-list-page-info" className="col-md-6">
            Showing {skip ? skip + 1 : 1} to {skip ? skip + dataTable?.length : dataTable?.length} of {counts} entries
          </div>
          <div className="col-md-6">
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end mb-0">
                {!isHideStart && (
                  <Fragment>
                    <li type="end" className="page-item">
                      <a
                        onClick={() => {
                         handleChangePage(1);
                        }}
                        className="page-link"
                      >{`<<<`}</a>
                    </li>
                    <li className="page-item ">
                      <a
                        className="page-link"
                        tabIndex="-1"
                        aria-disabled="true"
                        onClick={() => {
                          handleChangePage(+currentPage - 1);
                        }}
                      >
                        Previous
                      </a>
                    </li>
                  </Fragment>
                )}

                {arrPage?.map((item, index) => {
                  return (
                    <li
                      onClick={() => {
                        handleChangePage(item);
                      }}
                      key={index}
                      className={
                        +currentPage === +item
                          ? "page-item active"
                          : "page-item"
                      }
                    >
                      <a className="page-link">{item}</a>
                    </li>
                  );
                })}
                {!isHideEnd && (
                  <Fragment>
                    <li className="page-item">
                      <a
                        onClick={() => {
                          handleChangePage(+currentPage + 1);
                        }}
                        className="page-link"
                      >
                        Next
                      </a>
                    </li>
                    <li type="end" className="page-item">
                      <a
                        onClick={() => {
                            handleChangePage(Math.ceil(counts / limit));
                        }}
                        className="page-link"
                      >{`>>>`}</a>
                    </li>
                  </Fragment>
                )}
              </ul>
            </nav>
          </div>
        </Fragment>
      )
    }
    </div>
  );
};

export default memo(Pagination);
