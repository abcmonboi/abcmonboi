import React, { Fragment, useEffect, useRef,useState } from "react";

import { AllMusicComponent, HelmetComponent, ListRelease } from "components";
import { useSearchParams } from "react-router-dom";
import {TrendingSong, Search} from "components";
import logo from 'assets/images/logo.png';
import { apiFilterSearchSong } from "apis";

const Music = () => {
  const [searchParams] = useSearchParams();
  const [song, setSong] = useState();

  const musicPage = useRef(null);
  const getMostViewSong = async () => {
    apiFilterSearchSong({
      page: 1,
      limit: 1,
      sort: "-views",
      fields: "title,thumbnail,slug"
    })
      .then((res) => {
        if (res.data.data.length > 0) {
          setSong(res.data.data[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    musicPage.current.scrollIntoView({ behavior: "smooth", block: "start" });
    getMostViewSong();
  }, []);


  return (
    <Fragment>
      <HelmetComponent
        title="Âm nhạc - AudioBay"
        description="Nền tảng âm nhạc và âm thanh đa dạng, từ miễn phí đến bản quyền. Khám phá và tận hưởng những bản nhạc chất lượng cao, phù hợp với mọi nhu cầu sáng tạo nội dung của bạn."
        imageUrl={song?.thumbnail }  
        imageAlt="âm nhạc"
        href={"https://audiobay.net/music"}
      />
      <div ref={musicPage} id="content-page" className="content-page">
        <div className="container-fluid">
          <div className="row">
            <Fragment>
              <Search />
              <TrendingSong />
              {/* <ListRelease /> */}
              <AllMusicComponent  />
            </Fragment>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Music;
