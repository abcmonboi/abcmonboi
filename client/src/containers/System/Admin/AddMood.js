import React, { Fragment, useEffect, useState } from "react";
import { apiCreateMood, apiGetMood, apiUpdateMood } from "../../../apis";
import Swal from "sweetalert2";
import { Loading } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
const AddMood = (modeEdit) => {
  const { mid } = useParams();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [validate, setValidate] = useState("");
  const [payload, setPayload] = useState({
    name: "",
  });
  const FetchGetMood = async () => {
    await apiGetMood(mid)
      .then((response) => {
        const data = response.data.data;
        setPayload({
          name: data.name,
        });
        setisLoading(false);
      })
      .catch((error) => {
        Swal.fire("Error", `${error.response.data.message}`, "error"); //change from `error.response.data.message` to `${error.response.data.message}
        setisLoading(false);
      });
  };
  useEffect(() => {
    if (modeEdit.modeEdit) {
      setisLoading(true);
      FetchGetMood();
    }
    // eslint-disable-next-line
  }, [modeEdit]);

  const handleSubmit = () => {
    if (modeEdit.modeEdit) {
      const FetchUpdateMood = async () => {
        await apiUpdateMood(mid, payload)
          .then((response) => {
            if (response.status === 200) {
              Swal.fire("Success", "Mood has been updated", "success");
              navigate("/admin/mood");
            } else {
              Swal.fire("Error", `${response.data.mes}`, "error"); //change from `error.response.data.message` to `${error.response.data.message}
            }
          })
          .catch((error) => {
            if(error.response.data.mes.includes("E11000")){
                Swal.fire("Error", `Mood name đã tồn tại`, "error");
            }else {
            Swal.fire("Error", `${error.response.data.mes}`, "error");
            } //change from `error.response.data.message` to `${error.response.data.message}
          });
        };
        if (payload.name === "") {
          setValidate("Mood name is required");
        } else if (payload.name.length < 3) {
          setValidate("Mood name must be at least 3 characters");
        } else {
          FetchUpdateMood();
        }
      
    } else {
      const FetchCreateMood = async () => {
        await apiCreateMood(payload).then((response) => {
        if (response.status === 200) {
          Swal.fire("Success", "Mood has been created", "success");
          navigate("/admin/mood");
        } else {
          Swal.fire("Error", `${response.data.mes}`, "error"); //change from `error.response.data.message` to `${error.response.data.message}
        }
    }).catch((error) => {
        if(error.response.data.mes.includes("E11000")){
            Swal.fire("Error", `Mood name đã tồn tại`, "error");
        }else {
        Swal.fire("Error", `${error.response.data.mes}`, "error");
        }
         //change from `error.response.data.message` to `${error.response.data.message}
    });
      };
      if (payload.name === "") {
        setValidate("Mood name is required");
      } else if (payload.name.length < 3) {
        setValidate("Mood name must be at least 3 characters");
      } else {
        FetchCreateMood();
      }
    }
  };
  return (
    <Fragment>
      <div id="content-page" className="content-page">
        <div className="container-fluid">
          <div className="row">
            {isLoading ? (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                }}
              >
                {" "}
                <Loading />
              </div>
            ) : (
              <div className="col-sm-12">
                <div className="iq-card">
                  <div className="iq-card-header d-flex justify-content-between">
                    <div className="iq-header-title">
                      <h4 className="card-title">
                        {" "}
                        {modeEdit.modeEdit ? "Edit Mood" : "Add Mood"}
                      </h4>
                    </div>
                  </div>
                  <div className="iq-card-body">
                    <form action="admin-category.html">
                      <div className="form-group">
                        <label> Name:</label>
                        <input
                          defaultValue={modeEdit.modeEdit ? payload.name : ""}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setValidate("");
                            setPayload({
                              ...payload,
                              name: e.target.value.trim(),
                            });
                          }}
                        />
                        <small className="text-danger">{validate}</small>
                      </div>

                      <button
                        onClick={handleSubmit}
                        style={{ marginRight: "4px" }}
                        type="button"
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
                      <button
                        onClick={() => {
                          setPayload({
                            name: "",
                          });
                        }}
                        type="reset"
                        className="btn btn-danger"
                      >
                        Reset
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddMood;
