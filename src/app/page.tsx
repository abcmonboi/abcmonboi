import HomeRef from "@/app/components/home/HomeRef";

import workImg01 from "@/img/works/1400x1400_w01.webp";
import workImg02 from "@/img/works/800_w02-thumb.webp";
import workImg03 from "@/img/works/800_w03-thumb.webp";
import workImg04 from "@/img/works/800_w04-thumb.webp";

import avatart01 from "@/img/avatars/400x400_t01.webp";
import avatart02 from "@/img/avatars/400x400_t02.webp";

import services01 from "@/img/services/1200x900_s01.webp";
import services02 from "@/img/services/1200x900_s02.webp";
import services03 from "@/img/services/1200x900_s03.webp";
import services04 from "@/img/services/1200x900_s04.webp";

import iconPhotoshop from "@/img/icons/icon-photoshop.svg";
import iconFigma from "@/img/icons/icon-figma.svg";
import iconNotion from "@/img/icons/icon-notion.svg";
import iconCss from "@/img/icons/icon-css.svg";
import iconHtml from "@/img/icons/icon-html.svg";
import iconBlender from "@/img/icons/icon-blender.svg";
import iconScketch from "@/img/icons/icon-scketch.svg";
import iconIllustrator from "@/img/icons/icon-illustrator.svg";

