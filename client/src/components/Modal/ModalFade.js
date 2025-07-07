import React, {memo} from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "store/actions";
 const ModalFade = () => {
  const { modalData } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const { fileList } = useSelector((state) => state.music);

  const handleDownload = (data) => {
    if (fileList === null) {
      dispatch(
        actions.setDownload([
          {
            file: data?.streaming,
            filename: data?.title,
            thumbnail: data?.thumbnail,
            type: "song",
          },
        ])
      );
    } else {
      dispatch(
        actions.setDownload([
          ...fileList,
          {
            file: data?.streaming,
            filename: data?.title,
            thumbnail: data?.thumbnail,
            type: "song",
          },
        ])
      );
    }
    // Axios.get(url, {
    //   responseType: "blob",
    // }).then((res) => {
    //   fileDownload(res.data, filename + ".mp3");
    //   modalData?.sfxCategory !== undefined
    //     ? apiUpdateSfxDownloads(modalData?._id)
    //     : apiUpdateSongDownloads(modalData?._id);
    // });
    // const aTag = document.createElement("a");
    // aTag.href = url;
    // aTag.setAttribute("target", "_blank");
    // aTag.setAttribute("download", filename + ".mp3");
    // document.body.appendChild(aTag);
    // aTag.click();
    // modalData?.sfxCategory !== undefined
    //   ? apiUpdateSfxDownloads(modalData?._id)
    //   : apiUpdateSongDownloads(modalData?._id);
    // document.body.removeChild(aTag);
    // aTag.remove();
    // fetch(url)
    // .then((res) => res.blob())
    // .then((blob) => {
    //   fileDownload(res.data, filename + ".mp3");
    //   modalData?.sfxCategory !== undefined
    //     ? apiUpdateSfxDownloads(modalData?._id)
    //     : apiUpdateSongDownloads(modalData?._id);
    // }
    // );
  };
  return (
    <div
      className="modal fade"
      id="exampleModalCenter10"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenter10Title"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content ">
          <div className="modal-header">
            <h5
              style={{
                color: "black",
              }}
              className="modal-title "
              id="exampleModalCenter10Title"
            >
              Say thanks to AudioBay
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>
              Crediting isn't required, but linking back is greatly appreciated
              and allows music authors to gain exposure.
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Huỷ
            </button>
            <button
              onClick={() => handleDownload(modalData)}
              type="button"
              className="btn btn-primary"
                data-dismiss="modal"
            >
              Tải xuống
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(ModalFade);
