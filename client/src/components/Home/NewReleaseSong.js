import React, { Fragment } from "react";
import { Loading } from "components";
import { Link } from "react-router-dom";
import { MusicPlayer } from "components";
const NewReleaseSong = ({ isLoading = true, newRelease = [] }) => (
  <div className="col-lg-12">
    <div className="iq-card ">
      <div className="iq-card-header d-flex justify-content-between">
        <div className="iq-header-title">
          <h4 className="card-title font-weight-normal ">Bài hát mới</h4>
        </div>
      </div>
      <div
        style={{
          height: isLoading ? "20vh" : "auto",
        }}
        className={`iq-card-body ${isLoading && `position-relative`} `}
      >
        {isLoading ? (
          <div className="search-loading-icon">
            <Loading />
          </div>
        ) : (
          <>
            <ul className="list-unstyled iq-music-slide mb-0">
              {newRelease?.length > 0 ? (
                newRelease.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <MusicPlayer song={item} />
                    </Fragment>
                  );
                })
              ) : (
                <li className="mb-3">
                  <div className="d-flex justify-content-center align-items-center row position-relative">
                    <div
                      style={{
                        paddingRight: "0px",
                      }}
                      className="media align-items-center "
                    >
                      <h5 className="mb-0 text-gray">No Song Found</h5>
                    </div>
                  </div>
                </li>
              )}
            </ul>
            <div className="d-flex justify-content-center align-items-center ">
              <Link
                to={"/music"}
                className="mb-0 text-primary home_footer_link p-3"
              >
                Xem Thêm <i className="las la-angle-right "></i>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);

export default React.memo(NewReleaseSong);
