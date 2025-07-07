import { BlogBackTop, BlogFooter, BlogHeader } from "components";
import React, { useRef, useEffect, Fragment,useState} from "react";
import { Outlet } from "react-router-dom";

const Blog = () => {
  const blogRef = useRef(null);
  useEffect(() => {
    blogRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 500);
    var chatbox = document.getElementById("fb-customer-chat");
    chatbox.setAttribute("page_id", "102364172854277");
    chatbox.setAttribute("attribution", "biz_inbox");
    //eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <div>
           {isLoading && (
        <div id="loading">
          <div id="loading-center"></div>
        </div>
      )}
      <div ref={blogRef} className="root-blog">
        <BlogHeader />
        <Outlet />
        <BlogFooter />
        <div
          onClick={() => {
            blogRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          <BlogBackTop />
        </div>
      </div>
      </div>
    </Fragment>
  );
};

export default Blog;
