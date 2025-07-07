import React, { Fragment, useEffect, useRef, useState } from "react";
import {Loading, Search} from "components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiGetAllSfxCategories } from "../../apis";
const SFXCategory = () => {
  const dispatch = useDispatch();

  const [isLoading, setisLoading] = useState(true);
  const navigate = useNavigate();
  const SfxCategoryPage = useRef(null);
  const [sfxCategories, setSfxCategories] = useState([]);
  const handleClick = (cate) => {
    navigate(`/sfx/categories/${cate.slug}`);
  };
 
  useEffect(() => {
    SfxCategoryPage.current.scrollIntoView({ behavior: "smooth" ,block: "start",});
    const getAllSFXCategory = async () => {
      try {
        const response = await apiGetAllSfxCategories("","","","");
        const data = response.data.data;
        setSfxCategories(data);
        setisLoading(false);
      }
      catch (error) {
      }
    }
    getAllSFXCategory();
  }, []);

  return (
    <Fragment>
      <div ref={SfxCategoryPage} id="content-page" className="content-page">
        <div className="container-fluid">
          <div className="row">
            
              <Fragment>
                <Search />
                <div className="col-lg-12">
                  <div className="iq-card">
                    <div className="iq-card-header d-flex justify-content-between">
                      <div className="iq-header-title">
                        <h4 className="card-title font-weight-normal">Hiệu ứng âm thanh</h4>
                      </div>
                    </div>
                    <div style={
                    `${isLoading}` === "true"
                      ? { height: "300px" }
                      : { height: "auto" }
                  } className="iq-card-body">
                      {isLoading ? (
                      <div
                        style={{
                          position: "absolute",
                          top: "38%",
                          left: "48%",
                        }}
                      >
                        {" "}
                        <Loading />
                      </div>
                    ) : (
                      <ul className="list-unstyled row iq-box-hover mb-0">
                        {sfxCategories.map((item, index) => (
                          <li
                            key={index}
                            className="col-xl-2 col-lg-3 col-md-4 iq-music-box"
                          >
                            <div className="iq-card">
                              <div className="iq-card-body p-0">
                                <div onClick={() => handleClick(item)} className="iq-thumb">
                                  <div className="iq-music-overlay"></div>
                                  <a >
                                    <video
                                      style={{
                                        // minHeight: "240px",
                                        height: "100%",
                                        objectFit: "contain",
                                      }}
                                      src={item?.video_thumnail}
                                      className="img-border-radius img-fluid w-100"
                                      alt="SFX"
                                      autoPlay
                                      loop
                                      muted
                                    />
                                  </a>
                                  <div className="overlay-music-icon">
                                    <a >
                                      <i className="las la-play-circle"></i>
                                    </a>
                                  </div>
                                </div>
                                <div className="feature-list text-center">
                                  <h6 className="font-weight-600 mb-0">
                                    {item?.title}
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                    </div>
                  </div>
                </div>
              </Fragment>
       
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SFXCategory;
