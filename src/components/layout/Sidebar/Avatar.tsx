"use client";

import React, { useState } from "react";
import avatar from "@/img/avatars/1024x1024_a.jpg";
import avatar01 from "@/img/avatars/1024x1024_a01.jpg";
import avatar02 from "@/img/avatars/1024x1024_a02.jpg";
import avatar03 from "@/img/avatars/1024x1024_a03.jpg";
import avatar04 from "@/img/avatars/1024x1024_a04.jpg";
import avatar05 from "@/img/avatars/1024x1024_a05.jpg";
import avatar06 from "@/img/avatars/1024x1024_a06.jpg";
import avatar07 from "@/img/avatars/1024x1024_a07.jpg";
import avatar08 from "@/img/avatars/1024x1024_a08.jpg";
import avatar09 from "@/img/avatars/1024x1024_a09.jpg";
import avatar10 from "@/img/avatars/1024x1024_a10.jpg";
import avatar11 from "@/img/avatars/1024x1024_a11.jpg";
import avatar12 from "@/img/avatars/1024x1024_a12.jpg";
import avatar13 from "@/img/avatars/1024x1024_a13.jpg";
import avatar14 from "@/img/avatars/1024x1024_a14.jpg";
import avatar15 from "@/img/avatars/1024x1024_a15.jpg";
import avatar16 from "@/img/avatars/1024x1024_a16.jpg";

import Link from "next/link";
import {
  BehanceLogo,
  FacebookLogo,
  InstagramLogo,
  PinterestLogo,
  TwitchLogo,
} from "@phosphor-icons/react";
import Image from "next/image";

type SocialLinkType = {
  label?: string;
  icon?: React.ReactNode;
  url: string;
};

const avatars = [
  avatar,
  avatar01,
  avatar02,
  avatar03,
  avatar04,
  avatar05,
  avatar06,
  avatar07,
  avatar08,
  avatar09,
  avatar10,
  avatar11,
  avatar12,
  avatar13,
  avatar14,
  avatar15,
  avatar16,
];

