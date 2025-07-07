import { useEffect, React, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";
import { FaCheck, FaRegCopy } from "react-icons/fa";

const ModalLicence = () => {
  const { modalData } = useSelector((state) => state.app);
  const [isCopyAtt, setIsCopyAtt] = useState(false);
  useEffect(() => {
    isCopyAtt && setIsCopyAtt(false);
  }, [modalData]);
  return (
    <div
      id="exampleModalCenteredScrollableLicence"
      className="modal fade "
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenteredScrollableTitle"
      style={{ display: "none" }}
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered"
        role="document"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="modal-content"
        >
          <div className="modal-header">
            <h5
              className="modal-title font-weight-bolder"
              id="exampleModalCenteredScrollableTitle"
            >
              {modalData?.license?.title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body font-size-14 ">
            <Fragment>
              {/* <div className="mr-2 mb-0 font-size-22">

                 {detailLicense?.icon?.map((icon, index) => (
                    <div
                      key={index}
                      className="ml-2 "
                      style={{ display: "inline-block" }}
                    >
                      {icon}
                    </div>
                  ))} 
                 <span className="font-size-18 ml-2 text-dark font-weight-bold ">
                  {modalData?.license?.title}
                </span> 
              </div> */}
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(modalData?.license?.description),
                }}
                className="mb-0"
              >
                {/* <span className="font-weight-600"> */}
                {/* {detailLicense?.vn_text}: */}
                {/* </span> */}
                {/* {detailLicense?.vn_description} */}
              </p>
              <div className="modal-header bg-dark text-white">
                <div
                  style={{
                    cursor: "pointer",
                  }}
                  className="d-flex align-items-center"
                  onClick={() => {
                    setIsCopyAtt(true);
                    var copyText = document.getElementById("copy-span-rect");
                    navigator.clipboard.writeText(copyText.innerText);
                  }}
                >
                  <h5
                    className="modal-title font-weight-bolder text-white"
                    id="exampleModalCenteredScrollableTitle"
                  >
                    {isCopyAtt ? "Đã sao chép" : "Sao chép"}
                  </h5>
                  {isCopyAtt ? (
                    <FaCheck className="ml-2" />
                  ) : (
                    <FaRegCopy className="ml-2" />
                  )}
                </div>
              </div>
              <div className="modal-body font-size-14 border ">
                <span id="copy-span-rect">
                  {" "}
                  <b>
                    {` Tác phẩm: ${modalData?.title}  ||
                  ${window.location.protocol}//${window.location.host}/music/${modalData?.slug}`}
                    {/* <br /> */}
                    {/* Attribution 4.0 International (CC BY 4.0) */}
                    <br />
                    {`Tác giả: ${
                      modalData?.artists &&
                      modalData.artists.map((artist) => artist.name).join(", ")
                    }`}
                    <br />
                    Bản quyền và quản lí thuộc: https://audiobay.net
                  </b>
                </span>
              </div>
            </Fragment>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLicence;
