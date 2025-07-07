import React, { memo } from "react";
import logohblack from "assets/images/logo-headphone-black.svg";
import { Link } from "react-router-dom";
import { path } from "ultils/constant";

const BlogFooter = () => {
  return (
    <footer>
      <div className="container-blog">
        <div className="card-blog footer-blog">
          <div className="section-blog footer-top-blog">
            <div className="footer-brand-blog">
              <Link className="logo-blog">
                <img
                  src={logohblack}
                  style={{
                    maxHeight: "50px",
                    maxWidth: "119px",
                    width: "auto",
                    height: "auto",
                    objectFit: "cover",
                  }}
                  alt="Wren logo"
                />
              </Link>
              <p className="footer-text-blog mb-0">
                AudioBay - nền tảng âm nhạc và âm thanh đa dạng, từ miễn phí đến
                bản quyền. Khám phá và tận hưởng những bản nhạc chất lượng cao,
                phù hợp với mọi nhu cầu sáng tạo nội dung của bạn.
              </p>
              {/* <p className="footer-list-title-blog">Address</p>
            <address className="footer-text-blog address-blog">
              123 Main Street <br />
              New York, NY 10001
            </address> */}
            </div>
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
                  <p className="home_footer_link font-size-14">Top tìm kiếm</p>
                </div>
              </div>
              <div className="col">
                <div className="mt-lg-5 mb-lg-5">
                  <h4 className="text-black mb-3 font-size-20 font-weight-400 text-capitalize">
                    Cộng đồng
                  </h4>

                  <p className="home_footer_link font-size-14">
                    <Link to={path.BLOG} target="_blank">
                      Blog
                    </Link>
                  </p>
                  <p className="home_footer_link font-size-14">
                    <Link
                      to="https://www.facebook.com/groups/audiobay.net"
                      target="_blank"
                    >
                      Facebook Group
                    </Link>
                  </p>
                  <p className="home_footer_link font-size-14">
                    <Link to={path.ARTISTS} target="_blank">
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
                      to="https://www.facebook.com/musicproducer.vn"
                      target="_blank"
                    >
                      Sản xuất âm nhạc
                    </Link>
                  </p>
                  <p className="home_footer_link font-size-14">
                    <Link to="https://vprodpublishing.com" target="_blank">
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
                    className="home_footer_link font-size-14"
                  >
                    Giới thiệu
                  </Link>
                  </p>
                  <p className="home_footer_link font-size-14">
                  <Link className="home_footer_link font-size-14">
                    Câu hỏi thường gặp
                  </Link>
                  </p>
                  <p className="home_footer_link font-size-14">
                  <Link
                    to={path.LICENSE}
                    target="_blank"
                    className="home_footer_link font-size-14"
                  >
                    Thông tin bản quyền
                  </Link>
                  </p>
                  <p className="home_footer_link font-size-14">
                  <Link className="home_footer_link font-size-14">
                    Điều khoản sử dụng
                  </Link>
                  </p>
                  <p className="home_footer_link font-size-14">
                  <Link className="home_footer_link font-size-14">
                    Chính sách bảo mật
                  </Link>
                  </p>
                  <p className="home_footer_link font-size-14">
                  <Link
                    to={"https://www.facebook.com/audiobay.net"}
                    target="_blank"
                    className="home_footer_link font-size-14"
                  >
                    Liên hệ với chúng tôi
                  </Link>
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="footer-list-blog">
              <p className="footer-list-title-blog">Khám Phá</p>
              <ul className="p-0 t\">
                <li>
                  <a className="footer-link-blog hover-2-blog">
                  Lựa chọn của biên tập viên
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link-blog hover-2-blog">
                  Bộ sưu tập được tuyển chọn
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link-blog hover-2-blog">
                  Chủ đề âm nhạc phổ biến
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link-blog hover-2-blog">
                  Âm nhạc phổ biến
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link-blog hover-2-blog">
                  Hiệu ứng âm thanh phổ biến
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link-blog hover-2-blog">
                  Top tìm kiếm
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link-blog hover-2-blog">
                    Animal
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link-blog hover-2-blog">
                    Dental
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link-blog hover-2-blog">
                    Biology
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link-blog hover-2-blog">
                    Design
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link-blog hover-2-blog">
                    Breakfast
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link-blog hover-2-blog">
                    Dessert
                  </a>
                </li>
              </ul>
            </div> */}
            {/* <div className="footer-list-blog">
            <p className="footer-list-title-blog">Newsletter</p>
            <p className="footer-text-blog">
              Sign up to be first to receive the latest stories inspiring
              us, case studies, and industry news.
            </p>
            <div className="input-wrapper-blog">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                className="input-field-blog"
                autoComplete="off"
              />
              <ion-icon name="person-outline" aria-hidden="true" />
            </div>
            <div className="input-wrapper-blog">
              <input
                type="email"
                name="email_address"
                placeholder="Emaill address"
                required
                className="input-field-blog"
                autoComplete="off"
              />
              <ion-icon name="mail-outline" aria-hidden="true" />
            </div>
            <a href="#" className="btn-blog btn-primary-blog">
              <span className="span-blog">Subscribe</span>
              <ion-icon name="arrow-forward" aria-hidden="true" />
            </a>
          </div> */}
          </div>

          <div className="footer-bottom-blog">
            {/* <p className="copyright-blog">
              © AudioBay 2023.
              <a href="#" className="copyright-link-blog">
              All rights reserved
              </a>
            </p> */}
            <ul className="social-list-blog p-0">
              <li>
                <Link
                  to="https://www.facebook.com/audiobay.net"
                  target="_blank"
                  className="social-link-blog"
                >
                  <i className="ri-facebook-fill"></i>
                  <span className="span-blog">Facebook</span>
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.instagram.com/vprodmusic/"
                  target="_blank"
                  className="social-link-blog"
                >
                  <i className="ri-instagram-fill" />
                  <span className="span-blog">Instagram</span>
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.youtube.com/channel/UCRGSinHQSk1_vd0mN9gfR0A"
                  target="_blank"
                  className="social-link-blog"
                >
                  <i className="ri-youtube-fill" />
                  <span className="span-blog">Youtube</span>
                </Link>
              </li>
              <li>
                <Link
                  to="https://open.spotify.com/artist/51qOmzmBunnc4QRvDE1fHs"
                  target="_blank"
                  className="social-link-blog"
                >
                  <i className="ri-spotify-fill" />
                  <span className="span-blog">Spotify</span>
                </Link>
              </li>
              <li>
                <Link
                  to="https://music.apple.com/us/artist/vprod-music/1507262640"
                  target="_blank"
                  className="social-link-blog"
                >
                  <i className="ri-apple-fill" />
                  <span className="span-blog">Apple Music</span>
                </Link>
              </li>
              <li>
                <Link
                  to="https://music.amazon.com/artists/B086YHWTTJ/vprod-music"
                  target="_blank"
                  className="social-link-blog"
                >
                  <i className="ri-amazon-fill" />
                  <span className="span-blog">Amazon Music</span>
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.tiktok.com/@vprodmusicvn"
                  target="_blank"
                  className="social-link-blog"
                >
                  {/* <i className="ri-tiktok-line" /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="d-inline-block align-text-top"
                  >
                    <path
                      d="M16 8.24537V15.5C16 19.0899 13.0899 22 9.5 22C5.91015 22 3 19.0899 3 15.5C3 11.9101 5.91015 9 9.5 9C10.0163 9 10.5185 9.06019 11 9.17393V12.3368C10.5454 12.1208 10.0368 12 9.5 12C7.567 12 6 13.567 6 15.5C6 17.433 7.567 19 9.5 19C11.433 19 13 17.433 13 15.5V2H16C16 4.76142 18.2386 7 21 7V10C19.1081 10 17.3696 9.34328 16 8.24537Z"
                      fill="#4a525f"
                    ></path>
                  </svg>
                  <span className="span-blog">TikTok</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(BlogFooter);
