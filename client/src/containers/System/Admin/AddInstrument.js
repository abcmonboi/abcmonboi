import React, { Fragment, useEffect, useState } from "react";
import { apiCreateInstrument, apiGetInstrument, apiUpdateInstrument } from "../../../apis";
import Swal from "sweetalert2";
import { Loading } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
const AddInstrument = (modeEdit) => {
    const { mid } = useParams();
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);
    const [validate, setValidate] = useState("");
    const [payload, setPayload] = useState({
      name: "",
    });
    const FetchGetInstrument = async () => {
      await apiGetInstrument(mid)
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
        FetchGetInstrument();
      }
      // eslint-disable-next-line
    }, [modeEdit]);
  
    const handleSubmit = () => {
      if (modeEdit.modeEdit) {
        const FetchUpdateInstrument = async () => {
          await apiUpdateInstrument(mid, payload)
            .then((response) => {
              if (response.status === 200) {
                Swal.fire("Success", "Instrument has been updated", "success");
                navigate("/admin/instrument");
              } else {
                Swal.fire("Error", `${response.data.mes}`, "error"); //change from `error.response.data.message` to `${error.response.data.message}
              }
            })
            .catch((error) => {
              if(error.response.data.mes.includes("E11000")){
                  Swal.fire("Error", `Instrument name đã tồn tại`, "error");
              }else {
              Swal.fire("Error", `${error.response.data.mes}`, "error");
              } //change from `error.response.data.message` to `${error.response.data.message}
            });
          };
          if (payload.name === "") {
            setValidate("Instrument name is required");
          } else if (payload.name.length < 3) {
            setValidate("Instrument name must be at least 3 characters");
          } else {
            FetchUpdateInstrument();
          }
        
      } else {
        const FetchCreateInstrument = async () => {
          await apiCreateInstrument(payload).then((response) => {
          if (response.status === 200) {
            Swal.fire("Success", "Instrument has been created", "success");
            navigate("/admin/instrument");
          } else {
            Swal.fire("Error", `${response.data.mes}`, "error"); //change from `error.response.data.message` to `${error.response.data.message}
          }
      }).catch((error) => {
          if(error.response.data.mes.includes("E11000")){
              Swal.fire("Error", `Instrument name đã tồn tại`, "error");
          }else {
          Swal.fire("Error", `${error.response.data.mes}`, "error");
          }
           //change from `error.response.data.message` to `${error.response.data.message}
      });
        };
        if (payload.name === "") {
          setValidate("Instrument name is required");
        } else if (payload.name.length < 3) {
          setValidate("Instrument name must be at least 3 characters");
        } else {
          FetchCreateInstrument();
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
                      {modeEdit.modeEdit ? "Edit Instrument" : "Add Instrument"}
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
  )
}

export default AddInstrument