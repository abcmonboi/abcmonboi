import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { path } from "ultils/constant";
import Select from "react-select";
import bgBackground from "assets/images/bg.jpg";

const content = {
  1: "Tìm kiếm bài hát",
  2: "Tìm kiếm hiệu ứng âm thanh",
  3: "Tìm kiếm nghệ si ",
  4: "Tìm kiếm album ",
  5: "Tìm kiếm bộ sưu tập",
  6: "Tìm kiếm chủ đề",
};
const selectOption = [
  { value: "1", label: "Âm nhạc" },
  { value: "2", label: "Hiệu ứng âm thanh" },
  { value: "3", label: "Nghệ sĩ" },
  { value: "4", label: "Album" },
  { value: "5", label: "Bộ sưu tập" },
  { value: "6", label: "Chủ đề" },
];

const Search = () => {
  const { title } = useParams();
  const [params] = useSearchParams();
  const songTitle = params.get("title");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchContent, setSearchContent] = useState(1);
  const [keyword, setKeyword] = useState("");
  const handlerSearch = async (e) => {
    //eslint-disable-next-line
    if ((e.key === "Enter" && keyword !== "") || e.type === "click") {
      if (+searchContent === 1) {
        // dispatch(action.SearchMusicByTitle(keyword));
        //eslint-disable-next-line
        // navigate(`${path.SEARCH_SONG}` + `?keyword=${keyword}`);
        navigate({
          pathname: `${path.SEARCH_SONG}`,
          search: createSearchParams({
            title: keyword.trim(),
          }).toString(),
        });
      }
      if (+searchContent === 2) {
        //eslint-disable-next-line
        // navigate(`${path.SEARCH_SFX}` + `?keyword=${keyword}`);
        navigate({
          pathname: `${path.SEARCH_SFX}`,
          search: createSearchParams({
            keyword: keyword.trim(),
          }).toString(),
        });
      }
      if (+searchContent === 3) {
        navigate({
          pathname: `${path.SEARCH_ARTIST}`,
          search: createSearchParams({
            keyword: keyword.trim(),
          }).toString(),
        });
      }
      if (+searchContent === 4) {
        //eslint-disable-next-line
        // navigate(`${path.SEARCH_ALBUM}` + `?keyword=${keyword}`);
        navigate({
          pathname: `${path.SEARCH_ALBUM}`,
          search: createSearchParams({
            keyword: keyword.trim(),
          }).toString(),
        });
      }
      if (+searchContent === 5) {
        //eslint-disable-next-line
        // navigate(`${path.SEARCH_COLLECTION}` + `?keyword=${keyword}`);
        navigate({
          pathname: `${path.SEARCH_COLLECTION}`,
          search: createSearchParams({
            keyword: keyword,
          }).toString(),
        });
      }
      if (+searchContent === 6) {
        //eslint-disable-next-line
        // navigate(`${path.SEARCH_COLLECTION}` + `?keyword=${keyword}`);
        navigate({
          pathname: `${path.SEARCH_SUBTHEME}`,
          search: createSearchParams({
            title: keyword?.trim(),
          }).toString(),
        });
      }
    }
  };

  useEffect(() => {
    if (
      window.location.pathname.includes("song") ||
      window.location.pathname.includes("music")
    ) {
      setSearchContent(1);
    }
    if (window.location.pathname.includes("sfx")) {
      setSearchContent(2);
    }
    if (
      window.location.pathname.includes("artist") ||
      window.location.pathname.includes("artists")
    ) {
      setSearchContent(3);
    }
    if (
      window.location.pathname.includes("album") ||
      window.location.pathname.includes("albums")
    ) {
      setSearchContent(4);
    }
    if (
      window.location.pathname.includes("collection") ||
      window.location.pathname.includes("collections")
    ) {
      setSearchContent(5);
    }
    if (
      window.location.pathname.includes("themes") ||
      window.location.pathname.includes("subtheme")
    ) {
      setSearchContent(6);
    }

    // if(window.location.pathname.includes("song")){
    //   setSearchContent(1);
    // }

    //eslint-disable-next-line
  }, [window.location.pathname]);

  return (
    <div className="col-lg-12">
      <div className="iq-card iq-realease">
        <div
          style={{
            backgroundBlendMode: "multiply",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${bgBackground})`,
            backgroundSize: "cover",
            height: "500px",
            padding: "0px 0 0 0",
          }}
          className="iq-card-body iq-song-back3"
        >
          <div className="row">
            <div
              style={{
                paddingLeft: "0",
                borderRadius: "0 50px",
              }}
              className="col-lg-12 hero-header-search__box "
            >
              <div
                className="hero-header is--search is--retracted is--color-light is--align-left is--type-home"
                style={{
                  height: "auto",
                  maxWidth: "none",
                  position: "relative",
                  display: "block",
                  width: "100%",
                  margin: "0 auto",
                  padding: "0",
                  boxSizing: "inherit",
                  lineHeight: "1.8125rem",
                  WebkitFontSmoothing: "antialiased",
                  fontSize: "100%",
                  WebkitTextSizeAdjust: "100%",
                }}
              >
                <div
                  className="inner-search"
                  style={{
                    height: "31.25rem",
                    padding: "0 0 20px 0",
                    position: "relative",
                    minHeight: "17.5rem",
                    maxWidth: "120.625rem",
                    margin: "0 auto",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    boxSizing: "inherit",
                    lineHeight: "1.8125rem",
                    WebkitFontSmoothing: "antialiased",
                    fontSize: "100%",
                    textRendering: "optimizeLegibility",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      marginBottom: "0.625rem",
                      textAlign: "left",
                      width: "100%",
                      order: "1",
                      zIndex: "6",
                      flex: "none",
                      margin: "0",
                      padding: "0",
                      boxSizing: "inherit",
                      display: "block",
                    }}
                    className="hero-header-search__text"
                  >
                    <h1
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "2.75rem",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "normal",
                        marginBottom: "0.625rem",
                        margin: "0",
                        padding: "0 0 0 50px",
                        boxSizing: "inherit",

                        display: "block",

                        textAlign: "center",
                      }}
                      className="search__title text-white"
                    >
                      AudioBay - Thư Viện Nhạc Miễn Phí
                    </h1>
                    <p
                      style={{
                        fontSize: "1.25rem",
                        lineHeight: "1.8125rem",
                        textTransform: "none",
                        letterSpacing: "normal",
                        fontWeight: "400",
                        margin: "0",
                        color: "rgba(255,255,255, .66)",
                        padding: "0 0 0 50px",
                        boxSizing: "inherit",
                        marginBlockStart: "0.67em",
                        marginBlockEnd: "0.67em",
                        marginInlineStart: "0px",
                        marginInlineEnd: "0px",
                        display: "block",
                        textAlign: "center",
                      }}
                      className="search__description text-white"
                    >
                      Thư viện âm nhạc miễn phí chất lượng cao
                    </p>
                  </div>
                  <form
                    autoComplete="off"
                    action=""
                    style={{
                      marginBottom: "3.75rem",
                      marginTop: "2.1875rem",
                      width: "100%",
                      order: "1",
                      color: "#000",
                      zIndex: "5",
                      position: "relative",
                      display: "block",
                      transitionProperty: "all",
                      transitionDuration: ".2s",
                      transitionTimingFunction: "ease-in-out",
                      maxWidth: "50.75rem",
                      flex: "none",
                      margin: "0",
                      padding: "0 0 0 50px",
                      boxSizing: "inherit",
                    }}
                    className="hero-header-search__form"
                  >
                    <div
                      style={{
                        height: "3.425rem",
                        borderRadius: "0.125rem",
                        borderWidth: "2px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        position: "relative",
                        padding: "0",
                        boxShadow: "0 0 0 8px rgba(229,124,44,0)",
                        border: "1px solid rgba(229,124,44,0)",
                        transitionProperty: "box-shadow,border-color",
                        transitionDuration: ".2s",
                        transitionTimingFunction: "ease-in-out",
                        margin: "0",

                        width: "100%",
                      }}
                      className="iq-search-bar"
                    >
                      <a
                        style={{
                          top: "8px",
                          position: "absolute",
                          left: "10px",
                          opacity: "1",
                        }}
                        onClick={handlerSearch}
                        className="search-link"
                      >
                        <i className="ri-search-line "></i>
                      </a>

                      <div
                        className=""
                        style={{
                          top: "5px",
                          position: "absolute",
                          right: "10px",
                          width: "28%",
                          color: "black",
                          opacity: "1",
                        }}
                      >
                        <Select
                          placeholder={
                            <div
                              style={{
                                color: "rgb(200,197,197) !important",
                              }}
                            >
                              Chọn...
                            </div>
                          }
                          styles={{
                            singleValue: (base) => ({
                              ...base,
                              color: "rgb(200,197,197) !important",
                            }),

                            control: (base, state) => ({
                              ...base,
                              borderColor: state.isFocused ? "grey" : "red",
                              background: "transparent",
                              border: "0",
                              boxShadow: "none",
                              width: "100%",
                            }),
                            zIndex: 9999,
                          }}
                          name="name"
                          value={selectOption.find(
                            (obj) => obj.value === `${searchContent}`
                          )}
                          options={selectOption}
                          classNamePrefix="select"
                          onChange={(e) => {
                            document.getElementById("search-input").value = "";
                            setSearchContent(e?.value);
                          }}
                        />
                      </div>
                      <input
                        id="search-input"
                        defaultValue={songTitle || title}
                        onKeyUp={handlerSearch}
                        onChange={(e) => setKeyword(e.target.value)}
                        style={{
                          height: "100%",
                          opacity: "1",
                          width: "100%",
                        }}
                        className="text search-input"
                        placeholder={content[searchContent]}
                        type="text"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Search);