const Avatar = () => {
  const socials: SocialLinkType[] = [
    {
      label: "Dribbble",
      icon: <FacebookLogo weight="fill" size={18} />,
      url: "https://www.facebook.com/ABboyPD/",
    },
    {
      label: "Behance",
      icon: <BehanceLogo weight="bold" size={18} />,
      url: "https://www.behance.net/",
    },
    {
      label: "Instagram",
      icon: <InstagramLogo weight="bold" size={18} />,
      url: "https://www.instagram.com/",
    },
    {
      label: "Twitch",
      icon: <TwitchLogo weight="bold" size={18} />,
      url: "https://www.twitch.tv/",
    },
    {
      label: "Pinterest",
      icon: <PinterestLogo weight="bold" size={18} />,
      url: "https://www.pinterest.com/",
    },
  ];

  const [currentAvatar, setCurrentAvatar] = useState(avatar15);
  const [isVisible, setIsVisible] = useState(true);
  const [lastIndex, setLastIndex] = useState(15);

  const toggleAvatar = () => {
    setIsVisible(false); // Ẩn ảnh hiện tại
    setTimeout(() => {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * avatars.length); // Tạo số ngẫu nhiên từ 0 đến 12
      } while (randomIndex === lastIndex); // Kiểm tra nếu số ngẫu nhiên giống số trước đó

      setLastIndex(randomIndex); // Cập nhật số index trước đó
      setCurrentAvatar(avatars[randomIndex]); // Cập nhật ảnh ngẫu nhiên
      setIsVisible(true); // Hiện ảnh mới
    }, 200); // Thời gian để ẩn ảnh (300ms)
  };

  return (
    <div id="avatar" className="avatar">
      <div className="avatar__container flex flex-col justify-content-lg-between justify-between">
        <div className="avatar__block">
          <div className="avatar__logo flex items-center">
            <div className="logo__image">
              {/* Your Logo Here!!! */}
              {/*<img src="img/logo.svg" alt="Braxton - Personal Portfolio & Resume HTML Template Logo">*/}
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="85px"
                height="85px"
                viewBox="0 0 85 85"
                style={{ enableBackground: "new 0 0 85 85" }}
                xmlSpace="preserve"
                className="gradient-fill"
              >
                <style
                  type="text/css"
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n              .gradient-fill {\n                fill: url(#gradientFill);\n              }\n            ",
                  }}
                />
                <g>
                  <linearGradient
                    id="gradientFill"
                    gradientUnits="userSpaceOnUse"
                    x1="9.9604"
                    y1="75.0338"
                    x2="75.0387"
                    y2="9.9555"
                  >
                    <stop offset={0} style={{ stopColor: "var(--accent)" }} />
                    <stop
                      offset={1}
                      style={{ stopColor: "var(--secondary)" }}
                    />
                  </linearGradient>
                  <path
                    className="gradient-fill"
                    d="M51,0H34C15.2,0,0,15.2,0,34v17c0,14.3,8.9,26.6,21.4,31.6c0,0,0,0,0,0l0,0C25.3,84.1,29.5,85,34,85h17
c6,0,11.7-1.6,16.6-4.3c0.1-0.1,0.2-0.1,0.3-0.2C78.1,74.6,85,63.6,85,51V34C85,15.2,69.8,0,51,0z M83,51c0,10.7-5.3,20.2-13.4,26
v-2.5v-3.9h3.9v-3.9h-3.9v-3.9h3.9v-3.9h-3.9H67v-3.9V51h-3.9v3.9v3.9h2.6v3.9v3.9v3.9h-3.9h-3.9v3.9h3.9h3.9v3.9v1
C61.3,81.7,56.3,83,51,83H34c-4.5,0-8.7-0.9-12.6-2.6v-2v-3.9h3.9h3.9v-3.9h-3.9h-3.9v-3.9v-3.9v-3.9H24v-3.9V51h-3.9v3.9v3.9h-2.6
h-3.9v3.9h3.9v3.9h-3.9v3.9h3.9v3.9v3.9C8.2,72.8,2,62.6,2,51V34C2,16.4,16.4,2,34,2h17c17.6,0,32,14.4,32,32V51z M50.1,54.9H54
v3.9v3.9h-3.9v-3.9V54.9z M33.1,54.9H37v3.9v3.9h-3.9v-3.9V54.9z M27.9,51H24v-3.9v-3.9v-3.9h3.9v3.9v3.9V51z M31.8,39.3h-3.9v-3.9
h3.9V39.3z M31.8,43.2v-3.9h3.9v3.9H31.8z M63.1,47.1V51h-3.9v-3.9v-3.9v-3.9h3.9v3.9V47.1z M35.7,47.1v-3.9h3.9h3.9h3.9h3.9v3.9
h-3.9h-3.9h-3.9H35.7z M59.2,39.3h-3.9v-3.9h3.9V39.3z M55.3,43.2h-3.9v-3.9h3.9V43.2z"
                  />
                </g>
              </svg> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="85"
                height="85"
                viewBox="0 0 85 85"
                className="gradient-fill"
              >
                <defs>
                  <linearGradient
                    id="gradientFill"
                    gradientUnits="userSpaceOnUse"
                    x1="9.9604"
                    y1="75.0338"
                    x2="75.0387"
                    y2="9.9555"
                  >
                    <stop offset="0" stopColor="var(--accent)" />
                    <stop offset="1" stopColor="var(--secondary)" />
                  </linearGradient>
                  <style>
                    {`
          .gradient-fill {
            fill: url(#gradientFill);
          }
        `}
                  </style>
                </defs>
                <g>
                  <path
                    className="gradient-fill"
                    d="M51,0H34C15.2,0,0,15.2,0,34v17c0,14.3,8.9,26.6,21.4,31.6c0,0,0,0,0,0l0,0C25.3,84.1,29.5,85,34,85h17
c6,0,11.7-1.6,16.6-4.3c0.1-0.1,0.2-0.1,0.3-0.2C78.1,74.6,85,63.6,85,51V34C85,15.2,69.8,0,51,0z M83,51c0,10.7-5.3,20.2-13.4,26
v-2.5v-3.9h3.9v-3.9h-3.9v-3.9h3.9v-3.9h-3.9H67v-3.9V51h-3.9v3.9v3.9h2.6v3.9v3.9v3.9h-3.9h-3.9v3.9h3.9h3.9v3.9v1
C61.3,81.7,56.3,83,51,83H34c-4.5,0-8.7-0.9-12.6-2.6v-2v-3.9h3.9h3.9v-3.9h-3.9h-3.9v-3.9v-3.9v-3.9H24v-3.9V51h-3.9v3.9v3.9h-2.6
h-3.9v3.9h3.9v3.9h-3.9v3.9h3.9v3.9v3.9C8.2,72.8,2,62.6,2,51V34C2,16.4,16.4,2,34,2h17c17.6,0,32,14.4,32,32V51z M50.1,54.9H54
v3.9v3.9h-3.9v-3.9V54.9z M33.1,54.9H37v3.9v3.9h-3.9v-3.9V54.9z M27.9,51H24v-3.9v-3.9v-3.9h3.9v3.9v3.9V51z M31.8,39.3h-3.9v-3.9
h3.9V39.3z M31.8,43.2v-3.9h3.9v3.9H31.8z M63.1,47.1V51h-3.9v-3.9v-3.9v-3.9h3.9v3.9V47.1z M35.7,47.1v-3.9h3.9h3.9h3.9h3.9v3.9
h-3.9h-3.9h-3.9H35.7z M59.2,39.3h-3.9v-3.9h3.9V39.3z M55.3,43.2h-3.9v-3.9h3.9V43.2z"
                  />
                </g>
              </svg>
            </div>
            <div className="logo__caption">
              <p>
                AB
                <br />
                Dev Zone
              </p>
            </div>
          </div>
          <div
            onClick={toggleAvatar}
            className="avatar__image hover:cursor-pointer"
          >
            <Image
              width={300}
              height={300}
              className={`transition-transform duration-500 ease-in-out transform-gpu 
              ${
                isVisible
                  ? "opacity-100 scale-100 rotate-0 "
                  : `opacity-55 scale-125 ${
                      lastIndex % 2 === 0 ? `rotate-12` : `-rotate-12`
                    } `
              }
             
              `}
              src={currentAvatar.src}
              alt="Braxton - Personal Portfolio & Resume HTML Template Avatar"
            />
          </div>
        </div>
        {/* data caption #1 */}
        <div className="avatar__block">
          <h6>
            <small className="top">Specialization:</small>
            Software Engineering
            <br />
            and ...Something else
          </h6>
        </div>
        {/* data caption #2 */}
        <div className="avatar__block">
          <h6>
            <small className="top">Based in:</small>
            Foreigner , Viet Nam
          </h6>
        </div>
        {/* socials and CTA button */}
        <div className="avatar__block">
          <div className="avatar__socials">
            <ul className="socials-square flex justify-between">
              {socials.map((social) => {
                return (
                  <li key={social.label} className="socials-square__item">
                    <Link
                      className="socials-square__link btn"
                      href={social.url}
                      target="_blank"
                    >
                      <div>{social.icon}</div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="avatar__btnholder">
            <Link
              className="btn btn-default btn-fullwidth btn-hover btn-hover-accent"
              href="#contact"
            >
              <span className="btn-caption ">{`Let's Work Together!`}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
