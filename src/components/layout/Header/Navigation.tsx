"use client";

import Link from "next/link";
import React, { useState } from "react";

type MenuItem = {
  label: string;
  url: string;
  icon?: React.ReactNode; // Hoặc string nếu icon là tên lớp CSS
};

const Navigation = () => {
  const menuList: MenuItem[] = [
    {
      label: "Home",
      url: "",
      icon: <i className="ph-bold ph-house-simple" />,
    },
    {
      label: "Portfolio",
      url: "portfolio",
      icon: <i className="ph-bold ph-squares-four" />,
    },
    {
      label: "About Me",
      url: "about",
      icon: <i className="ph-bold ph-user" />,
    },
    {
      label: "Resume",
      url: "resume",
      icon: <i className="ph-bold ph-article" />,
    },
    {
      label: "Contact",
      url: "contact",
      icon: <i className="ph-bold ph-envelope" />,
    },
  ];
  const [isActive, setIsActive] = useState<Record<string, boolean>>({
    "": true,
  });

  const handleNavigate = (url: string) => {
    setIsActive({ [url]: true });
  };

  return (
    <div className="header__navigation">
      <nav id="menu" className="menu">
        <ul className="menu__list flex justify-start">
          {menuList.map((item) => {
            return (
              <li key={item?.label} className="menu__item">
                <Link
                  onClick={() => handleNavigate(item.url)}
                  className={`menu__link btn ${
                    isActive[item.url] ? "active" : ""
                  }`}
                  href={`#${item.url}`}
                >
                  <span className="menu__caption">{item?.label}</span>
                  {item?.icon}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
