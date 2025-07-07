import React, { Fragment, useEffect, useState } from "react";
import { apiGetAllSfxCategory, apiSearchSfxByTitle } from "apis/sfx";
import Select from "react-select";
import moment from "moment";
import { SfxPlayer } from "components";
import { useSearchParams } from "react-router-dom";
const SearchSfx = () => {
  const [params] = useSearchParams();
  const keyword = params.get("keyword") || "";
  const [isLoading, setisLoading] = useState(true);
  const [currentDuration, setCurrentDuration] = useState();
  const [sfx, setSfx] = useState([]);
  const [sfxCate, setSfxCate] = useState([]);
  const FetchGetAllSfxCategory = async () => {
    const response = await apiGetAllSfxCategory();
    const data = response.data.data.map((item) => {
      return {
        value: item._id,
        label: item.title,
      };
    });
    setSfxCate(data);
    setisLoading(false);
  };
  //copyrightStatus
  useEffect(() => {
    setisLoading(true);
    FetchGetAllSfxCategory();
  }, []);

  useEffect(() => {
    if (keyword) {
      setisLoading(true);
      const sfxTitle = keyword.replaceAll(" ", "-").toLowerCase();
      apiSearchSfxByTitle(sfxTitle).then((response) => {
        setSfx(response.data.data);
        setisLoading(false);
      });
    }
  }, [keyword]);
  return (
  
          <div className="col-lg-12">
            <div className="iq-card">
              <div className="row pt-3 pb-2 pl-3 d-flex justify-content-center ">
                <div className="col-lg-3 ">
                  <div>
                    <label htmlFor="customRange1">Category</label>
                    <Select
                      isClearable={true}
                      disabled={sfxCate.length === 0}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          background: "transparent",
                          border: "1px solid #e3e6f0",
                          boxShadow: "none",
                          "&:hover": {
                            border: "1px solid #e3e6f0",
                          },
                        }),
                        zIndex: 9999,
                      }}
                      isMulti
                      name="name"
                      options={sfxCate}
                      isSearchable={true}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(e) => {
                        const value = e.map((item) => {
                          return item.value;
                        });
                        if (value.length === 0) {
                          setSfx(sfx);
                          return;
                        } else {
                          const filter = sfx.filter((item) => {
                            return item.sfxCategory?.some((cate) => {
                              return value.includes(cate._id);
                            });
                          });
                          setSfx(filter);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-2 ">
                  <div>
                    <label htmlFor="exampleInputText1">Artist </label>
                    <input
                      style={{
                        border: "1px solid #e3e6f0",
                        boxShadow: "none",
                      }}
                      type="text"
                      className="form-control "
                      id="exampleInputText1"
                      placeholder="Enter Artist Name"
                      onChange={(e) => {
                        const value = e.target.value;
                        const filter = sfx.filter((item) => {
                          return item.artists?.some((artist) => {
                            return artist.name
                              .toLowerCase()
                              .includes(value.toLowerCase());
                          });
                        });
                        setSfx(filter);
                      }}
                    />
                  </div>
                </div>

                <div className="col-lg-2 ">
                  <div>
                    <label htmlFor="customRange1">Duration</label>
                    <input
                      type="range"
                      className="custom-range mt-2 "
                      id="customRange1"
                      onChange={(e) => {
                        setCurrentDuration(e.target.value);
                        const filter = sfx.filter((item) => {
                          return item.duration <= e.target.value * 10;
                        });

                        setSfx(filter);
                      }}
                    />
                    <div className="d-flex justify-content-between mt-2">
                      <span>0:00</span>
                      <span>
                        {" "}
                        {currentDuration
                          ? moment(currentDuration * 6000).format("m:ss")
                          : ""}
                      </span>
                      <span>10:00</span>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="mb-5" />
              {sfx && sfx.length > 0 ? (
                <div className="iq-card-body">
                  <ul className="list-unstyled iq-music-slide mb-0">
                    {sfx &&
                      sfx.map((sfx, index) => {
                        return (
                          <Fragment key={index}>
                            <SfxPlayer song={sfx} />
                          </Fragment>
                        );
                      })}
                  </ul>
                </div>
              ) : (
                <div className="col-lg-12">
                  <div className="iq-card">
                    <div className="iq-card-body center">No Sfx Found</div>
                  </div>
                </div>
              )}
            </div>
          </div>
    
  );
};

export default SearchSfx;
