import React, { useEffect, useState } from "react";
import { apiGetAllLicense } from "apis";
import DOMPurify from "dompurify";

const License = () => {
  const [data, setData] = useState([]);
  const [active, setActive] = useState(0);
  const fetchAllLicense = async () => {
    await apiGetAllLicense({ sort: "title", fields: "title,description" }).then(
      (res) => {
        const data = res.data.data;
        setData(data);
      }
    );
  };

  useEffect(() => {
    fetchAllLicense();
  }, []);
  return (
    <div id="content-page" className="content-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="iq-accordion career-style faq-style">
              {data.map((el, index) => {
                if (index === 0) {
                  return (
                    <div
                      key={el?._id}
                      className="iq-card iq-accordion-block accordion-active"
                    >
                      <div className="active-faq clearfix" style={{}}>
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-sm-12">
                              <a className="accordion-title">
                                <span className="text-primary font-weight-bold">
                               {el?.title}
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`accordion-details `}
                        style={{ display: "block" }}
                      >
                          <p
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(el?.description),
                            }}
                            className="mb-0"
                          ></p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={el._id} className={`iq-card iq-accordion-block `}>
                      <div className="active-faq clearfix">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-sm-12">
                              <a className="accordion-title ">
                                <span className="text-primary font-weight-bold">
                                {`${index+1}. `}   {el?.title}
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`accordion-details `}
                        style={{ display: "none" }}
                      >
                        {el?.description && (
                          <p
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(el?.description),
                            }}
                            className="mb-0"
                          ></p>
                        )}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default License;
