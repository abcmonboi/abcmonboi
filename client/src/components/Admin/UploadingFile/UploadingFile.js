import React, { memo, useEffect, useState } from "react";
import Axios from "axios";
import axiosConfig from "axiosConfig";
import axiosConfigAwsS3 from "axiosConfigAwss3";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UploadingFile = ({ payload, handleLoading, modeEdit, sid }) => {
  // console.log(payload)
  var dataForm = new FormData();
  const navigate = useNavigate();

  useEffect(() => {
    dataForm.append("title", payload?.title?.trim());
    dataForm.append("isrc", payload?.isrc?.trim());

    dataForm.append("description", payload?.description);
    payload?.license && dataForm.append("license", payload?.license);
    payload?.artists &&
      // eslint-disable-next-line
      payload?.artists.map((item) => {
        dataForm.append("artists", item);
      });
    // dataForm.append("artists_names", payload?.artists_names?.trim());

    payload?.genres &&
      // eslint-disable-next-line
      payload?.genres.map((item) => {
        dataForm.append("genres", item);
      });
    payload?.moods &&
      // eslint-disable-next-line
      payload?.moods.map((item) => {
        dataForm.append("moods", item);
      });
    payload?.instruments &&
      // eslint-disable-next-line
      payload?.instruments.map((item) => {
        dataForm.append("instruments", item);
      });
    payload?.videothemes &&
      // eslint-disable-next-line
      payload?.videothemes.map((item) => {
        dataForm.append("videothemes", item);
      });
    payload?.album && dataForm.append("album", payload.album);
    dataForm.append("streaming", payload?.streaming);
    dataForm.append("price", payload?.price);
    dataForm.append("thumbnail", payload?.thumbnail);
    dataForm.append("thumbnail_medium", payload?.thumbnail_medium);
    dataForm.append("copyrightStatus", payload?.copyrightStatus);
    dataForm.append("tempo", payload?.tempo);
    dataForm.append("status", payload?.status);
    payload?.hashtags &&
    // eslint-disable-next-line
    payload?.hashtags.map((item) => {
      dataForm.append("hashtag", item);
    });
    // eslint-disable-next-line
  }, [payload]);

  const [downloadInfo, setDownloadInfo] = useState({
    process: 0,
    complete: false,
    total: 0,
    loaded: 0,
  });
  const [uploadInfo, setUploadInfo] = useState({
    process: 0,
    complete: false,
    total: 0,
    loaded: 0,
  });
  useEffect(() => {
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        setUploadInfo({
          process: Math.round((loaded * 100) / total),
          complete: false,
          total,
          loaded,
        });
      },
    };
    const apiUpdateSong = (sid, payload) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await axiosConfig({
            method: "PUT",
            url: `/api/song/${sid}`,
            data: payload,
            ...options,
          });
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    const apiCreateSong = (data) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await axiosConfig({
            method: "POST",
            url: "/api/song/",
            data: data,
            ...options,
          });
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    if (modeEdit?.modeEdit && sid) {
      apiUpdateSong(sid, dataForm)
        .then((response) => {
          setUploadInfo((infor) => ({
            ...infor,
            complete: true,
          }));
        })
        .catch((err) => {
          handleLoading();
          Swal.fire(
            "Error",
            err?.response?.data?.mes
              ? err?.response?.data?.mes
              : "Something went wrong",
            "error"
          );
        });
    } else {
      apiCreateSong(dataForm)
        .then((response) => {
          setUploadInfo((infor) => ({
            ...infor,
            complete: true,
          }));
        })
        .catch((err) => {
          handleLoading();
          Swal.fire(
            "Error",
            err?.response?.data?.mes
              ? err?.response?.data?.mes
              : "Something went wrong",
            "error"
          );
        });
    }
  }, []);
  useEffect(() => {
    if (uploadInfo.complete) {
      setTimeout(() => {
        handleLoading();
        modeEdit?.modeEdit
          ? Swal.fire("Thành Công", "Bài hát đã được cập nhật", "success").then(
              () => {
                navigate("/admin/song");
              }
            )
          : Swal.fire("Thành Công", "Bài hát đã được tải lên", "success").then(
              () => {
                navigate("/admin/song");
              }
            );
      }, 500);
    }
  }, [uploadInfo.complete]);
  // var today = new Date();
  // var time =
  //   today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  // console.log(time + " " + uploadInfo.process);
  return (
    <div
      style={{
        top: "0",
        backgroundColor: "rgba(0,0,0,0.3)",
        borderRadius: "15px",
        zIndex: "3",
      }}
      className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center "
    >
      <div className="modal-dialog modal-dialog-centered w-100">
        <div className="modal-content">
          <div className="modal-header ">
            <h5
              className="modal-title text-center"
              id="exampleModalCenterTitle"
            >
              File Uploading...{" "}
            </h5>
          </div>
          <div className="modal-body">
            <div className="progress w-100 h-100">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                aria-valuenow={uploadInfo?.process}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ width: uploadInfo.process + "%" }}
              >
                {uploadInfo.process + "%"}
              </div>
            </div>
            {uploadInfo.complete ? (
              <small className="float-left font-size-14 text-primary">
                Complete
                <i className="las la-check-circle"></i>
              </small>
            ) : uploadInfo?.process < 100 ? (
              <small className="float-left font-size-14 ">
                File đang được hệ thống kiểm tra
              </small>
            ) : (
              <small className="float-left font-size-14 text-primary font-weight-bold text-center ">
                File đã được kiểm tra và đang được tải lên. Bạn có thể thoát ra
                hoặc chờ khi có thông báo tải lên thành công
              </small>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={() => {
                handleLoading();
                navigate("/admin/song");
              }}
              className="btn btn-primary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(UploadingFile);
