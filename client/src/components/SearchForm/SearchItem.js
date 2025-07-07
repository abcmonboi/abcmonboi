import React, { memo, useEffect, useState } from "react";

import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { path } from "../../ultils/constant";
import useDebounce from "../../hooks/useDebounce";
import { Loading } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "store/actions";
const convertEngtoVN = {
  mood: "Tâm trạng",
  genre: "Thể loại",
  instrument: "Nhạc cụ",
  artist: "Nghệ sĩ",
  duration: "Thời lượng",
};

 


const SearchItem = ({
  name,
  activeClick,
  changeActiveFilter,
  type = "checkbox",
  content,
  handleLoadingSong,
}) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const  title  = params.get("title");
  const [query, setQuery] = useState("");
  const [paramsQuery, setParamsQuery] = useState([]);
  const [selected, setSelected] = useState([]);
  const [duration, setDuration] = useState({
    min: 0,
    max: 0,
  });
  const [durationLabel, setDurationLabel] = useState();
  const [artist, setArtist] = useState("");

  const handleSelect = (el) => {
    // changeActiveFilter(null);
    const alreadyEl = selected?.find((item) => item.id === el._id);
    if (alreadyEl) {
      setSelected((prev) => prev.filter((item) => item.id !== el._id));
    } else {
      setSelected((prev) => [...prev, { id: el._id, name: el.name }]);
    }
  };

  useEffect(() => {
    handleLoadingSong(true);
    if (title) {
      setSelected([]);
      setDuration({
        min: 0,
        max: 0,
      });
      setArtist("");
    }
  }, [title]);
  const debouceArtist = useDebounce(artist, 500);

  useEffect(() => {
    // window.scrollTo(0, 0, "smooth");
    let param = [];
    for (let i of params.entries()) param.push(i);
    let queries = {};
    for (let i of param) {
      queries[i[0]] = i[1];
    }
    if (activeClick === "mood") {
      handleLoadingSong(true);
      if (selected.length > 0) {
        queries.moods = selected.map((el) => el.id).toString();
        delete queries.page;
        if (window.location.pathname?.includes("music")) {
          navigate({
            pathname: `/music`,
            search: createSearchParams(queries).toString(),
          });
        } else {
          navigate({
            pathname: `/search/song`,
            search: createSearchParams(queries).toString(),
          });
        }
      } else {
        delete queries.moods;
        delete queries.page;
        if (window.location.pathname?.includes("music")) {
          navigate({
            pathname: `/music`,
            search: createSearchParams(queries).toString(),
          });
        } else {
          navigate({
            pathname: `/search/song`,
            search: createSearchParams(queries).toString(),
          });
        }
      }
    }
    if (activeClick === "genre") {
      handleLoadingSong(true);
      if (selected.length > 0) {
        queries.genres = selected.map((el) => el.id).toString();
        delete queries.page;
        if (window.location.pathname?.includes("music")) {
          navigate({
            pathname: `/music`,
            search: createSearchParams(queries).toString(),
          });
        } else {
          navigate({
            pathname: `/search/song`,
            search: createSearchParams(queries).toString(),
          });
        }
      } else {
        delete queries.genres;
        delete queries.page;
        if (window.location.pathname?.includes("music")) {
        navigate({
          pathname: `/music`,
          search: createSearchParams(queries).toString(),
        });
       } else {
          navigate({
            pathname: `/search/song`,
            search: createSearchParams(queries).toString(),
          });
        }
        
      }
    }
    if (activeClick === "instrument") {
      handleLoadingSong(true);

      if (selected.length > 0) {
        queries.instruments = selected.map((el) => el.id).toString();
        delete queries.page;
        if (window.location.pathname?.includes("music")) {
          navigate({
            pathname: `/music`,
            search: createSearchParams(queries).toString(),
          });
        } else {
          navigate({
            pathname: `/search/song`,
            search: createSearchParams(queries).toString(),
          });
        }
      } else {
        delete queries.instruments;
        delete queries.page;
        if (window.location.pathname?.includes("music")) {
        navigate({
          pathname: `/music`,
          search: createSearchParams(queries).toString(),
        });
      }else {
        navigate({
          pathname: `/search/song`,
          search: createSearchParams(queries).toString(),
        });
      }
      }
      // handleSubmit(
      //   { instruments: selected.map((el) => el.id).toString() },
      //   { instruments: selected.map((el) => el.name).toString() }
      // );
    }
    if (activeClick === "artist") {
      handleLoadingSong(true);
      if (artist.trim() !== "") {
        queries.artists = artist.trim();
        delete queries.page;
        if (window.location.pathname?.includes("music")) {
          navigate({
            pathname: `/music`,
            search: createSearchParams(queries).toString(),
          });
        } else {
          navigate({
            pathname: `/search/song`,
            search: createSearchParams(queries).toString(),
          });
        }
      } else {
        delete queries.artists;
        delete queries.page;
        if (window.location.pathname?.includes("music")) {
          navigate({
            pathname: `/music`,
            search: createSearchParams(queries).toString(),
          });
        } else {
          navigate({
            pathname: `/search/song`,
            search: createSearchParams(queries).toString(),
          });
        }
      }
    }
  }, [selected, debouceArtist]);

  const deboucePriceMin = useDebounce(duration.min, 0);
  const deboucePriceMax = useDebounce(duration.max, 0);
  useEffect(() => {
    // window.scrollTo(0, 0, "smooth");
    handleLoadingSong(true);
    let param = [];
    for (let i of params.entries()) param.push(i);
    let queries = {};
    for (let i of param) {
      queries[i[0]] = i[1];
    }
    if (Number(duration.min) > 0) {
      queries.min = duration.min;
    } else delete queries.min;
    if (Number(duration.max) > 0) {
      queries.max = duration.max;
    } else delete queries.max;
    if (Number(duration.min) > 0 && Number(duration.max) > 0) {
      queries.min = duration.min;
      queries.max = duration.max;
    }
    delete queries.page;
    if (window.location.pathname?.includes("music")) {
      navigate({
        pathname: `/music`,
        search: createSearchParams(queries).toString(),
      });
    } else {
      navigate({
        pathname: `/search/song`,
        search: createSearchParams(queries).toString(),
      });
    }
  }, [deboucePriceMin, deboucePriceMax]);

  useEffect(() => {
    if (params.size === 1 && name === "mood") {
      let param = [];
      for (let i of params.entries()) param.push(i);
      let queries = {};
      for (let i of param) {
        queries[i[0]] = i[1];
      }
      const moodsArray = queries?.moods?.split(",");
      const moodsQuery = moodsArray?.map((el) => ({
        moods: el,
      }));
      if (moodsQuery?.length === 1 && content?.length > 0) {
        const label = content.find(
          (item) => item._id === moodsQuery[0]?.moods
        )?.name;
        setSelected([{ id: moodsQuery[0]?.moods, name: label }]);
      }
    }
  }, [params, content]);
  return (
    <>
      <div
        onClick={() => {
          changeActiveFilter(name);
          // if(query !== ""){
          //   setQuery("")
          // }
        }}
        style={{ cursor: "pointer" }}
        className={`mr-4 p-2 btn position-relative  d-flex justify-content-between align-items-center search-item 
          ${
            selected.length > 0 ||
            artist ||
            Number(duration.max) !== 0 ||
            Number(duration.min) !== 0
              ? "bg-primary "
              : ""
          }`}
      >
        <span
          className={`mr-2 text-capitalize font-size-16 ${
            selected.length > 0 ||
            artist ||
            Number(duration.min) !== 0 ||
            Number(duration.max) !== 0
              ? "text-white "
              : "text-black"
          }`}
        >
          {selected.length > 0 ? `${convertEngtoVN[name]}: ${selected[0].name}` : convertEngtoVN[name]}
          {selected.length - 1 > 0 && ` +${selected.length - 1}`}
          {artist ? `: ${artist}` : ""}
          {Number(duration.min) !== 0 || Number(duration.max) !== 0
            ? ` ${durationLabel}`
            : ""}
        </span>
        {activeClick === name ? (
          <i className="las la-angle-up font-size-12 "></i>
        ) : (
          <i className="las la-angle-down font-size-12 "></i>
        )}
        {activeClick === name && (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              top: "calc(100% + 12px)",
              zIndex: 1,
              left: 0,
              backgroundColor: "#f7f7f7",
              cursor: "default",
            }}
            className="position-absolute  border border-light rounded shadow-sm search-item-checkbox-dropdown"
          >
            {type === "checkbox" && (
              <div className="p-4 text-black">
                <div className="d-flex justify-content-between align-items-center border-bottom ">
                  <span className="mr-3 text-nowrap ">
                    {`${selected.length} đã chọn`}
                  </span>
                  <u
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected([]);
                    }}
                    style={{ cursor: "pointer" }}
                    className="text-nowrap"
                  >
                    Bỏ chọn
                  </u>
                </div>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="d-flex flex-column mt-4 search-item-checkbox"
                  style={{
                    cursor: "pointer",
                    height: "348px",
                    minWidth: "200px",
                    width: "calc(100% )",
                    overflowY: "scroll",
                    maxHeight: "80vh",
                  }}
                >
                  <div
                    className=" 
                         mb-3 d-flex flex-direction-row justify-content-center align-items-center position-relative pr-3
                      "
                  >
                    <input
                      style={{
                        maxHeight: "36px",
                      }}
                      type="text"
                      defaultValue={query || ""}
                      className="form-control  search-search-item"
                      placeholder={`Search ${name}`}
                      aria-label="Search"
                      onChange={(e) => {
                        if (e.target.value !== "") {
                          setQuery(e.target.value);
                        } else {
                          setQuery("");
                        }
                      }}
                    ></input>
                    <div
                      className=" position-absolute bg-primary  h-100 d-flex justify-content-center align-items-center"
                      style={{
                        right: "12px",
                        width: "2.5rem",
                        borderTopRightRadius: "0.25rem",
                        borderBottomRightRadius: "0.25rem",
                      }}
                    >
                      <i className="ri-search-line text-white"></i>
                    </div>
                  </div>
                  {content?.length > 0 &&
                    content
                      .filter((el) =>
                        el.name
                          .toLowerCase()
                          .includes(query.toLowerCase().trim())
                      )
                      .map((el, index) => (
                        <div
                          key={index}
                          className="d-flex align-items-baseline mb-2 "
                        >
                          <input
                            style={{
                              outline: "none",
                              focus: "none",
                            }}
                            type="checkbox"
                            className="mr-4 "
                            value={el._id}
                            onChange={(e) => {
                              handleSelect(el);
                            }}
                            id={el.name}
                            checked={selected?.some(
                              (item) => item.id === el._id
                            )}
                          />
                          <label
                            style={{
                              cursor: "pointer",
                            }}
                            htmlFor={el.name}
                            className="text-capitalize text-nowrap w-100  text-left pr-4"
                          >
                            {el.name}
                          </label>
                        </div>
                      ))}
                </div>
              </div>
            )}
            {type === "select" && (
              <div className="p-2">
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="d-flex flex-column  "
                  style={{
                    cursor: "pointer",
                    minHeight: "156px",
                    minWidth: "166px",
                  }}
                >
                  {content.map((el, index) => (
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setDuration({
                          min: el.min,
                          max: el.max,
                        });
                        setDurationLabel(el.label);
                        changeActiveFilter(null);

                        // navigate({
                      }}
                      key={index}
                      className={`
                  d-flex 
                  btn
                  text-nowrap w-100 
                   text-left
                   align-items-baseline 
                   ${
                     +el.min === +duration.min &&
                     +el.max === duration.max &&
                     " duration-item-active"
                   }
                   duration-item
                   mb-1
                  font-size-14
                  `}
                    >
                      {el.label}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {type === "input" && (
              <div className="p-4">
                <div className="d-flex justify-content-between align-items-center border-bottom ">
                  <span className="mr-3 text-nowrap font-size-12 text-gray">
                    Lọc ca khúc theo nghệ sĩ
                  </span>
                  <u
                    onClick={(e) => {
                      e.stopPropagation();
                      setArtist("");
                    }}
                    style={{ cursor: "pointer" }}
                    className="text-nowrap"
                  >
                    Xóa
                  </u>
                </div>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="d-flex flex-column mt-4 "
                  style={{
                    cursor: "pointer",
                    height: "fit-content",
                    minWidth: "200px",
                    width: "fit-content",
                    maxHeight: "80vh",
                  }}
                >
                  <div
                    className=" 
                          mb-3 d-flex flex-direction-row justify-content-center align-items-center position-relative
                       "
                  >
                    <input
                      style={{
                        maxHeight: "36px",
                      }}
                      type="text"
                      value={artist ? artist : ""}
                      className="form-control  search-search-item"
                      placeholder={`Search ${name}`}
                      aria-label="Search"
                      onChange={(e) => {
                        if (e.target.value !== "") {
                          setArtist(e.target.value);
                        } else {
                          setArtist("");
                        }
                      }}
                    ></input>
                    <div
                      className=" position-absolute bg-primary  h-100 d-flex justify-content-center align-items-center"
                      style={{
                        right: "0px",
                        width: "2.5rem",
                        borderTopRightRadius: "0.25rem",
                        borderBottomRightRadius: "0.25rem",
                        cursor: "default",
                      }}
                    >
                      <i className="ri-search-line text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default memo(SearchItem);
