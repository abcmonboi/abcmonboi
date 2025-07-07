import React, { memo, useEffect, useRef } from "react";
// import Slider from "react-slick";
import topic1 from "assets/images/topic-1.png";
import topic2 from "assets/images/topic-2.png";
import topic3 from "assets/images/topic-3.png";
import topic4 from "assets/images/topic-4.png";
import topic5 from "assets/images/topic-5.png";
import { Link } from "react-router-dom";
const BlogContent1 = () => {
  // const settings = {
  //   className: "center",
  //   // variableWidth: true,
  //   dots: false,
  //   focusOnSelect: true,
  //   pauseOnHover: true,
  //   arrows: false,
  //   autoplay: true,
  //   autoplaySpeed: 1600,
  //   infinite: true,
  //   speed: 700,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   responsive: [
  //     {
  //       breakpoint: 1424,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //         infinite: true,
  //       },
  //     },
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //         infinite: true,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         initialSlide: 1,
  //       },
  //     },
  //   ],
  // };
  const slider = useRef(null);
  const sliderContainer = useRef(null);
  const sliderPrevBtn = useRef(null);
  const sliderNextBtn = useRef(null);
  useEffect(() => {

  let totalSliderVisibleItems = "";

  if (slider?.current) {
    totalSliderVisibleItems = Number(
      getComputedStyle(slider?.current).getPropertyValue("--slider-items")
    );
  }
  let totalSlidableItems = "";
  if (sliderContainer?.current) {
    totalSlidableItems =
      sliderContainer?.current?.childElementCount - totalSliderVisibleItems;
  }
  let currentSlidePos = 0;

  const moveSliderItem = () => {
    if (sliderContainer?.current) {
      sliderContainer.current.style = `transform: translateX(-${sliderContainer?.current?.children[currentSlidePos]?.offsetLeft}px)`;
    }
  };
  const slideNext = () => {
    const slideEnd = currentSlidePos >= totalSlidableItems;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem();
  };
  if (sliderNextBtn.current) {
    sliderNextBtn.current.addEventListener("click", slideNext);
  }
  const slidePrev = () => {
    if (currentSlidePos <= 0) {
      currentSlidePos = totalSlidableItems;
    } else {
      currentSlidePos--;
    }

    moveSliderItem();
  };
  if (sliderPrevBtn.current) {
    sliderPrevBtn.current.addEventListener("click", slidePrev);
  }
  window.addEventListener("resize", function () {
    if (slider.current) {
      totalSliderVisibleItems =
        Number(
          getComputedStyle(slider?.current).getPropertyValue("--slider-items")
        ) || 1;
      totalSlidableItems =
        sliderContainer.current.childElementCount - totalSliderVisibleItems;
    }

    moveSliderItem();
  });
  } ,[slider])
  return (
    <section
      className="topics-blog pt-0 pb-0"
      id="topics-blog"
      aria-labelledby="topic-label"
    >
      <div className="container-blog">
        <div className="card-blog topic-card-blog">
          <div className="card-content-blog">
            <h2
              className="headline-blog headline-2-blog section-title-blog card-title-blog font-weight-normal"
              id="topic-label"
            >
              Chủ đề nổi bật
            </h2>
            <p className="card-text-blog font-weight-normal">
              Đừng bỏ lỡ những tin tức mới nhất về Cẩm nang du lịch, Review
              khách sạn, Hướng dẫn ẩm thực...
            </p>
            <div className="btn-group-blog">
              <button
                className="btn-icon-blog"
                aria-label="previous"
                data-slider-prev
                ref={sliderPrevBtn}
              >
                <i
                  className="las la-arrow-left font-size-18"
                  aria-hidden="true"
                ></i>
              </button>
              <button
                className="btn-icon-blog"
                aria-label="next"
                data-slider-next
                ref={sliderNextBtn}
              >
                <i
                  className="las la-arrow-right font-size-18"
                  aria-hidden="true"
                ></i>
              </button>
            </div>
          </div>
          <div className="slider-blog"
           ref={slider}
            data-slider>
              
                 {/* <Slider ref={slider} {...settings} className="slider-list-blog p-0 m-0">
               
              <li className="slider-item-blog">
                <a href="#" className="slider-card-blog">
                  <figure
                    className="slider-banner-blog img-holder-blog"
                  >
                    <img
                      src="../assets/images/topic-1.png"
                      width={507}
                      height={618}
                      
                      alt="Sport"
                      className="img-cover-blog"
                    />
                  </figure>
                  <div className="slider-content-blog">
                    <span className="slider-title-blog">Sport</span>
                    <p className="slider-subtitle-blog">38 Articles</p>
                  </div>
                </a>
              </li>
              <li className="slider-item-blog">
                <a href="#" className="slider-card-blog">
                  <figure
                    className="slider-banner-blog img-holder-blog"
                  >
                    <img
                      src="../assets/images/topic-2.png"
                      width={507}
                      height={618}
                      
                      alt="Travel"
                      className="img-cover-blog"
                    />
                  </figure>
                  <div className="slider-content-blog">
                    <span className="slider-title-blog">Travel</span>
                    <p className="slider-subtitle-blog">63 Articles</p>
                  </div>
                </a>
              </li>
              <li className="slider-item-blog">
                <a href="#" className="slider-card-blog">
                  <figure
                    className="slider-banner-blog img-holder-blog"
                  >
                    <img
                      src="../assets/images/topic-3.png"
                      width={507}
                      height={618}
                      
                      alt="Design"
                      className="img-cover-blog"
                    />
                  </figure>
                  <div className="slider-content-blog">
                    <span className="slider-title-blog">Design</span>
                    <p className="slider-subtitle-blog">78 Articles</p>
                  </div>
                </a>
              </li>
              <li className="slider-item-blog">
                <a href="#" className="slider-card-blog">
                  <figure
                    className="slider-banner-blog img-holder-blog"
                  >
                    <img
                      src="../assets/images/topic-4.png"
                      width={507}
                      height={618}
                      
                      alt="Movie"
                      className="img-cover-blog"
                    />
                  </figure>
                  <div className="slider-content-blog">
                    <span className="slider-title-blog">Movie</span>
                    <p className="slider-subtitle-blog">125 Articles</p>
                  </div>
                </a>
              </li>
              <li className="slider-item-blog">
                <a href="#" className="slider-card-blog">
                  <figure
                    className="slider-banner-blog img-holder-blog"
                  >
                    <img
                      src="../assets/images/topic-5.png"
                      width={507}
                      height={618}
                      
                      alt="Lifestyle"
                      className="img-cover-blog"
                    />
                  </figure>
                  <div className="slider-content-blog">
                    <span className="slider-title-blog">Lifestyle</span>
                    <p className="slider-subtitle-blog">78 Articles</p>
                  </div>
                </a>
              </li>
          
            </Slider> */}
            <ul
              className="slider-list-blog p-0 m-0"
              data-slider-container
              ref={sliderContainer}
            >
              <li className="slider-item-blog">
                <Link className="slider-card-blog">
                  <figure
                    className="slider-banner-blog img-holder-blog"
                  >
                    <img
                      src={topic1}
                      width={507}
                      height={618}
                      
                      alt="Sport"
                      className="img-cover-blog"
                    />
                  </figure>
                  <div className="slider-content-blog">
                    <span className="slider-title-blog">Sport</span>
                    <p className="slider-subtitle-blog">38 Articles</p>
                  </div>
                </Link>
              </li>
              <li className="slider-item-blog">
                <Link href="#" className="slider-card-blog">
                  <figure
                    className="slider-banner-blog img-holder-blog"
                  >
                    <img
                      src={topic2}
                      width={507}
                      height={618}
                      
                      alt="Travel"
                      className="img-cover-blog"
                    />
                  </figure>
                  <div className="slider-content-blog">
                    <span className="slider-title-blog">Travel</span>
                    <p className="slider-subtitle-blog">63 Articles</p>
                  </div>
                </Link>
              </li>
              <li className="slider-item-blog">
                <Link  className="slider-card-blog">
                  <figure
                    className="slider-banner-blog img-holder-blog"
                  >
                    <img
                      src={topic3}
                      width={507}
                      height={618}
                      
                      alt="Design"
                      className="img-cover-blog"
                    />
                  </figure>
                  <div className="slider-content-blog">
                    <span className="slider-title-blog">Design</span>
                    <p className="slider-subtitle-blog">78 Articles</p>
                  </div>
                </Link>
              </li>
              <li className="slider-item-blog">
                <Link className="slider-card-blog">
                  <figure
                    className="slider-banner-blog img-holder-blog"
                  >
                    <img
                      src={topic4}
                      width={507}
                      height={618}
                      
                      alt="Movie"
                      className="img-cover-blog"
                    />
                  </figure>
                  <div className="slider-content-blog">
                    <span className="slider-title-blog">Movie</span>
                    <p className="slider-subtitle-blog">125 Articles</p>
                  </div>
                </Link>
              </li>
              <li className="slider-item-blog">
                <Link className="slider-card-blog">
                  <figure
                    className="slider-banner-blog img-holder-blog"
                  >
                    <img
                      src={topic5}
                      width={507}
                      height={618}
                      
                      alt="Lifestyle"
                      className="img-cover-blog"
                    />
                  </figure>
                  <div className="slider-content-blog">
                    <span className="slider-title-blog">Lifestyle</span>
                    <p className="slider-subtitle-blog">78 Articles</p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(BlogContent1);
