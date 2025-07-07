import React, { memo } from 'react'
import banner from "assets/images/LOGO AUDIOBAY PNG.png";
import pat2  from 'assets/images/pattern-2.svg'
import pat3  from 'assets/images/pattern-3.svg'
const BlogBanner = () => {
  return (
    <section
    className="hero-blog pb-4"
    id="home-blog"
    aria-label="home"
  >
    <div className="container-blog">
      <div className="hero-content-blog ">
        <p className="hero-subtitle-blog m-0">Thư viện âm nhạc chất lượng cao</p>

        <h1 className="headline-blog headline-1-blog section-title-blog">
          AudioBay<span className="span-blog">' Blog</span>
        </h1>
        <p className="hero-text-blog text-black font-size-18 mb-0">
        Nhạc nền cho Video và những thủ thuật nâng tầm giá trị chất lượng sản phẩm cho các nhà sáng tạo nội dung số, Youtube, mạng xã hội, phim ảnh và các sự kiện "Sáng tạo và đột phá cùng âm nhạc của chúng tôi".
        </p>
        {/* <div className="input-wrapper-blog">
          <input
            type="email"
            name="email_address"
            placeholder="Type your email address"
            required
            className="input-field-blog p-0"
            autoComplete="off"
          />
          <button className="btn-blog d-flex align-items-center btn-primary-blog ">
            <span className="span-blog">Subscribe</span>
            <ion-icon
              name="arrow-forward-outline"
              aria-hidden="true"
            />
          </button>
        </div> */}
      </div>
      <div className="hero-banner-blog">
        <img
          // style={{
          //   objectFit: "cover",
          //   // width: "327px",
          //   // height: "490px",
          //   maxHeight: "490px",
          // }}
          // src="../assets/images/hero-banner.png"
          src={banner}
          // width={327}
          height={490}
          alt="AudioBay"
          className=" w-100-blog d-block border-primary rounded-circle"
        />
        <img
          src={pat2}
          width={27}
          height={26}
          alt="shape"
          className="shape-blog shape-1-blog"
        />
        <img
          src={pat3}
          width={27}
          height={26}
          alt="shape"
          className="shape-blog shape-2-blog"
        />
      </div>
      {/* <img
        src="../assets/images/shadow-1.svg"
        width={500}
        height={800}
        alt="anh"
        className="hero-bg hero-bg-1-blog"
      />
      <img
        src="../assets/images/shadow-2.svg"
        width={500}
        height={500}
        alt="anh"
        className="hero-bg hero-bg-2-blog"
      /> */}
    </div>
  </section>
  )
}

export default memo(BlogBanner)