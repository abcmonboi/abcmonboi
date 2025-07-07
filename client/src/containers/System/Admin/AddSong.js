import React, { Fragment, useCallback, useRef, useState } from "react";

import {
  apiCreateSong,
  apiGetDetailSong,
  apiUpdateSong,
  apiGetAllMood,
  apiGetAllInstrument,
  apiGetAllVideoTheme,
  apiGetAllGenre,
  apiGetAllArtist,
  apiGetAllAlbum,
  apiGetAllLicense,
} from "apis";

import { useEffect } from "react";
import { HashtagForm, Loading, UploadingFile } from "../../../components";
import Select from "react-select";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const AddSong = (modeEdit) => {
  const navigate = useNavigate();
  const { sid } = useParams();
  const [genre, setGenre] = useState([]);
  const [mood, setMood] = useState([]);
  const [license, setLicense] = useState([]);
  const [instrument, setInstrument] = useState([]);
  const [videoTheme, setVideoTheme] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [tempo, setTempo] = useState();
  const [artist, setArtist] = useState([]);
  // eslint-disable-next-line
  const [validate, setValidate] = useState("");
  const [album, setAlbum] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isLoaddingSong, setisLoaddingSong] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState();
  const [avatarPreviewLarge, setAvatarPreviewLarge] = useState();
  const [audioPreview, setAudioPreview] = useState();
  const hashtagInput = useRef();
  var dataForm = new FormData();
  const addSong = useRef();
  const addForm = useRef();
  const [payload, setPayload] = useState({
    title: "",
    description: "",
    artists: "",
    license: "",
    genres: "",
    moods: "",
    instruments: "",
    videothemes: "",
    album: "",
    streaming: "",
    price: "",
    thumbnail: "",
    thumbnail_medium: "",
    copyrightStatus: "" || "1",
    tempo: "",
    status: "" || true,
    hashtags: "",
    isrc : "",
  });
  const handlePreviewThumbnail = (e) => {
    const file = e.target.files[0];
    dataForm.append("thumbnail", file);
    file.preview = URL.createObjectURL(file);
    setAvatarPreview(file);
  };
  const handlePreviewThumbnailLarge = (e) => {
    const file = e.target.files[0];
    dataForm.append("thumbnail_medium", file);
    file.preview = URL.createObjectURL(file);
    setAvatarPreviewLarge(file);
  };
  const handlePreviewFile = (e) => {
    setTempo();
    document.getElementById("tempo").value = "";
    setAudioPreview(e.target.files[0]);

    var file = e.target.files[0];
    var reader = new FileReader();
    var context = new (window.AudioContext || window.AudioContext)();
    reader.onload = function () {
      context.decodeAudioData(reader.result, function (buffer) {
        prepare(buffer);
      });
    };
    reader.readAsArrayBuffer(file);
  };

  function prepare(buffer) {
    var offlineContext = new OfflineAudioContext(
      1,
      buffer.length,
      buffer.sampleRate
    );
    var source = offlineContext.createBufferSource();
    source.buffer = buffer;
    var filter = offlineContext.createBiquadFilter();
    filter.type = "lowpass";
    source.connect(filter);
    filter.connect(offlineContext.destination);
    source.start(0);
    offlineContext.startRendering();
    offlineContext.oncomplete = function (e) {
      process(e);
    };
  }

  function process(e) {
    var filteredBuffer = e.renderedBuffer;
    //If you want to analyze both channels, use the other channel later
    var data = filteredBuffer.getChannelData(0);
    var max = arrayMax(data);
    var min = arrayMin(data);
    var threshold = min + (max - min) * 0.98;
    var peaks = getPeaksAtThreshold(data, threshold);
    var intervalCounts = countIntervalsBetweenNearbyPeaks(peaks);
    var tempoCounts = groupNeighborsByTempo(intervalCounts);
    tempoCounts.sort(function (a, b) {
      return b.count - a.count;
    });
    if (tempoCounts.length) {
      //  payload.tempo = tempoCounts[0].tempo;
      setTempo(tempoCounts[0].tempo);
    }
  }

  // // http://tech.beatport.com/2014/web-audio/beat-detection-using-web-audio/
  function getPeaksAtThreshold(data, threshold) {
    var peaksArray = [];
    var length = data.length;
    for (var i = 0; i < length; ) {
      if (data[i] > threshold) {
        peaksArray.push(i);
        // Skip forward ~ 1/4s to get past this peak.
        i += 10000;
      }
      i++;
    }
    return peaksArray;
  }

  function countIntervalsBetweenNearbyPeaks(peaks) {
    var intervalCounts = [];
    peaks.forEach(function (peak, index) {
      for (var i = 0; i < 10; i++) {
        var interval = peaks[index + i] - peak;
        // eslint-disable-next-line
        var foundInterval = intervalCounts.some(function (intervalCount) {
          if (intervalCount.interval === interval) return intervalCount.count++;
        });
        //Additional checks to avoid infinite loops in later processing
        if (!isNaN(interval) && interval !== 0 && !foundInterval) {
          intervalCounts.push({
            interval: interval,
            count: 1,
          });
        }
      }
    });
    return intervalCounts;
  }

  function groupNeighborsByTempo(intervalCounts) {
    var tempoCounts = [];
    intervalCounts.forEach(function (intervalCount) {
      //Convert an interval to tempo
      var theoreticalTempo = 60 / (intervalCount.interval / 44100);
      theoreticalTempo = Math.round(theoreticalTempo);
      if (theoreticalTempo === 0) {
        return;
      }
      // Adjust the tempo to fit within the 90-180 BPM range
      while (theoreticalTempo < 90) theoreticalTempo *= 2;
      while (theoreticalTempo > 180) theoreticalTempo /= 2;
      // eslint-disable-next-line
      var foundTempo = tempoCounts.some(function (tempoCount) {
        if (tempoCount.tempo === theoreticalTempo)
          return (tempoCount.count += intervalCount.count);
      });
      if (!foundTempo) {
        tempoCounts.push({
          tempo: theoreticalTempo,
          count: intervalCount.count,
        });
      }
    });
    return tempoCounts;
  }

  function arrayMin(arr) {
    var len = arr.length,
      min = Infinity;
    while (len--) {
      if (arr[len] < min) {
        min = arr[len];
      }
    }
    return min;
  }

  function arrayMax(arr) {
    var len = arr.length,
      max = -Infinity;
    while (len--) {
      if (arr[len] > max) {
        max = arr[len];
      }
    }
    return max;
  }

  const handleClear = () => {
    setAvatarPreview();
    setAvatarPreviewLarge();
    setAudioPreview();
    setPayload({
      title: "",
      description: "",
      artists: "",
      license: "",
      genres: "",
      album: "",
      moods: "",
      streaming: "",
      price: "",
      thumbnail: "",
      thumbnail_medium: "",
      copyrightStatus: "",
      tempo: "",
      status: "",
      hashtags: "",
      isrc : "",
    });
  };
  const FetchGetAllGenre = async () => {
    const response = await apiGetAllGenre();
    const data = response.data.data
      .map((item) => {
        return {
          value: item._id,
          label: item.name,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
    setGenre(data);
  };
  const FetchGetAllMood = async () => {
    const response = await apiGetAllMood("", "", "-createdAt", "");
    const data = response.data.data
      .map((item) => {
        return {
          value: item._id,
          label: item.name,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
    setMood(data);
  };
  const FetchGetAllInstrument = async () => {
    const response = await apiGetAllInstrument("", "", "-createdAt", "");
    const data = response.data.data
      .map((item) => {
        return {
          value: item._id,
          label: item.name,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
    setInstrument(data);
  };
  const FetchGetAllVideoTheme = async () => {
    const response = await apiGetAllVideoTheme("", "", "-createdAt", "");
    const data = response.data.data
      .map((item) => {
        return {
          value: item._id,
          label: item.name,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
    setVideoTheme(data);
  };
  const FetchGetAllArtist = async () => {
    const response = await apiGetAllArtist();
    const data = response.data.data
      .map((item) => {
        return {
          value: item._id,
          label: item.name,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));

    setArtist(data);
  };
  const FetchGetAllAlbum = async () => {
    const response = await apiGetAllAlbum({isActive: true, fields: "title"});
    const data = response.data.data
      .map((item) => {
        return {
          value: item._id,
          label: item.title,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
    setAlbum(data);
  };
  const FetchGetAllLicense = async () => {
    const response = await apiGetAllLicense({ sort: "title", fields: "title"});
    const data = response.data.data
      .map((item,index) => {
        return {
          value: item._id,
          label: `${item.title}`,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
    setLicense(data);
  };
  useEffect(() => {
    FetchGetAllGenre();
    FetchGetAllArtist();
    FetchGetAllAlbum();
    FetchGetAllMood();
    FetchGetAllInstrument();
    FetchGetAllVideoTheme();
    FetchGetAllLicense();

  }, []);
  useEffect(() => {
    //Clean up
    return () => {
      avatarPreview && URL.revokeObjectURL(avatarPreview.preview);
    };
  }, [avatarPreview]);
  useEffect(() => {
    //Clean up
    return () => {
      avatarPreviewLarge && URL.revokeObjectURL(avatarPreviewLarge.preview);
    };
  }, [avatarPreviewLarge]);
  const handleSubmit = () => {
    // setisLoading(true);

    // onClick={() => {
    // }}
    // for (const pair of dataForm.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);
    // }
    if (modeEdit.modeEdit) {
      // const FetchUpdateSong = async () => {
      //   const response = await apiUpdateSong(sid, dataForm);
      //   if (response.status === 200) {
      //     setisLoading(false);
      //     Swal.fire("Success", "Song has been updated", "success");
      //     navigate("/admin/song");
      //   } else if (response.status !== 200) {
      //     setisLoading(false);
      //     Swal.fire("Error", "Something went wrong", "error");
      //   } else {
      //     setisLoading(false);
      //     Swal.fire("Error", "Something went wrong", "error");
      //   }
      // };
      if (
        payload.title === "" ||
        payload.artists === "" ||
        payload.streaming === "" ||
        payload.thumbnail === "" ||
        // payload.thumbnail_medium === "" ||
        payload.copyrightStatus === "" ||
        payload.moods === ""
      ) {
        addForm.current.scrollIntoView({ behavior: "smooth", block: "center" });

        Swal.fire(
          "Error",
          "Please check full input",

          "error"
        );
        setisLoading(false);
      } else {
        addForm.current.scrollIntoView({ behavior: "smooth", block: "center" });
        setisLoading(true);

        // FetchUpdateSong();
      }
    } else {
      // const FetchCreateSong = async () => {
      //   await apiCreateSong(dataForm)
      //     .then((response) => {
      //       addSong.current.scrollIntoView({ behavior: "smooth" });
      //       if (response.status === 200) {
      //         setisLoading(false);
      //         Swal.fire("Success", "Song has been created", "success");
      //         navigate("/admin/song");
      //       } else {
      //         console.log(response.data);
      //       }
      //     })
      //     .catch((error) => {
      //       setisLoading(false);
      //       Swal.fire("Error", "Something went wrong", "error");
      //     });
      // };
      if (
        payload.title === "" ||
        payload.artists === "" ||
        payload.streaming === "" ||
        payload.thumbnail === "" ||
        payload.copyrightStatus === "" ||
        payload.moods === ""
      ) {
        addForm.current.scrollIntoView({ behavior: "smooth", block: "center" });
        Swal.fire("Error", "Please check full input", "error");
        setisLoading(false);
      } else {
        addForm.current.scrollIntoView({ behavior: "smooth", block: "center" });
        // FetchCreateSong();
        setisLoading(true);
        // console.log(payload)
        // for (const pair of dataForm.entries()) {
        //   console.log(`${pair[0]}, ${pair[1]}`);
        // }
      }
    }
  };
  useEffect(() => {
    dataForm.append("title", payload?.title?.trim());
    dataForm.append("isrc", payload?.isrc?.trim());
    dataForm.append("description", payload.description);
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
    dataForm.append("streaming", payload.streaming);
    dataForm.append("price", payload.price);
    dataForm.append("thumbnail", payload.thumbnail);
    dataForm.append("thumbnail_medium", payload.thumbnail_medium);
    dataForm.append("copyrightStatus", payload.copyrightStatus);
    dataForm.append("tempo", payload.tempo);
    dataForm.append("status", payload.status);
    payload?.hashtags &&
      // eslint-disable-next-line
      payload?.hashtags.map((item) => {
        dataForm.append("hashtag", item);
      });
    // eslint-disable-next-line
  }, [payload]);
  const FetchGetSong = async () => {
    const response = await apiGetDetailSong(sid);
    const data = response.data.data;
    setPayload({
      title: data?.title || "",
      isrc: data?.isrc || "",
      description: data?.description || "",
      license: data?.license?._id || "",
      artists: data?.artists.map((item) => {
        return item._id;
      }),
      composers: data?.composers || "",
      // artists_names: data?.artists_names,

      genres: data?.genres.map((item) => {
        return item._id;
      }),
      moods: data?.moods.map((item) => {
        return item._id;
      }),
      videothemes: data?.videothemes.map((item) => {
        return item._id;
      }),
      instruments: data?.instruments.map((item) => {
        return item._id;
      }),
      album: data?.album?._id || "",
      streaming: data?.streaming || "",
      price: data?.price || "",
      thumbnail: data?.thumbnail || "",
      thumbnail_medium: data?.thumbnail_medium || "",
      copyrightStatus: data?.copyrightStatus || 1,
      tempo: data?.tempo || "",
      status: data?.status,
      hashtags: data?.hashtag || "",
    });

    setAvatarPreview(data?.thumbnail);
    setAvatarPreviewLarge(data?.thumbnail_medium);
    setAudioPreview(data?.streaming);
    setisLoaddingSong(false);
  };
  useEffect(() => {
    if (modeEdit.modeEdit) {
      FetchGetSong();
    }
    // eslint-disable-next-line
  }, [modeEdit]);
  const handleLoading = useCallback(() => {
    if (isLoading) {
      setisLoading(false);
    }
  }, [isLoading]);
  const handlePayLoadHashtag = useCallback(
    (value, type) => {
      if (type === "add") {
        if(value?.length > 1) {
          value = value?.map((item) => {
            return item.trim();
          });
          setPayload({
            ...payload,
            hashtags: [...payload.hashtags, ...value],
          });

        } else {
        setPayload({
          ...payload,
          hashtags: [...payload.hashtags, ...value],
        });
      }
      } else {
        setPayload({
          ...payload,
          hashtags: payload.hashtags.filter(
            (itemHashtag) => itemHashtag !== value
          ),
        });
      }
    },
    [payload]
  );
  return (
    <Fragment>
      <div ref={addSong} id="content-page" className="content-page">
        <div className="container-fluid">
          <div className="row">
            <div ref={addForm} className="col-sm-12">
              <div className="iq-card position-relative">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">
                      {" "}
                      {modeEdit.modeEdit ? "Edit" : "Add"} Song
                    </h4>
                  </div>
                </div>
                <div
                  style={
                    `${modeEdit.modeEdit && isLoaddingSong}` === "true"
                      ? { height: "500px" }
                      : { height: "auto" }
                  }
                  className="iq-card-body"
                >
                  {modeEdit.modeEdit && isLoaddingSong ? (
                    <div
                      style={{
                        position: "absolute",
                        top: "42%",
                        left: "46%",
                      }}
                    >
                      {" "}
                      <Loading />
                    </div>
                  ) : (
                    <form action="admin-song.html">
                      <div className="form-group">
                        <div className="custom-control custom-switch custom-switch-text custom-control-inline">
                          <div className="custom-switch-inner">
                            <input
                              onChange={(e) => {
                                setPayload({
                                  ...payload,
                                  status: e.target.checked,
                                });
                              }}
                              type="checkbox"
                              className="custom-control-input"
                              id="customSwitch-11"
                              defaultChecked={payload.status}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customSwitch-11"
                              data-on-label="On"
                              data-off-label="Off"
                            ></label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>
                          <span className="text-danger font-size-16 font-weight-bold">
                            *{" "}
                          </span>
                          Title:
                        </label>
                        <input
                          value={payload.title}
                          onChange={(e) => {
                            setValidate("");
                            setPayload({
                              ...payload,
                              title: e.target.value,
                            });
                           
                          }}
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          <span className="text-danger font-size-16 font-weight-bold">
                            *{" "}
                          </span>
                          ISRC:
                        </label>
                        <input
                          value={payload.isrc}
                          onChange={(e) => {
                            setValidate("");
                            setPayload({
                              ...payload,
                              isrc: e.target.value,
                            });
                           
                          }}
                          type="text"
                          className="form-control"
                        />
                      </div>
                      {/* <div className="form-group">
                      <label>Artists Names:</label>
                      <input
                        value={payload.artists_names}
                        onChange={(e) => {
                          setValidate("");
                          setPayload({
                            ...payload,
                            artists_names: e.target.value,
                          });
                        }}
                        type="text"
                        className="form-control"
                      />
                    </div> */}
                      <div className="form-group">
                        <label>
                          <span className="text-danger font-size-16 font-weight-bold">
                            *{" "}
                          </span>
                          {`Upload Song:(Tối đa: 100MB)`}
                        </label>
                        <div className="custom-file">
                          <input
                            type="file"
                            accept={".mp3"}
                            className="custom-file-input"
                            id="customFile"
                            onChange={(e) => {
                              if (e.target.files[0]) {
                                setPayload({
                                  ...payload,
                                  streaming: e.target.files[0],
                                });
                                handlePreviewFile(e);
                              }
                            }}
                          />
                          {audioPreview ? (
                            <label
                              className="custom-file-label text-black"
                              htmlFor="customFile"
                            >
                              {audioPreview.name
                                ? audioPreview.name
                                : payload?.title}
                            </label>
                          ) : (
                            <label
                              className={
                                modeEdit.modeEdit
                                  ? "custom-file-label text-black"
                                  : "custom-file-label "
                              }
                              htmlFor="customFile"
                            >
                              {modeEdit.modeEdit
                                ? payload.title
                                : "Choose file"}
                            </label>
                          )}
                        </div>
                      </div>
                      <div
                        style={{
                          color: "black",
                        }}
                        className="form-group"
                      >
                        <label>Genre:</label>
                        <Select
                          isClearable={true}
                          disabled={genre.length}
                          styles={{
                            control: (base, state) => ({
                              ...base,
                              background: "rgba(0,0,0,0)",
                              border: "1px solid #e3e6f0",
                              boxShadow: "none",
                              "&:hover": {
                                border: "1px solid #e3e6f0",
                              },
                              color: "black",
                            }),
                            zIndex: 9999,
                          }}
                          isMulti
                          name="name"
                          options={genre}
                          isSearchable={true}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(e) => {
                            setValidate("");
                            setPayload({
                              ...payload,
                              genres: e.map((item) => {
                                return item.value;
                              }),
                           
                            });
                          }}
                          value={genre?.map((item) => {
                            return payload?.genres?.includes(item.value)
                              ? {
                                  value: item.value,
                                  label: item.label,
                                }
                              : null;
                          })}
                        />
                      </div>
                      <div
                        style={{
                          color: "black",
                        }}
                        className="form-group"
                      >
                        <label>
                          <span className="text-danger font-size-16 font-weight-bold">
                            *{" "}
                          </span>
                          Mood:
                        </label>
                        <Select
                          isClearable={true}
                          disabled={mood.length === 0}
                          styles={{
                            control: (base, state) => ({
                              ...base,
                              background: "rgba(0,0,0,0)",
                              border: "1px solid #e3e6f0",
                              boxShadow: "none",
                              "&:hover": {
                                border: "1px solid #e3e6f0",
                              },
                              color: "black",
                            }),
                            zIndex: 9999,
                          }}
                          isMulti
                          name="name"
                          options={mood}
                          isSearchable={true}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(e) => {
                            setValidate("");
                            setPayload({
                              ...payload,
                              moods: e.map((item) => {
                                return item.value;
                              }),
                             
                            });
                         
                          }}
                          value={mood?.map((item) => {
                            return payload?.moods?.includes(item.value)
                              ? {
                                  value: item.value,
                                  label: item.label,
                                }
                              : null;
                          })}
                        />
                      </div>
                      <div
                        style={{
                          color: "black",
                        }}
                        className="form-group"
                      >
                        <label>Instrument:</label>
                        <Select
                          isClearable={true}
                          disabled={instrument.length === 0}
                          styles={{
                            control: (base, state) => ({
                              ...base,
                              background: "rgba(0,0,0,0)",
                              border: "1px solid #e3e6f0",
                              boxShadow: "none",
                              "&:hover": {
                                border: "1px solid #e3e6f0",
                              },
                              color: "black",
                            }),
                            zIndex: 9999,
                          }}
                          isMulti
                          name="name"
                          options={instrument}
                          isSearchable={true}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(e) => {
                            setValidate("");
                            setPayload({
                              ...payload,
                              instruments: e.map((item) => {
                                return item.value;
                              }),
                            });
                          }}
                          value={instrument?.map((item) => {
                            return payload?.instruments?.includes(item.value)
                              ? {
                                  value: item.value,
                                  label: item.label,
                                }
                              : null;
                          })}
                        />
                      </div>
                      {/* <div
                        style={{
                          color: "black",
                        }}
                        className="form-group"
                      >
                        <label>Video Theme:</label>
                        <Select
                          isClearable={true}
                          disabled={videoTheme.length === 0}
                          styles={{
                            control: (base, state) => ({
                              ...base,
                              background: "rgba(0,0,0,0)",
                              border: "1px solid #e3e6f0",
                              boxShadow: "none",
                              "&:hover": {
                                border: "1px solid #e3e6f0",
                              },
                              color: "black",
                            }),
                            zIndex: 9999,
                          }}
                          isMulti
                          name="name"
                          options={videoTheme}
                          isSearchable={true}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(e) => {
                            setValidate("");
                            setPayload({
                              ...payload,
                              videothemes: e.map((item) => {
                                return item.value;
                              }),
                            });
                          }}
                          value={videoTheme?.map((item) => {
                            return payload?.videothemes?.includes(item.value)
                              ? {
                                  value: item.value,
                                  label: item.label,
                                }
                              : null;
                          })}
                        />
                      </div> */}
                      <div
                        style={{
                          color: "black",
                        }}
                        className="form-group"
                      >
                        <label>
                          <span className="text-danger font-size-16 font-weight-bold">
                            *{" "}
                          </span>
                          Artist:
                        </label>
                        <Select
                          isClearable={true}
                          disabled={artist.length === 0}
                          styles={{
                            control: (base, state) => ({
                              ...base,
                              background: "rgba(0,0,0,0)",
                              border: "1px solid #e3e6f0",
                              boxShadow: "none",
                              "&:hover": {
                                border: "1px solid #e3e6f0",
                              },
                            }),
                            zIndex: 9999,
                          }}
                          isMulti
                          name="name"
                          options={artist}
                          isSearchable={true}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(e) => {
                            setPayload({
                              ...payload,
                              artists: e.map((item) => {
                                return item.value;
                              }),
                            });
                          }}
                          value={artist?.map((item) => {
                            return payload?.artists?.includes(item.value)
                              ? {
                                  value: item.value,
                                  label: item.label,
                                }
                              : null;
                          })}
                        />
                      </div>
                      <div
                        style={{
                          color: "black",
                        }}
                        className="form-group"
                      >
                        <label>Album:</label>
                        <Select
                          // isClearable={true}
                          disabled={album.length === 0}
                          styles={{
                            control: (base, state) => ({
                              ...base,
                              background: "rgba(0,0,0,0)",
                              border: "1px solid #e3e6f0",
                              boxShadow: "none",
                              "&:hover": {
                                border: "1px solid #e3e6f0",
                              },
                            }),
                            zIndex: 9999,
                          }}
                          name="name"
                          options={album}
                          isSearchable={true}
                          className="basic-select"
                          classNamePrefix="select"
                          onChange={(e) => {
                            // console.log(e.value);
                            setPayload({
                              ...payload,
                              album: e.value,
                            });
                          }}
                          value={album?.map((item) => {
                            return payload?.album?.includes(item.value)
                              ? {
                                  value: item.value,
                                  label: item.label,
                                }
                              : null;
                          })}
                        />
                      </div>
                      <div
                        style={{
                          color: "black",
                        }}
                        className="form-group"
                      >
                        <label>
                          <span className="text-danger font-size-16 font-weight-bold">
                            *{" "}
                          </span>
                          License:
                        </label>
                        <Select
                          // isClearable={true}
                          disabled={license.length === 0}
                          styles={{
                            control: (base, state) => ({
                              ...base,
                              background: "rgba(0,0,0,0)",
                              border: "1px solid #e3e6f0",
                              boxShadow: "none",
                              "&:hover": {
                                border: "1px solid #e3e6f0",
                              },
                            }),
                            zIndex: 9999,
                          }}
                          name="name"
                          options={license}
                          isSearchable={true}
                          className="basic-select font-weight-bold"
                          classNamePrefix="select "
                          onChange={(e) => {
                            setPayload({
                              ...payload,
                              license: e.value,
                            });
                          }}
                          value={license?.map((el,index) => {
                            return payload?.license === el.value
                              ? {
                                  value: el.value,
                                  label: el.label,
                                }
                              : null;
                          })}
                        />
                      </div>
                      {/* <div className="form-group">
                        <label>Album:</label>
                        <select
                          className="form-control"
                          id="exampleFormControlSelect1"
                          disabled={album.length === 0}
                          onChange={(e) => {
                            setValidate("");
                            setPayload({
                              ...payload,
                              album: e.target.value,
                            });
                          }}
                          value={payload?.album}
                        >
                          <option value="">Choose Album</option>
                          {album.map((item, index) => {
                            return (
                              <option key={index} value={item.id}>
                                {item.title}
                              </option>
                            );
                          })}
                        </select>
                      </div> */}
                      <HashtagForm
                        handlePayLoadHashtag={handlePayLoadHashtag}
                        hashtags={payload?.hashtags}
                      />
                      <div className="form-group">
                        <label>
                          <span className="text-danger font-size-16 font-weight-bold">
                            *{" "}
                          </span>
                          ContentID:
                        </label>
                        <select
                          className="form-control"
                          id="exampleFormControlSelect1"
                          onChange={(e) => {
                            setValidate("");
                            setPayload({
                              ...payload,
                              copyrightStatus: e.target.value,
                            });
                          }}
                          value={payload.copyrightStatus}
                        >
                          <option value="" disabled="">
                            Choose Status
                          </option>
                          <option value={1}>unregistered
                          </option>
                          <option value={2}>registered</option>
                        </select>
                      </div>
                      {tempo && (
                        <p className="text-primary">
                          Tempo Song Hint
                          <span id="tempso" className="text-danger">
                            {" "}
                            {tempo}
                          </span>
                        </p>
                      )}

                      <div className="form-group">
                        <label>Tempo:</label>
                        <input
                          defaultValue={payload?.tempo}
                          id="tempo"
                          onChange={(e) => {
                            setValidate("");
                            setPayload({
                              ...payload,
                              tempo: e.target.value,
                            });
                          }}
                          // defaultValue={payload?.tempo}
                          type="number"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Price:</label>
                        <input
                          onChange={(e) => {
                            setValidate("");
                            setPayload({
                              ...payload,
                              price: +e.target.value,
                            });
                          }}
                          defaultValue={payload?.price}
                          type="number"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Description:</label>
                        <textarea
                          onChange={(e) => {
                            setValidate("");
                            setPayload({
                              ...payload,
                              description: e.target.value,
                            });
                          }}
                          defaultValue={payload.description}
                          className="form-control"
                          rows="2"
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label>
                          <span className="text-danger font-size-16 font-weight-bold">
                            *{" "}
                          </span>
                          {`Song Art: (Recommended: 400x400)`}
                        </label>
                        <div className="custom-file">
                          <input
                            onChange={(e) => {
                              setPayload({
                                ...payload,
                                thumbnail: e.target.files[0],
                              });
                              handlePreviewThumbnail(e);
                            }}
                            type="file"
                            className="custom-file-input"
                            id="customFileThumbnail"
                            accept="image/*"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFileThumbnail"
                          >
                            Choose file
                          </label>
                        </div>
                      </div>
                      {avatarPreview && (
                        <div
                          className="form-group"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            position: "relative",
                          }}
                        >
                          <img
                            src={
                              avatarPreview?.preview
                                ? avatarPreview?.preview
                                : payload?.thumbnail
                            }
                            className="img-thumbnail"
                            alt="Responsive "
                            style={{
                              width: "400px",
                              height: "300px",
                              objectFit: "cover",
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              bottom: "12%",
                              right: "50%",
                            }}
                            onClick={() => {
                              setPayload({
                                ...payload,
                                thumbnail: "",
                              });
                              setAvatarPreview() &&
                                URL.revokeObjectURL(avatarPreview);
                            }}
                            className="p-image"
                          >
                            <label
                              title="Xóa"
                              style={{ cursor: "pointer" }}
                              htmlFor="file-delete"
                            >
                              <i className="las la-trash upload-button "></i>
                            </label>
                            {/* <i  className="ri-pencil-line upload-button"></i> */}
                          </div>
                        </div>
                      )}
                      <div className="form-group">
                        <label>{`Song Cover: (Recommended: 1600x480) Không thêm sẽ dùng chung ảnh với Song Art`}</label>
                        <div className="custom-file">
                          <input
                            onChange={(e) => {
                              setPayload({
                                ...payload,
                                thumbnail_medium: e.target.files[0],
                              });
                              handlePreviewThumbnailLarge(e);
                            }}
                            type="file"
                            className="custom-file-input"
                            id="customFileThumbnailLarge"
                            accept="image/*"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFileThumbnailLarge"
                          >
                            Choose file
                          </label>
                        </div>
                      </div>
                      {avatarPreviewLarge && (
                        <div
                          className="form-group"
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <div className="position-relative">
                            <img
                              src={
                                avatarPreviewLarge.preview
                                  ? avatarPreviewLarge.preview
                                  : payload?.thumbnail_medium
                              }
                              className="img-thumbnail"
                              alt="Responsive "
                              style={{
                                width: "500px",
                                objectFit: "cover",
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                bottom: "45%",
                                right: "50%",
                              }}
                              onClick={() => {
                                setPayload({
                                  ...payload,
                                  thumbnail_medium: "",
                                });
                                setAvatarPreviewLarge() &&
                                  URL.revokeObjectURL(avatarPreviewLarge);
                              }}
                              className="p-image"
                            >
                              <label
                                title="Xóa"
                                style={{ cursor: "pointer" }}
                                htmlFor="file-delete"
                              >
                                <i className="las la-trash upload-button "></i>
                              </label>
                              {/* <i  className="ri-pencil-line upload-button"></i> */}
                            </div>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={handleSubmit}
                        style={{ marginRight: "8px" }}
                        type="button"
                        className="btn btn-primary"
                        // data-toggle="modal"
                        // data-target="#exampleModalCenter"
                      >
                        {modeEdit.modeEdit ? "Update" : "Submit"}
                      </button>
                      <button
                        disabled={payload?.title ? false : true}
                        style={{ marginRight: "4px" }}
                        type="reset"
                        className="btn btn-danger"
                        onClick={handleClear}
                      >
                        Reset
                      </button>
                    </form>
                  )}
                </div>
                {isLoading && (
                  <UploadingFile
                    payload={payload}
                    handleLoading={handleLoading}
                    modeEdit={modeEdit}
                    sid={sid}
                  />
                  // <div
                  // onClick={() => {
                  //   setisLoading(false);
                  // } }
                  //   style={{
                  //     top: "0",
                  //     backgroundColor: "rgba(0,0,0,0.3)",
                  //     borderRadius: "15px",
                  //     zIndex: "3",
                  //   }}
                  //   className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center "
                  // >
                  //   <div className="modal-dialog modal-dialog-centered w-100">
                  //     <div className="modal-content">
                  //       <div className="modal-header ">
                  //         <h5
                  //           className="modal-title text-center"
                  //           id="exampleModalCenterTitle"
                  //         >
                  //          File Uploading...{" "}
                  //         </h5>
                  //       </div>
                  //       <div className="modal-body">
                  //         <div className="progress w-100 h-100">
                  //           <div
                  //             className="progress-bar progress-bar-striped progress-bar-animated"
                  //             role="progressbar"
                  //             aria-valuenow={100}
                  //             aria-valuemin={0}
                  //             aria-valuemax={100}
                  //             style={{ width: 100 + "%" }}
                  //           >
                  //             {100 + "%"}
                  //           </div>
                  //         </div>

                  //       </div>
                  //       <div className="modal-footer">
                  //       <small className="float-left font-size-12 ">
                  //           Uploading...
                  //         </small>
                  //       </div>
                  //     </div>
                  //   </div>
                  // </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddSong;
