import React from "react";
import { Link } from "react-router-dom";
import { path } from "ultils/constant";

const HomeFooter = () => {
  return (
    <div className="col-sm-12">
      <div className="iq-card">
        <div className="iq-card-body">
          <div className="row">
            <div className="col-lg-6">
              <img
                src="/assets/images/logo.png"
                className="img-fluid avatar-120 h-100"
                alt="logo"
              />
            </div>
            <div className="col-lg-6 align-self-center">
              <Link to="/license">
                <h4 className="mb-0 float-right license bounce font-size-20">
                  Tìm hiểu về thông tin bản quyền
                </h4>
              </Link>
            </div>
            <div className="col-sm-12">
              <hr className="mt-3" />
              <div className="mt-lg-5 mb-lg-5">
                <h5 className="mb-0">Âm nhạc và hiệu ứng âm thanh miễn phí</h5>
                <p>
                  AudioBay - nền tảng âm nhạc và âm thanh đa dạng, từ miễn phí
                  đến bản quyền. Khám phá và tận hưởng những bản nhạc chất lượng
                  cao, phù hợp với mọi nhu cầu sáng tạo nội dung của bạn.
                </p>
              </div>
            </div>
          </div>
          <hr className="mt-3" />
          <div className="row ">
            <div className="col-lg-5">
              <div className="mt-lg-5 mb-lg-5">
                <h3 className="text-primary">AudioBay</h3>
                <p>
                  Thư viện âm nhạc và hiệu ứng âm thanh khổng lồ chất lượng cao
                  được chia sẻ bởi các nghệ sĩ tài năng của chúng tôi.
                </p>

                <p>
                  <a
                    href="https://www.facebook.com/audiobay.net"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="ri-facebook-fill mr-3 font-size-24" />
                  </a>
                  <a
                    href="https://www.instagram.com/musicproducervn/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="ri-instagram-fill mr-3 font-size-24" />
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCRGSinHQSk1_vd0mN9gfR0A"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="ri-youtube-fill mr-3 font-size-24" />
                  </a>
                  <a
                    href="https://open.spotify.com/artist/51qOmzmBunnc4QRvDE1fHs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="ri-spotify-fill mr-3 font-size-24" />
                  </a>
                  <a
                    href="https://music.apple.com/us/artist/vprod-music/1507262640"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="ri-apple-fill mr-3 font-size-24" />
                  </a>
                  <a
                    href="https://music.amazon.com/artists/B086YHWTTJ/vprod-music"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="ri-amazon-fill mr-3 font-size-24" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@vprodmusicvn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="ri-tiktok-line" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        d="M16 8.24537V15.5C16 19.0899 13.0899 22 9.5 22C5.91015 22 3 19.0899 3 15.5C3 11.9101 5.91015 9 9.5 9C10.0163 9 10.5185 9.06019 11 9.17393V12.3368C10.5454 12.1208 10.0368 12 9.5 12C7.567 12 6 13.567 6 15.5C6 17.433 7.567 19 9.5 19C11.433 19 13 17.433 13 15.5V2H16C16 4.76142 18.2386 7 21 7V10C19.1081 10 17.3696 9.34328 16 8.24537Z"
                        fill="#1faf16"
                      ></path>
                    </svg>
                  </a>
                </p>
              </div>
            </div>

            <div className="col ">
              <div className="row ">
                <div className="col">
                  <div className="mt-lg-5 mb-lg-5">
                    <h4 className="text-black mb-3 font-size-20 font-weight-400 text-capitalize">
                      Khám Phá
                    </h4>
                    <p className="home_footer_link font-size-14">
                      Lựa chọn của biên tập viên
                    </p>
                    <p className="home_footer_link font-size-14">
                      Bộ sưu tập được tuyển chọn
                    </p>
                    <p className="home_footer_link font-size-14">
                      Chủ đề âm nhạc phổ biến
                    </p>
                    <p className="home_footer_link font-size-14">
                      Âm nhạc phổ biến
                    </p>
                    <p className="home_footer_link font-size-14">
                      Hiệu ứng âm thanh phổ biến
                    </p>
                    <p className="home_footer_link font-size-14">
                      Top tìm kiếm
                    </p>
                  </div>
                </div>
                <div className="col">
                  <div className="mt-lg-5 mb-lg-5">
                    <h4 className="text-black mb-3 font-size-20 font-weight-400 text-capitalize">
                      Cộng đồng
                    </h4>
                    <p className="home_footer_link font-size-14">
                      <Link
                        to={path.BLOG}
                        className="text-black"
                        target="_blank"
                      >
                        Blog
                      </Link>
                    </p>
                    <p className="home_footer_link font-size-14">
                      <Link
                        to="https://www.facebook.com/groups/audiobay.net"
                        target="_blank"
                        className="text-black"
                      >
                        Facebook Group
                      </Link>
                    </p>

                    <p className="home_footer_link font-size-14">
                      <Link
                        to={path.ARTISTS}
                        target="_blank"
                        className="text-black"
                      >
                        Nghệ sĩ
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="col">
                  <div className="mt-lg-5 mb-lg-5">
                    <h4 className="text-black mb-3 font-size-20 font font-weight-400 text-capitalize">
                      Hợp tác
                    </h4>
                    <p className="home_footer_link font-size-14">
                      <Link
                        className="text-black"
                        to="https://www.facebook.com/musicproducer.vn"
                        target="_blank"
                      >
                        Sản xuất âm nhạc
                      </Link>
                    </p>
                    <p className="home_footer_link font-size-14">
                      <Link
                        className="text-black"
                        to="https://vprodpublishing.com"
                        target="_blank"
                      >
                        Phát hành nhạc
                      </Link>
                    </p>
                    <p className="home_footer_link font-size-14">Gói dịch vụ</p>
                    <p className="home_footer_link font-size-14">Đối tác</p>
                  </div>
                </div>
                <div className="col">
                  <div className="mt-lg-5 mb-lg-5">
                    <h4 className="text-black mb-3 font-size-20 font-weight-400 text-capitalize">
                      Về AudioBay
                    </h4>
                    <p className="home_footer_link font-size-14">
                      <Link
                        to={path.BLOG}
                        target="_blank"
                        className="home_footer_link font-size-14 text-black"
                      >
                        Giới thiệu
                      </Link>
                    </p>
                    <p className="home_footer_link font-size-14">
                      <Link className="home_footer_link font-size-14 text-black">
                        Câu hỏi thường gặp
                      </Link>
                    </p>
                    <p className="home_footer_link font-size-14">
                      <Link
                        to={path.LICENSE}
                        target="_blank"
                        className="home_footer_link font-size-14 text-black"
                      >
                        Thông tin bản quyền
                      </Link>
                    </p>
                    <p className="home_footer_link font-size-14">
                      <Link className="home_footer_link font-size-14 text-black">
                        Điều khoản sử dụng
                      </Link>
                    </p>
                    <p className="home_footer_link font-size-14">
                      <Link className="home_footer_link font-size-14 text-black">
                        Chính sách bảo mật
                      </Link>
                    </p>
                    <p className="home_footer_link font-size-14">
                      <Link
                        to={"https://www.facebook.com/audiobay.net"}
                        target="_blank"
                        className="home_footer_link font-size-14 text-black"
                      >
                        Liên hệ với chúng tôi
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-sm-12">
              <hr className="mt-3" />

              <div className="mt-lg-5 mb-lg-5">
                <h5>Văn Phòng</h5>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="d-flex align-items-center justify-content-between mb-lg-3">
                      <iframe
                        title="map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5235008766595!2d106.68396597465524!3d10.771158989377264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f07b3a24645%3A0x8190331668205de4!2zVMOyYSBuaMOgIEhNIFRvd24!5e0!3m2!1svi!2s!4v1699410836454!5m2!1svi!2s"
                        height={200}
                        style={{ border: 0, width: "100%" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="font-size-14">
                      <p className="mb-0">
                        Địa chỉ: 27/1A Nguyễn Trung Trực, P.5, Q.Bình Thạnh,
                        TP.HCM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="mt-3" /> */}
          {/* <div className="row ">
            <div className="col-sm-12 mt-5 ">
              <b className="text-danger">Notes:</b>
              <p>
                This site is protected by reCAPTCHA and the Google Privacy
                Policy and Terms of Service apply.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
