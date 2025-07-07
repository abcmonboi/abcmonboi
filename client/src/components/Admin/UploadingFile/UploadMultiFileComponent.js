import React, { memo, useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import { apiCreateSong } from "../../../apis/song";
import axiosConfig from "axiosConfig";
const UploadMultiFileComponent = ({
  handleLoading,
  multiSong,
  handleLoadingSong,
  handleUploadMultiSong,
}) => {
  const [currentSongUpload, setCurrentSongUpload] = useState(1);
  const dataForm = new FormData();
  const FetchCreateSong = async (dataForm) => {
    await apiCreateSong(dataForm)
      .then((response) => {
        if (currentSongUpload < multiSong?.length) {
          setCurrentSongUpload(currentSongUpload + 1);
        }
        if (currentSongUpload === multiSong?.length) {
          setCurrentSongUpload(currentSongUpload + 1);
          setTimeout(() => {
            Swal.fire(
              "Success!",
              "You have successfully uploaded all files! ",
              "success"
            ).then(() => {
              handleLoading(false);
              handleLoadingSong(true);
              handleUploadMultiSong(false);
            });
          }, 2000);
        }
      })
      .catch((err) => {
        Swal.fire(
          "Error!",
          "Something went wrong at song " + [currentSongUpload] + " !",
          "error"
        );
        return;
      });
  };
  //   const handleNumber = useCallback(() => {
  //     setCurrentSong(currentSong + 1);
  //   }, [currentSong]);
  //   useEffect(() => {
  //     if (currentSong === multiSong?.length) {
  //       Swal.fire(
  //         "Success!",
  //         "You have successfully uploaded all files! ",
  //         "success"
  //       ).then(() => {
  //         handleLoading(false);
  //       });
  //     } else {
  //     }
  //   }, [currentSong]);
  useEffect(() => {
    dataForm.append("title", multiSong[currentSongUpload - 1]?.title?.trim());
    multiSong[currentSongUpload - 1]?.license && dataForm.append("license", multiSong[currentSongUpload - 1]?.license);

    multiSong[currentSongUpload - 1]?.description &&
      dataForm.append(
        "description",
        multiSong[currentSongUpload - 1]?.description
      );
    multiSong[currentSongUpload - 1]?.artists &&
      // eslint-disable-next-line
      multiSong[currentSongUpload - 1]?.artists.map((el) => {
        dataForm.append("artists", el);
      });
    // dataForm.append("artists_names", payload?.artists_names?.trim());

    multiSong[currentSongUpload - 1]?.genres &&
      // eslint-disable-next-line
      multiSong[currentSongUpload - 1]?.genres.map((el) => {
        dataForm.append("genres", el);
      });
    multiSong[currentSongUpload - 1]?.moods &&
      // eslint-disable-next-line
      multiSong[currentSongUpload - 1]?.moods.map((el) => {
        dataForm.append("moods", el);
      });
    multiSong[currentSongUpload - 1]?.instruments &&
      // eslint-disable-next-line
      multiSong[currentSongUpload - 1]?.instruments.map((el) => {
        dataForm.append("instruments", el);
      });
    multiSong[currentSongUpload - 1]?.videothemes &&
      // eslint-disable-next-line
      multiSong[currentSongUpload - 1]?.videothemes.map((el) => {
        dataForm.append("videothemes", el);
      });
    multiSong[currentSongUpload - 1]?.album &&
      dataForm.append("album", multiSong[currentSongUpload - 1]?.album);
    dataForm.append("streaming", multiSong[currentSongUpload - 1]?.streaming);
    multiSong[currentSongUpload - 1]?.price &&
      dataForm.append("price", multiSong[currentSongUpload - 1]?.price);
    dataForm.append("thumbnail", multiSong[currentSongUpload - 1]?.thumbnail);
    dataForm.append(
      "thumbnail_medium",
      multiSong[currentSongUpload - 1]?.thumbnail_medium
    );
    dataForm.append("copyrightStatus", 1);
    multiSong[currentSongUpload - 1]?.tempo &&
      dataForm.append("tempo", multiSong[currentSongUpload - 1]?.tempo);
    dataForm.append("status", true);

    if (dataForm && currentSongUpload <= multiSong?.length) {
      FetchCreateSong(dataForm);
    //       for (const pair of dataForm.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);
    // }
    }
  }, [currentSongUpload]);
  return (
    <div
      style={{
        top: "0",
        borderRadius: "15px",
        zIndex: "9999",
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
              {`${currentSongUpload - 1}/${multiSong?.length}`}
            </h5>
          </div>
          <div className="modal-body">
            <div className="progress w-100 h-100 mb-2">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                aria-valuenow={
                  currentSongUpload - 1 === 0
                    ? 0
                    : Math.round(
                        ((currentSongUpload - 1) / multiSong?.length) * 100 - 5
                      )
                }
                aria-valuemin={0}
                aria-valuemax={100}
                style={{
                  width:
                    currentSongUpload - 1 === 0
                      ? 0
                      : Math.round(
                          ((currentSongUpload - 1) / multiSong?.length) * 100 -
                            5
                        ) + "%",
                }}
              >
                {currentSongUpload - 1 === 0
                  ? 0
                  : Math.round(
                      ((currentSongUpload - 1) / multiSong?.length) * 100 - 5
                    )}
                {"%"}
              </div>
            </div>
            {/* {multiSong?.map((item, index) => {
              return (
                <UploadProcesss
                  key={index}
                  song={item}
                />
              );
            })} */}
          </div>

          <div className="modal-footer">
            {/* <button
                type="button"
                onClick={() => {
                  handleLoading(false);
                }}
                className="btn btn-success"
              >
                OK
              </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
const UploadProcesss = ({ song }) => {
  var dataForm = new FormData();
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

    dataForm.append("title", song?.title?.trim());
    song?.description && dataForm.append("description", song?.description);
    song?.license && song.append("license", song?.license);

    song?.artists &&
      // eslint-disable-next-line
      song?.artists.map((el) => {
        dataForm.append("artists", el);
      });
    // dataForm.append("artists_names", payload?.artists_names?.trim());

    song?.genres &&
      // eslint-disable-next-line
      song?.genres.map((el) => {
        dataForm.append("genres", el);
      });
    song?.moods &&
      // eslint-disable-next-line
      song?.moods.map((el) => {
        dataForm.append("moods", el);
      });
    song?.instruments &&
      // eslint-disable-next-line
      song?.instruments.map((el) => {
        dataForm.append("instruments", el);
      });
    song?.videothemes &&
      // eslint-disable-next-line
      song?.videothemes.map((el) => {
        dataForm.append("videothemes", el);
      });
    song?.album && dataForm.append("album", song?.album);
    dataForm.append("streaming", song?.streaming);
    song?.price && dataForm.append("price", song?.price);
    dataForm.append("thumbnail", song?.thumbnail);
    dataForm.append("thumbnail_medium", song?.thumbnail_medium);
    dataForm.append("copyrightStatus", 1);
    song?.tempo && dataForm.append("tempo", song?.tempo);
    dataForm.append("status", true);

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
    apiCreateSong(dataForm)
      .then((response) => {
        setUploadInfo((infor) => ({
          ...infor,
          complete: true,
        }));
      })
      .catch((err) => {
        Swal.fire(
          "Error",
          err?.response?.data?.mes
            ? err?.response?.data?.mes
            : "Something went wrong",
          "error"
        );
      });
  }, []);
  return (
    <div className="progress w-100 h-100 mb-2">
      <div
        className="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-valuenow={uploadInfo?.process}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ width: uploadInfo?.process + "%" }}
      >
        {uploadInfo?.process + "%"}
      </div>
    </div>
  );
};
export default memo(UploadMultiFileComponent);
