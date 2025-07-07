import { useEffect, React, useState } from "react";
import { useSelector } from "react-redux";
import { FaCheck, FaRegCopy } from "react-icons/fa";
const ModalShare = () => {
  const { modalData } = useSelector((state) => state.app);
  const [isCopyAtt, setIsCopyAtt] = useState(false);
  const [isCopyUrl, setIsCopyUrl] = useState(false);
  const [isShowCode, setIsShowCode] = useState(false);
  useEffect(() => {
    isCopyAtt && setIsCopyAtt(false);
    isCopyUrl && setIsCopyUrl(false);
    isShowCode && setIsShowCode(false);
  }, [modalData]);
  //unmount
  return (
    <div
      id="exampleModalCenteredScrollableShare"
      className="modal fade"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenteredScrollableTitle"
      style={{ display: "none" }}
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered"
        role="document"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="modal-content"
        >
          <div
            style={{
              borderBottom: "0px",
            }}
            className="modal-header bg-primary text-white"
          >
            <div
              style={{
                cursor: "pointer",
              }}
              className="d-flex align-items-center"
              onClick={() => {
                setIsCopyAtt(true);
                var copyText = document.getElementById("copy-span-rect2");
                navigator.clipboard.writeText(copyText.innerHTML);
              }}
            >
              <h5
                className="modal-title font-weight-bolder text-white"
                id="exampleModalCenteredScrollableTitle"
              >
                {isCopyAtt ? "Đã sao chép" : "Sao chép Embed Code"}
              </h5>
              {isCopyAtt ? (
                <FaCheck className="ml-2" />
              ) : (
                <FaRegCopy className="ml-2" />
              )}
            </div>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div
            style={{
              overflow: "hidden",
            }}
            className="modal-body font-size-14 d-flex flex-column justify-content-center align-items-center"
          >
            <span id="copy-span-rect2">
              <iframe
                src={`${window.location.origin}/embed/${modalData?.path}/${modalData?.id}`}
                width={modalData?.path === "music" ? "1100" : "1100"}
                frameBorder={0}
                height={
                  (modalData?.path === "music" || modalData?.path === "sfx")
                    ? modalData?.title?.length > 39
                      ? modalData?.title?.length > 82 ? "123" :
                      "97"
                      : "84"
                    : "600"
                }
              ></iframe>

              {/* <b>
                  {` Tác phẩm: ${modalData?.title}  ||
                  ${window.location}`}
                  <br />
                  {`Tác giả: ${
                    modalData?.artists?.length > 0 &&
                    modalData?.artists.map((artist) => artist.name).join(", ")
                  }`}
                  <br />
                  Bản quyền và quản lí thuộc: https://audiobay.net
                </b> */}
            </span>
            {isShowCode && (
              <textarea
              style={{
                resize: "none",
              }}
                sc
                id="copy-code"
                readOnly
                defaultValue={`<iframe src="${window.location.origin}/embed/${
                  modalData?.path
                }/${modalData?.id}" width="${
                  modalData?.path === "music" ? "1100" : "1100"
                }" frameborder="0" height="${
                    (modalData?.path === "music" || modalData?.path === "sfx")
                    ? modalData?.title?.length > 39
                      ? modalData?.title?.length > 82 ? "123" :
                      "97"
                      : "84"
                    : "600"
                }"></iframe>`}
                className="w-100"
              ></textarea>
            )}
          </div>
          <div className="modal-footer">
            <button
              onClick={() => {
                setIsShowCode(!isShowCode);
              }}
              type="button"
              className="btn btn-secondary"
            >
              {isShowCode ? "Ẩn Code" : "Hiện Code"}
            </button>
            <button
              onClick={() => {
                setIsCopyUrl(true);
                navigator.clipboard.writeText(modalData?.url);
                //   window.location.origin +
                //     "/" +
                //     modalData?.path +
                //     "/" +
                //     modalData?.slug
                // );
                document.getElementById("shareLink").style.opacity = 1;
                document.getElementById("shareLink").style.display = "flex";

                setTimeout(() => {
                  document.getElementById("shareLink").style.opacity = 0;
                  document.getElementById("shareLink").style.display = "none";
                }, 2000);
              }}
              type="button"
              className="btn btn-primary"
            >
              {isCopyUrl ? "Đã sao chép" : "Sao chép Link"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalShare;
