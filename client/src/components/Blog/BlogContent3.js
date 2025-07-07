import React, { memo, useState, useEffect, Fragment } from "react";
import { apiGetAllBlogCategory } from "apis";
import { useNavigate } from "react-router-dom";

const BlogContent3 = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    apiGetAllBlogCategory({
      fields: "title slug blogCategory_thumbnail description",
    })
      .then((res) => {
        //set data = 6 element dau tien
        setData(res?.data?.data);
      })
      .catch((err) => {
        if (err) navigate("/home");
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <section className="tags-blog p-0 d-block" aria-labelledby="tag-label">
        <div className="container-blog">
          <h2
            className="headline-blog headline-2-blog section-title-blog mb-0"
            id="tag-label"
          >
            <span className="span-blog font-weight-600">Chủ đề bài viết</span>
          </h2>
          <p className="section-text-blog">Tất cả chủ đề về bài viết</p>
          <ul className="grid-list-blog p-0 ">
            {data?.length > 0 &&
              data?.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    navigate(`/blog/${item?.slug}`, {
                      state: {
                        blogCate: item,
                      },
                    });
                  }}
                >
                  <button className="card-blog tag-btn-blog">
                    <img
                      style={{
                        objectFit: "cover",
                        maxHeight: "80px",
                        maxWidth: "80px",
                        // height: "80px",
                        // width: "80px",
                      }}
                      width={80}
                      height={80}
                      src={item?.blogCategory_thumbnail}
                      alt="Art"
                      className="rounded-circle img-fluid"
                    />
                    <p className="btn-text-blog mb-0">{item?.title}</p>
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </Fragment>
  );
};

export default memo(BlogContent3);
