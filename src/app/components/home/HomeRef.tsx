"use client";

import { SquaresFour } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

const HomeRef = () => {
  return (
    <section id="home" className="main intro">
      {/* Headline Start */}
      <div
        id="headline"
        className="headline flex items-start flex-col"
        data-speed={1}
        style={{
          translate: "none",
          rotate: "none",
          scale: "none",
          transform: "translate(0px, 0px)",
          // transform: "translate3d(0px, 0px, 0px)",
        }}
      >
        <p
          className="headline__subtitle animate-headline"
          style={{
            translate: "none",
            rotate: "none",
            scale: "none",
            opacity: 1,
            transform: "translate(0px, 0px)",
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
          <span>{`Let's meet!`}</span>
        </p>
        <h1
          className="headline__title animate-headline"
          style={{
            translate: "none",
            rotate: "none",
            scale: "none",
            opacity: 1,
            transform: "translate(0px, 0px)",
          }}
        >
          {`      I'm ABboy`}
          <br />
          Software engineerig and mores...
        </h1>
        <div className="headline__btnholder flex flex-col sm:flex-row ">
          <Link
            className="btn mobile-vertical btn-default btn-hover btn-hover-accent-mobile animate-headline"
            href="#portfolio"
            style={{
              translate: "none",
              rotate: "none",
              scale: "none",
              opacity: 1,
              transform: "translate(0px, 0px)",
            }}
          >
            <span className="btn-caption">My Works</span>
            {/* btn-hover-accent-mobile */}
            {/* <i className="ph-bold ph-squares-four" /> */}
            <div className="wrap-icon">
              <SquaresFour
                className="fill-[var(--t-bright)] hover:fill-red-500"
                style={{
                  filter:
                    "drop-shadow(0 0 var(--t-bright),drop-shadow(0 5rem var(--t-bright))",
                }}
                weight="bold"
              />
            </div>
          </Link>

          <a
            className="btn mobile-vertical btn-default btn-hover btn-hover-outline-mobile animate-headline"
            href="#0"
            style={{
              translate: "none",
              rotate: "none",
              scale: "none",
              opacity: 1,
              transform: "translate(0px, 0px)",
            }}
          >
            <span className="btn-caption">Download CV</span>
            <i className="ph-bold ph-download-simple" />
          </a>
        </div>
      </div>
      {/* Headline End */}
      {/* Scroll Button Start */}
      <div className="rotating-btn">
        <a href="#portfolio" className="rotating-btn__link slide-down">
          {/* SVG rotating text */}
          {/* arrow icon */}
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 120 120"
            style={{
              translate: "none",
              rotate: "none",
              scale: "none",
              transform: "rotate(360deg)",
            }}
            xmlSpace="preserve"
            className="animate-rotation"
            data-value={360}
          >
            <defs>
              <path
                id="textPath"
                d="M110,59.5c0,27.6-22.4,50-50,50s-50-22.4-50-50s22.4-50,50-50S110,31.9,110,59.5z"
              />
            </defs>
            <g>
              <use xlinkHref="#textPath" fill="none" />
              <text>
                {/* button text here!!! */}
                <textPath xlinkHref="#textPath">
                  Scroll for More * Scroll for More *{" "}
                </textPath>
              </text>
            </g>
          </svg>
          <i className="ph-bold ph-arrow-down" />
        </a>
      </div>
      {/* Scroll Button End */}
    </section>
  );
};

export default HomeRef;
