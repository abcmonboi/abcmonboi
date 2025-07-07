import React, { memo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import fileDownload from "js-file-download";
import Axios from "axios";
import JSZip from "jszip";
import saveAs from "file-saver";

const DownloadManager = ({ files = [], remove }) => {
  useEffect(() => {
    document.getElementById("download-manager").classList.add("iq-show");
  }, [files]);

  return (
    <>
      <li id="download-manager" className="nav-item nav-icon">
        <a className="search-toggle iq-waves-effect text-black rounded">
          <i className="las la-download" />
          <span className="massage-icon dots badge badge-primary">
            {files?.length}
          </span>
        </a>
        <div className="iq-sub-dropdown">
          <div className="iq-card shadow-none m-0">
            <div className=" p-0 ">
              <div className="bg-primary p-3">
                <h5 className="mb-0 text-white">
                  Download Manager
                  <small className="badge  badge-light float-right pt-1">
                    {files?.length}
                  </small>
                </h5>
              </div>
              <div
                style={{
                  height: "auto",
                  maxHeight: "30vh",
                  overflowY: "scroll",
                }}
              >
                {files?.map((file, idx) => (
                  <DownloadItem
                    key={idx}
                    removeFile={() => remove(file.downloadId)}
                    {...file}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};
const DownloadItem = ({ thumbnail, file, filename, removeFile, type }) => {
  let percentZip = 0;

  const [downloadInfo, setDownloadInfo] = useState({
    process: 0,
    complete: false,
    total: 0,
    loaded: 0,
  });
  useEffect(() => {
    const options = {
      onDownloadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        setDownloadInfo({
          process: Math.round((loaded * 100) / total),
          complete: false,
          total,
          loaded,
        });
      },
    };

    if (type === "song") {
      Axios.get(file, {
        responseType: "blob",
        ...options,
      }).then((res) => {
        const url = window.URL.createObjectURL(
          new Blob([res.data], {
            type: res.headers["content-type"],
          })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename + ".mp3");
        document.body.appendChild(link);
        link.click();

        setDownloadInfo((infor) => ({
          ...infor,
          complete: true,
        }));
        setTimeout(() => {
          removeFile();
        }, 4000);
      });
    }
    if (type === "zip") {
      let zip = new JSZip();
      const optionsZip = {
        onDownloadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          setDownloadInfo({
            process:
              percentZip + Math.round((loaded * 100) / total / file?.length),
            complete: false,
            total,
            loaded,
          });
        },
      };
      let songToblob = async () => {
        for (let i = 0; i < file?.length; i++) {
          await Axios.get(file[i].streaming, {
            responseType: "blob",
            ...optionsZip,
          }).then((res) => {
            percentZip = Math.round(((i + 1) * 100) / file?.length);
            zip.file(`${file[i].song}.mp3`, res.data);
          });
          //download song with fetch
        }
      };
      songToblob().then(() => {
        zip.generateAsync({ type: "blob" }).then((content) => {
          saveAs(content, `${filename}`);
          setDownloadInfo((infor) => ({
            ...infor,
            complete: true,
          }));
          setTimeout(() => {
            removeFile();
          }, 4000);
        });
      });
    }
  }, []);
  return (
    <a className="iq-sub-card">
      <div className="media align-items-center">
        <div>
          {thumbnail?.endsWith(".mp4") ? (
            <video
              className="avatar-40 rounded"
              filter="url(#blur)"
              style={{
                objectFit: "cover",
                borderRadius: "18px",
              }}
              src={thumbnail}
              alt="SFX"
              autoPlay
              loop
              muted
            />
          ) : thumbnail ? (
            <img className="avatar-40 rounded" src={thumbnail} />
          ) : (
            <i className="ri-surround-sound-line text-primary sfx-player-icon font-size-40"></i>
          )}
        </div>
        <div className="media-body ml-3 ">
          <span className="mb-0 font-size-12">{filename}</span>

          <div className="progress">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuenow={downloadInfo.process}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{ width: downloadInfo.process + "%" }}
            >
              {downloadInfo.process + "%"}
            </div>
            <span className="mb-0 font-size-12">
              {downloadInfo.loaded === 0 && "Initializing..."}
            </span>
          </div>

          {downloadInfo.complete || percentZip === 100 ? (
            <small className="float-left font-size-12 text-primary">
              Complete
              <i className="las la-check-circle"></i>
            </small>
          ) : (
            <small className="float-left font-size-12 ">Downloading...</small>
          )}
        </div>
      </div>
    </a>
  );
};
export default DownloadManager;