export default function Home() {
  return (
    <div className="content__wrapper">
      {/* Intro Section Start */}
      <HomeRef />
      {/* Intro Section End */}
      {/* Portfolio Section Start */}
      <section id="portfolio" className="inner inner-first portfolio">
        {/* Content Block - H2 Section Title Start */}
        <div className="content__block section-grid-title">
          <p
            className="h2__subtitle animate-in-up"
            style={{
              translate: "none",
              rotate: "none",
              scale: "none",
              transform: "translate(0px, 0px)",
              opacity: 1,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="13px"
              height="13px"
              viewBox="0 0 13 13"
              fill="currentColor"
            >
              <path
                fill="currentColor"
                d="M5.6,12.6c-0.5-0.8-0.7-2.4-1.7-3.5c-1-1-2.7-1.2-3.5-1.7C-0.1,7-0.1,6,0.4,5.6c0.8-0.5,2.3-0.6,3.5-1.8
C5,2.8,5.1,1.2,5.6,0.4C6-0.1,7-0.1,7.4,0.4c0.5,0.8,0.7,2.4,1.8,3.5c1.2,1.2,2.6,1.2,3.5,1.7c0.6,0.4,0.6,1.4,0,1.7
C11.8,7.9,10.2,8,9.1,9.1c-1,1-1.2,2.7-1.7,3.5C7,13.1,6,13.1,5.6,12.6z"
              />
            </svg>
            <span>Portfolio</span>
          </p>
          <h2
            className="h2__title animate-in-up"
            style={{
              translate: "none",
              rotate: "none",
              scale: "none",
              transform: "translate(0px, 0px)",
              opacity: 1,
            }}
          >
            Check out my featured projects
          </h2>
        </div>
        {/* Content Block - H2 Section Title End */}
        {/* Content Block - Works Gallery Start */}
        <div className="content__block grid-block">
          <div className="container-fluid px-0 inner__gallery">
            <div
              className="row gx-0 my-gallery"
              itemScope
              itemType="http://schema.org/ImageGallery"
              data-pswp-uid={1}
            >
              {/* Works Gallery Single Item Start */}
              <figure
                className="col-12 col-md-6 gallery__item grid-item animate-card-2"
                itemProp="associatedMedia"
                itemScope
                itemType="http://schema.org/ImageObject"
                style={{
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  opacity: 1,
                  transform: "translate(0px, 0px)",
                }}
              >
                <a
                  href="img/works/1400x1400_w01.webp"
                  data-image={workImg01.src}
                  className="gallery__link"
                  itemProp="contentUrl"
                  data-size="1400x1400"
                >
                  <img
                    src={workImg01.src}
                    className="gallery__image"
                    itemProp="thumbnail"
                    alt="Image description"
                  />
                  <div
                    className="picture"
                    style={{
                      backgroundImage: `url(${workImg01.src})`,
                    }}
                  />
                </a>
                <figcaption
                  className="gallery__descr"
                  itemProp="caption description"
                >
                  <h5>Isometric House</h5>
                  <div className="card__tags d-flex flex-wrap">
                    <span className="rounded-tag opposite">Illustrations</span>
                    <span className="rounded-tag opposite">3D Render</span>
                  </div>
                  <p className="small">
                    Mauris porttitor lobortis ligula, quis molestie lorem
                    scelerisque eu. Morbi aliquam enim odio.
                  </p>
                </figcaption>
              </figure>
              {/* Works Gallery Single Item End */}
              {/* Works Gallery Single Item Start */}
              <figure
                className="col-12 col-md-6 gallery__item grid-item animate-card-2"
                itemProp="associatedMedia"
                itemScope
                itemType="http://schema.org/ImageObject"
                style={{
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  opacity: 1,
                  transform: "translate(0px, 0px)",
                }}
              >
                <a
                  href="img/works/1400x1400_w02.webp"
                  data-image="img/works/800_w02-thumb.webp"
                  className="gallery__link"
                  itemProp="contentUrl"
                  data-size="1400x1400"
                >
                  <img
                    src={workImg02.src}
                    className="gallery__image"
                    itemProp="thumbnail"
                    alt="Image description"
                  />
                  <div
                    className="picture"
                    style={{
                      backgroundImage: `url(${workImg02.src})`,
                    }}
                  />
                </a>
                <figcaption
                  className="gallery__descr opposite"
                  itemProp="caption description"
                >
                  <h5 className="opposite">Dashboard Template</h5>
                  <div className="card__tags d-flex flex-wrap">
                    <span className="rounded-tag">UI Design</span>
                    <span className="rounded-tag">Figma</span>
                  </div>
                  <p className="small">
                    Mauris porttitor lobortis ligula, quis molestie lorem
                    scelerisque eu. Morbi aliquam enim odio, a mollis ipsum
                    tristique eu.
                  </p>
                </figcaption>
              </figure>
              {/* Works Gallery Single Item End */}
              {/* Works Gallery Single Item Start */}
              <figure
                className="col-12 col-md-6 gallery__item grid-item animate-card-2"
                itemProp="associatedMedia"
                itemScope
                itemType="http://schema.org/ImageObject"
                style={{
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  opacity: 1,
                  transform: "translate(0px, 0px)",
                }}
              >
                <a
                  href="img/works/1400x1400_w03.webp"
                  data-image="img/works/800_w03-thumb.webp"
                  className="gallery__link"
                  itemProp="contentUrl"
                  data-size="1400x1400"
                >
                  <img
                    src={workImg03.src}
                    className="gallery__image"
                    itemProp="thumbnail"
                    alt="Image description"
                  />
                  <div
                    className="picture"
                    style={{
                      backgroundImage: `url(${workImg03.src})`,
                    }}
                  />
                </a>
                <figcaption
                  className="gallery__descr opposite"
                  itemProp="caption description"
                >
                  <h5 className="opposite">Notification Icon</h5>
                  <div className="card__tags d-flex flex-wrap">
                    <span className="rounded-tag">Illustrations</span>
                    <span className="rounded-tag">3D Render</span>
                  </div>
                  <p className="small">
                    Mauris porttitor lobortis ligula, quis molestie lorem
                    scelerisque eu. Morbi aliquam enim odio, a mollis ipsum
                    tristique eu.
                  </p>
                </figcaption>
              </figure>
              {/* Works Gallery Single Item End */}
              {/* Works Gallery Single Item Start */}
              <figure
                className="col-12 col-md-6 gallery__item grid-item animate-card-2"
                itemProp="associatedMedia"
                itemScope
                itemType="http://schema.org/ImageObject"
                style={{
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  opacity: 1,
                  transform: "translate(0px, 0px)",
                }}
              >
                <a
                  href="img/works/1400x1400_w04.webp"
                  data-image="img/works/800_w04-thumb.webp"
                  className="gallery__link"
                  itemProp="contentUrl"
                  data-size="1400x1400"
                >
                  <img
                    src={workImg04.src}
                    className="gallery__image"
                    itemProp="thumbnail"
                    alt="Image description"
                  />
                  <div
                    className="picture"
                    style={{
                      backgroundImage: `url(${workImg04.src})`,
                    }}
                  />
                </a>
                <figcaption
                  className="gallery__descr "
                  itemProp="caption description"
                >
                  <h5>Smart Penguin</h5>
                  <div className="card__tags d-flex flex-wrap">
                    <span className="rounded-tag opposite">Illustrations</span>
                    <span className="rounded-tag opposite">AI Experiment</span>
                  </div>
                  <p className="small">
                    Mauris porttitor lobortis ligula, quis molestie lorem
                    scelerisque eu. Morbi aliquam enim odio, a mollis ipsum
                    tristique eu.
                  </p>
                </figcaption>
              </figure>
              {/* Works Gallery Single Item End */}
            </div>
          </div>
        </div>
        {/* Content Block - Works Gallery End */}
      </section>
      {/* Portfolio Section End */}
      {/* About Section Start */}
      <section id="about" className="inner about">
        {/* Content Block - H2 Section Title Start */}
        <div className="content__block section-grid-title">
          <p
            className="h2__subtitle animate-in-up"
            style={{
              translate: "none",
              rotate: "none",
              scale: "none",
              transform: "translate(0px, 0px)",
              opacity: 1,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="13px"
              height="13px"
              viewBox="0 0 13 13"
              fill="currentColor"
            >
              <path
                fill="currentColor"
                d="M5.6,12.6c-0.5-0.8-0.7-2.4-1.7-3.5c-1-1-2.7-1.2-3.5-1.7C-0.1,7-0.1,6,0.4,5.6c0.8-0.5,2.3-0.6,3.5-1.8
C5,2.8,5.1,1.2,5.6,0.4C6-0.1,7-0.1,7.4,0.4c0.5,0.8,0.7,2.4,1.8,3.5c1.2,1.2,2.6,1.2,3.5,1.7c0.6,0.4,0.6,1.4,0,1.7
C11.8,7.9,10.2,8,9.1,9.1c-1,1-1.2,2.7-1.7,3.5C7,13.1,6,13.1,5.6,12.6z"
              />
            </svg>
            <span>About Me</span>
          </p>
          <h2
            className="h2__title animate-in-up"
            style={{
              translate: "none",
              rotate: "none",
              scale: "none",
              transform: "translate(0px, 0px)",
              opacity: 1,
            }}
          >
            Turning complex problems into simple design
          </h2>
        </div>
        {/* Content Block - H2 Section Title End */}
        {/* Content Block - Achievements Start */}
        <div className="content__block grid-block">
          <div className="achievements flex flex-col md:flex-row md:items-stretch">
            {/* achievements single item */}
            <div
              className="achievements__item flex flex-col grid-item animate-card-3"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                transform: "translate(0px, 0px)",
              }}
            >
              <div className="achievements__card">
                <p className="achievements__number">40+</p>
                <p className="achievements__descr">Happy clients</p>
              </div>
            </div>
            {/* achievements single item */}
            <div
              className="achievements__item d-flex flex-column grid-item animate-card-3"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                transform: "translate(0px, 0px)",
              }}
            >
              <div className="achievements__card">
                <p className="achievements__number">2+</p>
                <p className="achievements__descr">Years of experience</p>
              </div>
            </div>
            {/* achievements single item */}
            <div
              className="achievements__item d-flex flex-column grid-item animate-card-3"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                transform: "translate(0px, 0px)",
              }}
            >
              <div className="achievements__card">
                <p className="achievements__number">50+</p>
                <p className="achievements__descr">Projects done</p>
              </div>
            </div>
          </div>
        </div>
        {/* Content Block - Achievements End */}
        {/* Content Block - About Me Data Start */}
        <div className="content__block grid-block block-large">
          <div className="container-fluid p-0">
            <div className="row g-0 justify-content-between">
              {/* About Me Description Start */}
              <div className="col-12 col-xl-8 grid-item about-descr">
                <p
                  className="about-descr__text animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  {`   I wonder if I've been changed in the night? Let me think. Was
                  I the same when I got up this morning? I almost think I can
                  remember feeling a little different. But if I'm not the same,
                  the`}
                  <a href="#0" className="text-link">
                    next question
                  </a>
                  {`     is 'Who in the world am I?' Ah, that's the great puzzle!`}
                </p>
                <p
                  className="about-descr__text animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  {`  Be what you would seem to be - or, if you'd like it put more
                  simply - never imagine yourself not to be otherwise than what
                  it might appear to others that what you were or`}
                  <a href="#0" className="text-link">
                    might have been
                  </a>
                  was not otherwise than what you had been would have appeared
                  to them to be otherwise.
                </p>
                <div
                  className="btn-group about-descr__btnholder animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  <a
                    className="btn mobile-vertical btn-default btn-hover btn-hover-accent"
                    href="#0"
                  >
                    <span className="btn-caption">Download CV</span>
                    <i className="ph-bold ph-download-simple" />
                  </a>
                </div>
              </div>
              {/* About Me Description End */}
              {/* About Me Information Start */}
              <div className="col-12 col-xl-4 grid-item about-info">
                <div
                  className="about-info__item animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  <h6>
                    <small className="top">Name</small>
                    Alex Walker
                  </h6>
                </div>
                <div
                  className="about-info__item animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  <h6>
                    <small className="top">Phone</small>
                    <a className="text-link-bold" href="tel:+12127089400">
                      +1 212-708-9400
                    </a>
                  </h6>
                </div>
                <div
                  className="about-info__item animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  <h6>
                    <small className="top">Email</small>
                    <a
                      className="text-link-bold"
                      href="mailto:example@example.com?subject=Message%20from%20your%20site"
                    >
                      hello@yourdomain.com
                    </a>
                  </h6>
                </div>
                <div
                  className="about-info__item animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  <h6>
                    <small className="top">Location</small>
                    <a
                      className="text-link-bold"
                      href="https://maps.app.goo.gl/xMJXTEUeHkv6kYRQ6"
                      target="_blank"
                    >
                      Odesa, Ukraine
                    </a>
                  </h6>
                </div>
              </div>
              {/* About Me Information End */}
            </div>
          </div>
        </div>
        {/* Content Block - About Me Data End */}
        {/* Content Block - Services Start */}
        <div className="content__block grid-block">
          <div className="container-fluid p-0">
            <div className="row g-0 align-items-stretch cards">
              {/* services cards grid single item */}
              <div
                className="col-12 col-md-6 cards__item grid-item animate-card-2"
                style={{
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  opacity: 1,
                  transform: "translate(0px, 0px)",
                }}
              >
                <div className="cards__card d-flex flex-column">
                  <div className="cards__descr">
                    <h4
                      className="cards__title animate-in-up"
                      style={{
                        translate: "none",
                        rotate: "none",
                        scale: "none",
                        transform: "translate(0px, 0px)",
                        opacity: 1,
                      }}
                    >
                      Frontend
                      <br />
                      development
                    </h4>
                    <div
                      className="cards__tags d-flex flex-wrap animate-in-up"
                      style={{
                        translate: "none",
                        rotate: "none",
                        scale: "none",
                        transform: "translate(0px, 0px)",
                        opacity: 1,
                      }}
                    >
                      <span className="rounded-tag tag-outline">
                        UI/UX Design
                      </span>
                      <span className="rounded-tag tag-outline">
                        Design to Code
                      </span>
                    </div>
                    <p
                      className="small cards__text animate-in-up"
                      style={{
                        translate: "none",
                        rotate: "none",
                        scale: "none",
                        transform: "translate(0px, 0px)",
                        opacity: 1,
                      }}
                    >
                      I work with HTML/CSS, Framer and WordPress.
                    </p>
                  </div>
                  <div
                    className="cards__image d-flex animate-in-up"
                    style={{
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transform: "translate(0px, 0px)",
                      opacity: 1,
                    }}
                  >
                    <img src={services01.src} alt="Service/Feature Image" />
                  </div>
                </div>
              </div>
              {/* services grid cards single item */}
              <div
                className="col-12 col-md-6 cards__item grid-item animate-card-2"
                style={{
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  opacity: 1,
                  transform: "translate(0px, 0px)",
                }}
              >
                <div className="cards__card d-flex flex-column">
                  <div className="cards__descr">
                    <h4
                      className="cards__title animate-in-up"
                      style={{
                        translate: "none",
                        rotate: "none",
                        scale: "none",
                        transform: "translate(0px, 0px)",
                        opacity: 1,
                      }}
                    >
                      Digital art and graphic design
                    </h4>
                    <div
                      className="cards__tags d-flex flex-wrap animate-in-up"
                      style={{
                        translate: "none",
                        rotate: "none",
                        scale: "none",
                        transform: "translate(0px, 0px)",
                        opacity: 1,
                      }}
                    >
                      <span className="rounded-tag tag-outline">
                        Illustrations
                      </span>
                      <span className="rounded-tag tag-outline">
                        AI Experiments
                      </span>
                    </div>
                    <p
                      className="small cards__text animate-in-up"
                      style={{
                        translate: "none",
                        rotate: "none",
                        scale: "none",
                        transform: "translate(0px, 0px)",
                        opacity: 1,
                      }}
                    >
                      I use Adobe Photoshop, Fresco and Blender to create
                      illustrations and 3D renders for my clients and stocks.
                    </p>
                  </div>
                  <div
                    className="cards__image d-flex animate-in-up"
                    style={{
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transform: "translate(0px, 0px)",
                      opacity: 1,
                    }}
                  >
                    <img src={services02.src} alt="Service/Feature Image" />
                  </div>
                </div>
              </div>
              {/* services grid cards single item */}
              <div
                className="col-12 col-md-6 cards__item grid-item animate-card-2"
                style={{
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  opacity: 1,
                  transform: "translate(0px, 0px)",
                }}
              >
                <div className="cards__card d-flex flex-column">
                  <div className="cards__descr">
                    <h4
                      className="cards__title animate-in-up"
                      style={{
                        translate: "none",
                        rotate: "none",
                        scale: "none",
                        transform: "translate(0px, 0px)",
                        opacity: 1,
                      }}
                    >
                      SEO/Digital marketing solutions
                    </h4>
                    <div
                      className="cards__tags d-flex flex-wrap animate-in-up"
                      style={{
                        translate: "none",
                        rotate: "none",
                        scale: "none",
                        transform: "translate(0px, 0px)",
                        opacity: 1,
                      }}
                    >
                      <span className="rounded-tag tag-outline">
                        Social Media
                      </span>
                      <span className="rounded-tag tag-outline">Analytics</span>
                    </div>
                    <p
                      className="small cards__text animate-in-up"
                      style={{
                        translate: "none",
                        rotate: "none",
                        scale: "none",
                        transform: "translate(0px, 0px)",
                        opacity: 1,
                      }}
                    >
                      Social media content plans, media monitoring, email and
                      text messaging and search engine optimization.
                    </p>
                  </div>
                  <div className="cards__image d-flex">
                    <img src={services03.src} alt="Service/Feature Image" />
                  </div>
                </div>
              </div>
              {/* services grid cards single item */}
              <div
                className="col-12 col-md-6 cards__item grid-item animate-card-2"
                style={{
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  opacity: 1,
                  transform: "translate(0px, 0px)",
                }}
              >
                <div className="cards__card d-flex flex-column">
                  <div className="cards__descr">
                    <h4
                      className="cards__title animate-in-up"
                      style={{
                        translate: "none",
                        rotate: "none",
                        scale: "none",
                        transform: "translate(0px, 0px)",
                        opacity: 1,
                      }}
                    >
                      Brand
                      <br />
                      identity
                    </h4>
                    <div
                      className="cards__tags d-flex flex-wrap animate-in-up"
                      style={{
                        translate: "none",
                        rotate: "none",
                        scale: "none",
                        transform: "translate(0px, 0px)",
                        opacity: 1,
                      }}
                    >
                      <span className="rounded-tag tag-outline">
                        Logo Design
                      </span>
                      <span className="rounded-tag tag-outline">
                        Style Guides
                      </span>
                    </div>
                    <p
                      className="small cards__text animate-in-up"
                      style={{
                        translate: "none",
                        rotate: "none",
                        scale: "none",
                        transform: "translate(0px, 0px)",
                        opacity: 1,
                      }}
                    >
                      I help my clients to develop a personality and brand
                      voice, design the brand look and logo.
                    </p>
                  </div>
                  <div
                    className="cards__image d-flex animate-in-up"
                    style={{
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transform: "translate(0px, 0px)",
                      opacity: 1,
                    }}
                  >
                    <img src={services04.src} alt="Service/Feature Image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Content Block - Services End */}
      </section>
      {/* About Section End */}
      {/* Resume Section Start */}
      <section id="resume" className="inner resume">
        {/* Content Block - H2 Section Title Start */}
        <div className="content__block block-large">
          <p
            className="h2__subtitle animate-in-up"
            style={{
              translate: "none",
              rotate: "none",
              scale: "none",
              transform: "translate(0px, 0px)",
              opacity: 1,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="13px"
              height="13px"
              viewBox="0 0 13 13"
              fill="currentColor"
            >
              <path
                fill="currentColor"
                d="M5.6,12.6c-0.5-0.8-0.7-2.4-1.7-3.5c-1-1-2.7-1.2-3.5-1.7C-0.1,7-0.1,6,0.4,5.6c0.8-0.5,2.3-0.6,3.5-1.8
C5,2.8,5.1,1.2,5.6,0.4C6-0.1,7-0.1,7.4,0.4c0.5,0.8,0.7,2.4,1.8,3.5c1.2,1.2,2.6,1.2,3.5,1.7c0.6,0.4,0.6,1.4,0,1.7
C11.8,7.9,10.2,8,9.1,9.1c-1,1-1.2,2.7-1.7,3.5C7,13.1,6,13.1,5.6,12.6z"
              />
            </svg>
            <span>Resume</span>
          </p>
          <h2
            className="h2__title animate-in-up"
            style={{
              translate: "none",
              rotate: "none",
              scale: "none",
              transform: "translate(0px, 0px)",
              opacity: 1,
            }}
          >
            Education and practical experience
          </h2>
          <p
            className="h2__text animate-in-up"
            style={{
              translate: "none",
              rotate: "none",
              scale: "none",
              transform: "translate(0px, 0px)",
              opacity: 1,
            }}
          >
            {`    Be what you would seem to be - or, if you'd like it put more simply
            - never imagine yourself not to be otherwise than what it might
            appear to others that what you were or`}
            <a href="#0" className="text-link">
              might have been
            </a>
            was not otherwise than what you had been would have appeared to them
            to be otherwise.
          </p>
        </div>
        {/* Content Block - H2 Section Title End */}
        {/* Content Block - Education Start */}
        <div className="content__block block-large">
          {/* H3 Block Start */}
          <div className="section-h3">
            <h3
              className="h3__title animate-in-up"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                opacity: 1,
              }}
            >
              My education
            </h3>
          </div>
          {/* H3 Block End */}
          {/* Education Lines Start */}
          <div className="container-fluid p-0 resume-lines">
            {/* education single item */}
            <div
              className="row g-0 resume-lines__item animate-in-up"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                opacity: 1,
              }}
            >
              <div className="col-12 col-md-2">
                <span
                  className="resume-lines__date animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  2015 - 2016
                </span>
              </div>
              <div className="col-12 col-md-5">
                <h5
                  className="resume-lines__title animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  Drawing Concentration
                </h5>
                <p
                  className="resume-lines__source animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  Course by
                  <a href="#0" className="text-link-bold" target="_blank">
                    New York Academy of Art
                  </a>
                </p>
              </div>
              <div className="col-12 col-md-5">
                <p
                  className="small resume-lines__descr animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  Intensive drawing courses that present the fundamental
                  principles of drawing.
                </p>
              </div>
            </div>
            {/* education single item */}
            <div
              className="row g-0 resume-lines__item animate-in-up"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                opacity: 1,
              }}
            >
              <div className="col-12 col-md-2">
                <span
                  className="resume-lines__date animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  2019 - 2021
                </span>
              </div>
              <div className="col-12 col-md-5">
                <h5
                  className="resume-lines__title animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  UI/UX Design Specialization
                </h5>
                <p
                  className="resume-lines__source animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  Course by
                  <a href="#0" className="text-link-bold" target="_blank">
                    California Institute of Arts
                  </a>
                </p>
              </div>
              <div className="col-12 col-md-5">
                <p
                  className="small resume-lines__descr animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  Research, design, and prototype effective, visually-driven
                  websites and apps.
                </p>
              </div>
            </div>
            {/* education single item */}
            <div
              className="row g-0 resume-lines__item animate-in-up"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                opacity: 1,
              }}
            >
              <div className="col-12 col-md-2">
                <span
                  className="resume-lines__date animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  2022
                </span>
              </div>
              <div className="col-12 col-md-5">
                <h5
                  className="resume-lines__title animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  UI/UX Designer
                </h5>
                <p
                  className="resume-lines__source animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  {" "}
                  Course by
                  <a href="#0" className="text-link-bold" target="_blank">
                    Coursera
                  </a>
                </p>
              </div>
              <div className="col-12 col-md-5">
                <p
                  className="small resume-lines__descr animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  This cource is about how to complete the design process from
                  beginning to end.
                </p>
              </div>
            </div>
          </div>
          {/* Education Lines End */}
        </div>
        {/* Content Block - Education End */}
        {/* Content Block - Experience Start */}
        <div className="content__block block-large">
          {/* H3 Block Start */}
          <div className="section-h3">
            <h3
              className="h3__title animate-in-up"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                opacity: 1,
              }}
            >
              Work experience
            </h3>
          </div>
          {/* H3 Block End */}
          {/* Experience Lines Start */}
          <div className="container-fluid p-0 resume-lines">
            {/* experience single item */}
            <div
              className="row g-0 resume-lines__item animate-in-up"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                opacity: 1,
              }}
            >
              <div className="col-12 col-md-2">
                <span
                  className="resume-lines__date animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  2018 - 2019
                </span>
              </div>
              <div className="col-12 col-md-5">
                <h5
                  className="resume-lines__title animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  Illustrator
                </h5>
                <p
                  className="resume-lines__source animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  in the
                  <a href="#0" className="text-link-bold" target="_blank">
                    Creative Mind
                  </a>
                  agency
                </p>
              </div>
              <div className="col-12 col-md-5">
                <p
                  className="small resume-lines__descr animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  I created original images for a range of digital and printed
                  products.
                </p>
              </div>
            </div>
            {/* experience single item */}
            <div
              className="row g-0 resume-lines__item animate-in-up"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                opacity: 1,
              }}
            >
              <div className="col-12 col-md-2">
                <span
                  className="resume-lines__date animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  2019 - 2021
                </span>
              </div>
              <div className="col-12 col-md-5">
                <h5
                  className="resume-lines__title animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  Graphic Designer
                </h5>
                <p
                  className="resume-lines__source animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  in the
                  <a href="#0" className="text-link-bold" target="_blank">
                    Moon Light
                  </a>
                  agency
                </p>
              </div>
              <div className="col-12 col-md-5">
                <p
                  className="small resume-lines__descr animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  My job was to create adverts, branding, signage and other
                  media products.
                </p>
              </div>
            </div>
            {/* experience single item */}
            <div
              className="row g-0 resume-lines__item animate-in-up"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                opacity: 1,
              }}
            >
              <div className="col-12 col-md-2">
                <span
                  className="resume-lines__date animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  2021 - now
                </span>
              </div>
              <div className="col-12 col-md-5">
                <h5
                  className="resume-lines__title animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  UI/UX Designer
                </h5>
                <p
                  className="resume-lines__source animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  in the
                  <a href="#0" className="text-link-bold" target="_blank">
                    Moon Light
                  </a>
                  agency
                </p>
              </div>
              <div className="col-12 col-md-5">
                <p
                  className="small resume-lines__descr animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  I am actively involved in creating user interfaces for mobile
                  apps and websites.
                </p>
              </div>
            </div>
          </div>
          {/* Experience Lines End */}
        </div>
        {/* Content Block - Experience End */}
        {/* Content Block - H3 Block Start */}
        <div className="content__block">
          <div className="section-h3 section-h3-grid">
            <h3
              className="h3__title animate-in-up"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                opacity: 1,
              }}
            >
              My favourite tools
            </h3>
          </div>
        </div>
        {/* Content Block - H3 Block End */}
        {/* Content Block - Tools List Start */}
        <div className="content__block grid-block block-large">
          {/* Tools List Start */}
          <div className="tools-cards flex justify-start flex-wrap">
            {/* tools simgle item */}
            <div
              className="tools-cards__item flex grid-item-s animate-card-5"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                transform: "translate(0px, 0px)",
              }}
            >
              <div className="tools-cards__card">
                <img
                  className="tools-cards__icon animate-in-up"
                  src={iconPhotoshop.src}
                  alt="Tools Icon"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                />
                <h6
                  className="tools-cards__caption animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  Photoshop
                </h6>
              </div>
            </div>
            {/* tools simgle item */}
            <div
              className="tools-cards__item flex grid-item-s animate-card-5"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                transform: "translate(0px, 0px)",
              }}
            >
              <div className="tools-cards__card">
                <img
                  className="tools-cards__icon animate-in-up"
                  src={iconFigma.src}
                  alt="Tools Icon"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                />
                <h6
                  className="tools-cards__caption animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  Figma
                </h6>
              </div>
            </div>
            {/* tools simgle item */}
            <div
              className="tools-cards__item d-flex grid-item-s animate-card-5"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                transform: "translate(0px, 0px)",
              }}
            >
              <div className="tools-cards__card">
                <img
                  className="tools-cards__icon animate-in-up"
                  src={iconIllustrator.src}
                  alt="Tools Icon"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                />

                <h6
                  className="tools-cards__caption animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  Illustrator
                </h6>
              </div>
            </div>
            {/* tools simgle item */}
            <div
              className="tools-cards__item d-flex grid-item-s animate-card-5"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                transform: "translate(0px, 0px)",
              }}
            >
              <div className="tools-cards__card">
                <img
                  className="tools-cards__icon animate-in-up"
                  src={iconScketch.src}
                  alt="Tools Icon"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                />
                <h6
                  className="tools-cards__caption animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  Sketch
                </h6>
              </div>
            </div>
            {/* tools simgle item */}
            <div
              className="tools-cards__item d-flex grid-item-s animate-card-5"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                transform: "translate(0px, 0px)",
              }}
            >
              <div className="tools-cards__card">
                <img
                  className="tools-cards__icon animate-in-up"
                  src={iconBlender.src}
                  alt="Tools Icon"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                />
                <h6
                  className="tools-cards__caption animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  Blender
                </h6>
              </div>
            </div>
            {/* tools simgle item */}
            <div
              className="tools-cards__item d-flex grid-item-s animate-card-5"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                transform: "translate(0px, 0px)",
              }}
            >
              <div className="tools-cards__card">
                <img
                  className="tools-cards__icon animate-in-up"
                  src={iconHtml.src}
                  alt="Tools Icon"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                />
                <h6
                  className="tools-cards__caption animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  HTML5
                </h6>
              </div>
            </div>
            {/* tools simgle item */}
            <div
              className="tools-cards__item d-flex grid-item-s animate-card-5"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                transform: "translate(0px, 0px)",
              }}
            >
              <div className="tools-cards__card">
                <img
                  className="tools-cards__icon animate-in-up"
                  src={iconCss.src}
                  alt="Tools Icon"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                />
                <h6
                  className="tools-cards__caption animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  CSS3
                </h6>
              </div>
            </div>
            {/* tools simgle item */}
            <div
              className="tools-cards__item d-flex grid-item-s animate-card-5"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                transform: "translate(0px, 0px)",
              }}
            >
              <div className="tools-cards__card">
                <img
                  className="tools-cards__icon animate-in-up"
                  src={iconNotion.src}
                  alt="Tools Icon"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                />
                <h6
                  className="tools-cards__caption animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  Notion
                </h6>
              </div>
            </div>
          </div>
          {/* Tools List End */}
        </div>
        {/* Content Block - Tools List End */}
        {/* Content Block - H2 Block Start */}
        <div className="content__block section-title">
          <p
            className="h2__subtitle animate-in-up"
            style={{
              translate: "none",
              rotate: "none",
              scale: "none",
              transform: "translate(0px, 0px)",
              opacity: 1,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="13px"
              height="13px"
              viewBox="0 0 13 13"
              fill="currentColor"
            >
              <path
                fill="currentColor"
                d="M5.6,12.6c-0.5-0.8-0.7-2.4-1.7-3.5c-1-1-2.7-1.2-3.5-1.7C-0.1,7-0.1,6,0.4,5.6c0.8-0.5,2.3-0.6,3.5-1.8
C5,2.8,5.1,1.2,5.6,0.4C6-0.1,7-0.1,7.4,0.4c0.5,0.8,0.7,2.4,1.8,3.5c1.2,1.2,2.6,1.2,3.5,1.7c0.6,0.4,0.6,1.4,0,1.7
C11.8,7.9,10.2,8,9.1,9.1c-1,1-1.2,2.7-1.7,3.5C7,13.1,6,13.1,5.6,12.6z"
              />
            </svg>
            <span>Testimonials</span>
          </p>
          <h2
            className="h2__title animate-in-up"
            style={{
              translate: "none",
              rotate: "none",
              scale: "none",
              transform: "translate(0px, 0px)",
              opacity: 1,
            }}
          >
            Clients say about me
          </h2>
        </div>
        {/* Content Block - H2 Block End */}
        {/* Content Block - Testimonials Slider Start */}
        <div className="content__block">
          {/* Testimonials Slider Start */}
          <div className="testimonials-slider">
            {/* slider main container */}
            <div className="swiper-testimonials swiper-initialized swiper-horizontal swiper-backface-hidden">
              {/* additional required wrapper */}
              <div
                className="swiper-wrapper"
                id="swiper-wrapper-8ee6a9018037ee10f"
                aria-live="off"
                style={{
                  transitionDuration: "0ms",
                  transform: "translate3d(-677px, 0px, 0px)",
                  transitionDelay: "0ms",
                }}
              >
                {/* slides */}
                <div
                  className="swiper-slide swiper-slide-next swiper-slide-prev"
                  role="group"
                  aria-label="1 / 2"
                  data-swiper-slide-index={0}
                  style={{ width: 657, marginRight: 20 }}
                >
                  <div
                    className="testimonials-card animate-in-up"
                    style={{
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transform: "translate(0px, 0px)",
                      opacity: 1,
                    }}
                  >
                    <div
                      className="testimonials-card__tauthor d-flex animate-in-up"
                      style={{
                        translate: "none",
                        rotate: "none",
                        scale: "none",
                        transform: "translate(0px, 0px)",
                        opacity: 1,
                      }}
                    >
                      <div className="tauthor__avatar">
                        <img src={avatart01.src} alt="Review Author" />
                      </div>
                      <div className="tauthor__info d-flex flex-column justify-content-center">
                        <p className="tauthor__name">Alex Tomato</p>
                        <p className="tauthor__position">
                          Brand Manager in
                          <a
                            href="#0"
                            className="text-link-bold"
                            target="_blank"
                          >
                            Instant Design
                          </a>
                        </p>
                        <div className="tauthor__rating d-flex">
                          <i className="ph-fill ph-star" />
                          <i className="ph-fill ph-star" />
                          <i className="ph-fill ph-star" />
                          <i className="ph-fill ph-star" />
                          <i className="ph-fill ph-star" />
                        </div>
                      </div>
                    </div>
                    <div
                      className="testimonials-card__descr animate-in-up"
                      style={{
                        translate: "none",
                        rotate: "none",
                        scale: "none",
                        transform: "translate(0px, 0px)",
                        opacity: 1,
                      }}
                    >
                      <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                        dolore magna aliquam erat volutpat. Ut wisi enim ad
                        minim veniam, quis nostrud. Dolore magna aliquam.
                      </p>
                    </div>
                    <div
                      className="testimonials-card__btnholder animate-in-up"
                      style={{
                        translate: "none",
                        rotate: "none",
                        scale: "none",
                        transform: "translate(0px, 0px)",
                        opacity: 1,
                      }}
                    >
                      <a
                        className="btn mobile-vertical btn-line btn-transparent slide-right"
                        href="#0"
                      >
                        <span className="btn-caption">Project Page</span>
                        <i className="ph-bold ph-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="swiper-slide swiper-slide-active"
                  role="group"
                  aria-label="2 / 2"
                  data-swiper-slide-index={1}
                  style={{ width: 657, marginRight: 20 }}
                >
                  <div
                    className="testimonials-card  animate-in-up"
                    style={{
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transform: "translate(0px, 0px)",
                      opacity: 1,
                    }}
                  >
                    <div
                      className="testimonials-card__tauthor d-flex  animate-in-up"
                      style={{
                        translate: "none",
                        rotate: "none",
                        scale: "none",
                        transform: "translate(0px, 0px)",
                        opacity: 1,
                      }}
                    >
                      <div className="tauthor__avatar">
                        <img src={avatart02.src} alt="Review Author" />
                      </div>
                      <div className="tauthor__info d-flex flex-column justify-content-center">
                        <p className="tauthor__name">Jenny Pineapple</p>
                        <p className="tauthor__position">
                          SEO in
                          <a
                            href="#0"
                            className="text-link-bold"
                            target="_blank"
                          >
                            Creative People
                          </a>
                        </p>
                        <div className="tauthor__rating d-flex">
                          <i className="ph-fill ph-star" />
                          <i className="ph-fill ph-star" />
                          <i className="ph-fill ph-star" />
                          <i className="ph-fill ph-star" />
                          <i className="ph-fill ph-star" />
                        </div>
                      </div>
                    </div>
                    <div
                      className="testimonials-card__descr animate-in-up"
                      style={{
                        translate: "none",
                        rotate: "none",
                        scale: "none",
                        transform: "translate(0px, 0px)",
                        opacity: 1,
                      }}
                    >
                      <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                        dolore magna aliquam erat volutpat. Ut wisi enim ad
                        minim veniam, quis nostrud. Dolore magna aliquam.
                      </p>
                    </div>
                    <div
                      className="testimonials-card__btnholder animate-in-up"
                      style={{
                        translate: "none",
                        rotate: "none",
                        scale: "none",
                        transform: "translate(0px, 0px)",
                        opacity: 1,
                      }}
                    >
                      <a
                        className="btn mobile-vertical btn-line btn-transparent slide-right"
                        href="#0"
                      >
                        <span className="btn-caption">Project Page</span>
                        <i className="ph-bold ph-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* navigation buttons */}
              <div
                className="swiper-button-prev mxd-slider-btn-square mxd-slider-btn-square-prev animate-in-up"
                style={{
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  transform: "translate(0px, 0px)",
                  opacity: 1,
                }}
                tabIndex={0}
                role="button"
                aria-label="Previous slide"
                aria-controls="swiper-wrapper-8ee6a9018037ee10f"
              >
                <a
                  className="btn btn-square btn-square-s btn-outline slide-left"
                  href="#0"
                >
                  <i className="ph-bold ph-caret-left" />
                </a>
              </div>
              <div
                className="swiper-button-next mxd-slider-btn-square mxd-slider-btn-square-next animate-in-up"
                style={{
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  transform: "translate(0px, 0px)",
                  opacity: 1,
                }}
                tabIndex={0}
                role="button"
                aria-label="Next slide"
                aria-controls="swiper-wrapper-8ee6a9018037ee10f"
              >
                <a
                  className="btn btn-square btn-square-s btn-outline slide-right"
                  href="#0"
                >
                  <i className="ph-bold ph-caret-right" />
                </a>
              </div>
              <span
                className="swiper-notification"
                aria-live="assertive"
                aria-atomic="true"
              />
            </div>
          </div>
          {/* Testimonials Slider End */}
        </div>
        {/* Content Block - Testimonials Slider End */}
      </section>
      {/* Resume Section End */}
      {/* Contact Section Start */}
      <section id="contact" className="inner contact">
        {/* Content Block - H2 Section Title Start */}
        <div className="content__block section-title">
          <p
            className="h2__subtitle  animate-in-up"
            style={{
              translate: "none",
              rotate: "none",
              scale: "none",
              transform: "translate(0px, 0px)",
              opacity: 1,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="13px"
              height="13px"
              viewBox="0 0 13 13"
              fill="currentColor"
            >
              <path
                fill="currentColor"
                d="M5.6,12.6c-0.5-0.8-0.7-2.4-1.7-3.5c-1-1-2.7-1.2-3.5-1.7C-0.1,7-0.1,6,0.4,5.6c0.8-0.5,2.3-0.6,3.5-1.8
C5,2.8,5.1,1.2,5.6,0.4C6-0.1,7-0.1,7.4,0.4c0.5,0.8,0.7,2.4,1.8,3.5c1.2,1.2,2.6,1.2,3.5,1.7c0.6,0.4,0.6,1.4,0,1.7
C11.8,7.9,10.2,8,9.1,9.1c-1,1-1.2,2.7-1.7,3.5C7,13.1,6,13.1,5.6,12.6z"
              />
            </svg>
            <span>Contact</span>
          </p>
          <h2
            className="h2__title  animate-in-up"
            style={{
              translate: "none",
              rotate: "none",
              scale: "none",
              transform: "translate(0px, 0px)",
              opacity: 1,
            }}
          >
            {` Let's make something awesome together!`}
          </h2>
        </div>
        {/* Content Block - H2 Section Title End */}
        {/* Content Block - Contact Form Start */}
        <div className="content__block grid-block block-grid-large">
          <div className="form-container">
            {/* Reply Messages Start */}
            <div className="form__reply centered text-center">
              <i className="ph-bold ph-smiley reply__icon" />
              <p className="reply__title">Done!</p>
              <span className="reply__text">
                {`Thanks for your message. I'll get back as soon as possible.`}
              </span>
            </div>
            {/* Reply Messages End */}
            {/* Contact Form Start */}
            <form className="form contact-form" id="contact-form">
              {/* Hidden Required Fields */}
              <input
                type="hidden"
                name="project_name"
                defaultValue="Starter Template"
              />
              <input
                type="hidden"
                name="admin_email"
                defaultValue="support@mixdesign.club"
              />
              <input
                type="hidden"
                name="form_subject"
                defaultValue="Contact Form Message"
              />
              {/* END Hidden Required Fields*/}
              <div className="container-fluid p-0">
                <div className="row gx-0">
                  <div
                    className="col-12 col-md-6 form__item animate-in-up"
                    style={{
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transform: "translate(0px, 0px)",
                      opacity: 1,
                    }}
                  >
                    <input
                      type="text"
                      name="Name"
                      placeholder="Your Name*"
                      required
                    />
                  </div>
                  <div
                    className="col-12 col-md-6 form__item animate-in-up"
                    style={{
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transform: "translate(0px, 0px)",
                      opacity: 1,
                    }}
                  >
                    <input
                      type="text"
                      name="Company"
                      placeholder="Company Name"
                    />
                  </div>
                  <div
                    className="col-12 col-md-6 form__item animate-in-up"
                    style={{
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transform: "translate(0px, 0px)",
                      opacity: 1,
                    }}
                  >
                    <input
                      type="email"
                      name="E-mail"
                      placeholder="Email Adress*"
                      required
                    />
                  </div>
                  <div
                    className="col-12 col-md-6 form__item animate-in-up"
                    style={{
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transform: "translate(0px, 0px)",
                      opacity: 1,
                    }}
                  >
                    <input
                      type="tel"
                      name="Phone"
                      placeholder="Phone Number*"
                      required
                    />
                  </div>
                  <div
                    className="col-12 form__item animate-in-up"
                    style={{
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transform: "translate(0px, 0px)",
                      opacity: 1,
                    }}
                  >
                    <textarea
                      name="Message"
                      placeholder="A Few Words*"
                      required
                      defaultValue={""}
                    />
                  </div>
                  <div
                    className="col-12 form__item animate-in-up"
                    style={{
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transform: "translate(0px, 0px)",
                      opacity: 1,
                    }}
                  >
                    <button
                      className="btn btn-default btn-hover btn-hover-accent"
                      type="submit"
                    >
                      <span className="btn-caption">Send Message</span>
                      <i className="ph-bold ph-paper-plane-tilt" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
            {/* Contact Form End */}
          </div>
        </div>
        {/* Content Block - Contact Form End */}
        {/* Content Block - Socials Cards Start */}
        <div className="content__block grid-block">
          <div className="socials-cards d-flex justify-content-start flex-wrap">
            {/* socials item */}
            <div
              className="socials-cards__item d-flex grid-item-s animate-card-5"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                transform: "translate(0px, 0px)",
              }}
            >
              <div className="socials-cards__card">
                <i className="ph-bold ph-dribbble-logo" />
                <a
                  className="socials-cards__link"
                  href="https://dribbble.com/"
                  target="_blank"
                />
              </div>
            </div>
            {/* socials item */}
            <div
              className="socials-cards__item d-flex grid-item-s animate-card-5"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                transform: "translate(0px, 0px)",
              }}
            >
              <div className="socials-cards__card">
                <i className="ph-bold ph-behance-logo" />
                <a
                  className="socials-cards__link"
                  href="https://www.behance.net/"
                  target="_blank"
                />
              </div>
            </div>
            {/* socials item */}
            <div
              className="socials-cards__item d-flex grid-item-s animate-card-5"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                transform: "translate(0px, 0px)",
              }}
            >
              <div className="socials-cards__card">
                <i className="ph-bold ph-instagram-logo" />
                <a
                  className="socials-cards__link"
                  href="https://www.instagram.com/"
                  target="_blank"
                />
              </div>
            </div>
            {/* socials item */}
            <div
              className="socials-cards__item d-flex grid-item-s animate-card-5"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                transform: "translate(0px, 0px)",
              }}
            >
              <div className="socials-cards__card">
                <i className="ph-bold ph-twitch-logo" />
                <a
                  className="socials-cards__link"
                  href="https://www.twitch.tv/"
                  target="_blank"
                />
              </div>
            </div>
            {/* socials item */}
            <div
              className="socials-cards__item d-flex grid-item-s animate-card-5"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                transform: "translate(0px, 0px)",
              }}
            >
              <div className="socials-cards__card">
                <i className="ph-bold ph-pinterest-logo" />
                <a
                  className="socials-cards__link"
                  href="https://www.pinterest.com/"
                  target="_blank"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Content Block - Socials Cards End */}
        {/* Content Block - Teaser Start */}
        <div className="content__block">
          <div className="teaser">
            <p
              className="teaser__text animate-in-up"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                opacity: 1,
              }}
            >
              Want to know more about me, tell me about your project or just to
              say hello?
              <a
                className="text-link-bold"
                href="mailto:example@example.com?subject=Message%20from%20your%20site"
              >
                Drop me a line
              </a>
              {`and I'll get back as soon as possible.`}
            </p>
          </div>
        </div>
        {/* Content Block - Teaser End */}
        {/* Content Block - Contact Data Start */}
        <div className="content__block">
          <div
            className="container-fluid p-0 contact-lines animate-in-up"
            style={{
              translate: "none",
              rotate: "none",
              scale: "none",
              transform: "translate(0px, 0px)",
              opacity: 1,
            }}
          >
            <div className="row g-0 contact-lines__item">
              {/* data item */}
              <div className="col-12 col-md-4 contact-lines__data">
                <p
                  className="contact-lines__title animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  Location
                </p>
                <p
                  className="contact-lines__text animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  <a
                    className="text-link-bold"
                    href="https://maps.app.goo.gl/xMJXTEUeHkv6kYRQ6"
                    target="_blank"
                  >
                    Odesa, Ukraine
                  </a>
                </p>
              </div>
              {/* data item */}
              <div className="col-12 col-md-4 contact-lines__data">
                <p
                  className="contact-lines__title animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  Phone
                </p>
                <p
                  className="contact-lines__text animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  <a className="text-link-bold" href="tel:+12127089400">
                    +1 212-708-9400
                  </a>
                </p>
              </div>
              {/* data item */}
              <div className="col-12 col-md-4 contact-lines__data">
                <p
                  className="contact-lines__title animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  Email
                </p>
                <p
                  className="contact-lines__text animate-in-up"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  <a
                    className="text-link-bold"
                    href="mailto:example@example.com?subject=Message%20from%20your%20site"
                  >
                    hello@alexwalker.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Content Block - Contact Data End */}
      </section>
      {/* Contact Section End */}
    </div>
  );
}
