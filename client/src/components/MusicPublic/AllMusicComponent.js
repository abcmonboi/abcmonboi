import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
  memo,
  useRef,
} from "react";
import { SearchItem, InputSelect, Loading, HelmetComponent } from "components";
import { MusicPlayer } from "components";
import InfiniteScroll from "react-infinite-scroll-component";
import { sorts } from "../../ultils/constant";
import { duration } from "../../ultils/constant";
import {
  apiFilterSearchSong,
  apiGetAllMood,
  apiGetAllGenre,
  apiGetAllInstrument,
  apiGetAllVideoTheme,
} from "../../apis";
import {
  useSearchParams,
  useParams,
  createSearchParams,
  useNavigate,
} from "react-router-dom";
import { param } from "jquery";
const AllMusicComponent = () => {
  const navigate = useNavigate();
  const [totalSongCount, setTotalSongCount] = useState(0);
  const [song, setSong] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [activeClick, setActiveClick] = useState(null);
  const [paramsQuery, setParamsQuery] = useState({});
  const [params] = useSearchParams();
  const [isLoadingSong, setIsLoadingSong] = useState(true);
  const [sort, setSort] = useState("");
  const [mood, setMood] = useState([]);
  const [videoTheme, setVideoTheme] = useState([]);
  const [genre, setGenre] = useState([]);
  const [instrument, setInstrument] = useState([]);
  const [page, setPage] = useState(1);
  // fetch song by params
  const FetchSongByPage = async (queries) => {
    queries.status = "true";
    await apiFilterSearchSong(queries).then((response) => {
      setIsLoadingSong(false);

      if (response?.data?.data) {
        if (response?.data?.data?.length === 0) {
          setHasMore(false);
          setSong([]);
        }
        if (
          queries?.page === 1 ||
          queries?.page === undefined ||
          queries?.page === "1"
        ) {
          setSong(response.data.data);
        } else {
          setSong([...song, ...response.data.data]);
        }

        if (
          +response.data?.skip + +response.data?.limit >=
          +response.data?.counts
        ) {
          setHasMore(false);
        }
        setTotalSongCount(response?.data?.counts || 0);
      } else {
        setSong([]);
        setHasMore(false);
        setTotalSongCount(0);
      }
    });
  };
  // Create search params when change page
  const fetchMoreSong = () => {
    setPage(page + 1);
    let param = [];
    for (let i of params.entries()) param.push(i);
    let queries = {};
    for (let i of param) {
      queries[i[0]] = i[1];
    }
    queries.page = page + 1;
    navigate({
      pathname: "/music",
      search: createSearchParams(queries).toString(),
    });
  };
  // Fetch List Filter
  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await apiGetAllVideoTheme("", "", "name", "");
        const videoTheme = response.data.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        const response2 = await apiGetAllInstrument("", "", "name", "");
        const instrument = response2.data.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        const response3 = await apiGetAllMood("", "", "name", "");
        const mood = response3.data.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        const response4 = await apiGetAllGenre("", "", "name", "");
        const genre = response4.data.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setInstrument(instrument);
        setMood(mood);
        setGenre(genre);
        setVideoTheme(videoTheme);
      } catch (error) {}
    };
    fetchList();
  }, []);
  // Change value of sort
  const changeValue = useCallback(
    (value) => {
      setIsLoadingSong(true);
      setSort(value);
      page !== 1 && setPage(1);
    },
    [sort]
  );
  //Fetch song by sort
  useEffect(() => {
    // window.scrollTo(0, 0, "smooth");
    let param = [];
    for (let i of params.entries()) param.push(i);
    let queries = {};
    for (let i of param) {
      queries[i[0]] = i[1];
    }
    if (sort) {
      queries.sort = sort;
      delete queries.page;
      navigate({
        pathname: "/music",
        search: createSearchParams(queries).toString(),
      });
    } else {
      delete queries.sort;
      delete queries.page;
      navigate({
        pathname: "/music",
        search: createSearchParams(queries).toString(),
      });
    }
  }, [sort]);
  // set loading song when change filter
  const handleLoadingSong = useCallback(
    (value) => {
      setIsLoadingSong(value);
    },
    [isLoadingSong]
  );

  // handle params when change filter
  useEffect(() => {
    if (params?.get("page") !== null) {
      setPage(+params?.get("page"));
      if (params?.get("page") === "1") {
        !hasMore && setHasMore(true);
      }
    } else {
      setPage(1);
      !hasMore && setHasMore(true);
    }
    let param = [];
    for (let i of params.entries()) param.push(i);
    let queries = {};
    let durationQuery = {};
    for (let i of param) {
      queries[i[0]] = i[1];
    }

    if (queries.min && queries.max) {
      durationQuery = {
        $and: [
          { duration: { gte: queries.min } },
          { duration: { lte: queries.max } },
        ],
      };
      delete queries.duration;
    } else {
      if (queries.min) queries.duration = { gte: queries.min };
      if (queries.max) queries.duration = { lte: queries.max };
    }
    delete queries.min;
    delete queries.max;

    const q = {
      ...queries,
      ...durationQuery,
    };
    FetchSongByPage(q);
  }, [params]);
  // close filter when click outside
  const changeActiveFilter = useCallback(
    (name) => {
      if (activeClick === name) {
        setActiveClick(null);
        return;
      } else setActiveClick(name);
    },
    [activeClick]
  );
  return (
    <Fragment>

      <div
        style={{
          minHeight: "100vh",
        }}
        onClick={() => {
          activeClick && setActiveClick(null);
        }}
        className="col-lg-12"
      >
        <div className="iq-card ">
          <div className=" p-3 d-flex  justify-content-between  filter-song ">
            <div
              style={{
                flex: 10,
              }}
              className=" d-flex flex-column "
            >
              <div className=" d-flex  justify-content-start  align-items-center filter-song-multi ">
                <SearchItem
                  name="mood"
                  activeClick={activeClick}
                  changeActiveFilter={changeActiveFilter}
                  content={mood}
                  handleLoadingSong={handleLoadingSong}
                />

                <SearchItem
                  name="genre"
                  activeClick={activeClick}
                  changeActiveFilter={changeActiveFilter}
                  content={genre}
                  handleLoadingSong={handleLoadingSong}
                />
                <SearchItem
                  name="instrument"
                  activeClick={activeClick}
                  changeActiveFilter={changeActiveFilter}
                  content={instrument}
                  handleLoadingSong={handleLoadingSong}
                />
                <SearchItem
                  name="artist"
                  activeClick={activeClick}
                  changeActiveFilter={changeActiveFilter}
                  type="input"
                  handleLoadingSong={handleLoadingSong}
                />
                <SearchItem
                  name="duration"
                  activeClick={activeClick}
                  changeActiveFilter={changeActiveFilter}
                  type="select"
                  content={duration}
                  handleLoadingSong={handleLoadingSong}
                />
              </div>
            </div>
            <div
              style={{
                flex: "2",
              }}
              className=" d-flex flex-column "
            >
              <div className=" d-flex justify-content-end align-items-center">
                <InputSelect
                  changeValue={changeValue}
                  value={sort}
                  options={sorts}
                />
              </div>
            </div>
          </div>
          <div className="iq-card-header d-flex justify-content-between">
            <div className="iq-header-title">
              {/* <h4 className="card-title text-muted ">
              {" "}
              {` ${totalSongCount} bài hát `}{" "}
              {`
        miễn phí bản quyền`}
            </h4> */}
            </div>
          </div>

          {/* <div  className=" p-4 w-100 h-100 d-flex align-items-center border-top  border-bottom rounded-pill">
        <h4 className="text-center font-italic">
        {`${totalSongCount} bài hát "${title}"`} {`
        miễn phí bản quyền`}

        </h4>
        </div> */}

          <div
            style={
              `${isLoadingSong}` === "true"
                ? { height: "20vh" }
                : { height: "auto" }
            }
            className={`iq-card-body ${isLoadingSong && `position-relative`} `}
          >
            {isLoadingSong ? (
              <div className="search-loading-icon">
                <Loading />
              </div>
            ) : (
              <InfiniteScroll
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! That's all</b>
                  </p>
                }
                dataLength={song.length}
                next={fetchMoreSong}
                hasMore={hasMore}
                loader={
                  // hasMore && (
                  <p style={{ textAlign: "center" }}>
                    <Loading />
                  </p>
                  // )
                }
              >
                <ul className="list-unstyled iq-music-slide mb-0">
                  {song.length > 0 ? (
                    song.map((item, index) => {
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
              </InfiniteScroll>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default memo(AllMusicComponent);
