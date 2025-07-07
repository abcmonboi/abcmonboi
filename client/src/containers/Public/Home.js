import React, { Fragment, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  HelmetComponent,
  NewReleaseSong,
  TrendingCollection,
  TrendingTheme,
} from "../../components";
import { NewAlbum } from "../../components/Home/NewAlbum";
import HomeFooter from "../../components/Home/HomeFooter";
import { Search } from "components";
import logo from "assets/images/logo.png";
import { apiFilterSearchSong } from "apis";

const Home = () => {
  const homePage = useRef(null);
  const [isLoading, setisLoading] = useState(true);
  const [newRelease, setNewReleaseSong] = useState([]);

  useEffect(() => {
    homePage.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    const FetchGetNewReleaseSong = async () => {
      try {
        const response = await apiFilterSearchSong({
          limit: 8,
          sort: "-createdAt",
          page: 1,
          status: true,
        });
        const data = response.data.data;
        setNewReleaseSong(data);
        setisLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    FetchGetNewReleaseSong();
  }, []);

  return (
    <Fragment>
      <HelmetComponent
        title="AudioBay - Thư Viện Nhạc Miễn Phí Không Bản Quyền"
        description="Nền tảng âm nhạc và âm thanh đa dạng, từ miễn phí đến bản quyền. Khám phá và tận hưởng những bản nhạc chất lượng cao, phù hợp với mọi nhu cầu sáng tạo nội dung của bạn."
        imageUrl={logo}
        imageAlt="trang chủ"
        href={"https://audiobay.net"}
      />

      <div ref={homePage} id="content-page" className="content-page">
        <div className="container-fluid">
          <div className="row">
            <Fragment>
              <Search />
              <TrendingTheme />
              <TrendingCollection />
              <NewAlbum />
              <NewReleaseSong {...{ isLoading, newRelease }} />
              <HomeFooter />
            </Fragment>
          </div>
        </div>
        <Outlet />
      </div>
    </Fragment>
  );
};

export default Home;
