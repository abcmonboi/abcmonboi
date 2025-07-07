import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const BlogBackTop = () => {
 
useEffect(() => {
  const backTopBtn = document.querySelector("[data-back-top-btn]");
  window.addEventListener("scroll", () => {

    if (window.scrollY > 100) {
      backTopBtn && backTopBtn?.classList.add("active");
    } else {
      backTopBtn?.classList.contains("active") &&
      backTopBtn?.classList.remove("active");
    }
  });
} ,[])
  return (
    <Link
      className="back-top-btn-blog active"
      aria-label="back to top"
      data-back-top-btn
    >
      <i className="las la-arrow-up" aria-hidden="true"></i>
    </Link>
  );
};

export default BlogBackTop;
