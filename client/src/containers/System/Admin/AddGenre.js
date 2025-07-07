import React, { Fragment, useEffect, useState } from "react";
import { apiCreateGenre, apiGetGenre,apiUpdateGenre } from "../../../apis";
import Swal from "sweetalert2";
import { Loading } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";

const AddGenre = (modeEdit) => {
  const { gid } = useParams();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [validate, setValidate] = useState("");
  const [payload, setPayload] = useState({
    name: "",
    description: "",
  });
  const FetchGetGenre = async () => {
    const response = await apiGetGenre(gid);
    const data = response.data.data;
    setPayload({
        name: data.name,
        description: data.description,
        });
    setisLoading(false);
  };
  useEffect(() => {
 
    if (modeEdit.modeEdit) {    
        setisLoading(true);  
      FetchGetGenre();
        
    }
    // eslint-disable-next-line
  }, [modeEdit]);

  const handleSubmit = () => {
    if (modeEdit.modeEdit) {
        const FetchUpdateGenre = async () => {
            const response = await apiUpdateGenre(gid,payload);
            if (response.status === 200) {
              Swal.fire("Success", "Genre has been updated", "success");
              navigate("/admin/genre");
            } else {
              Swal.fire("Error", "Something went wrong", "error");
            }
          };
          if (payload.name === "") {
            setValidate("Genre name is required");
          } else if (payload.name.length < 3) {
            setValidate("Genre name must be at least 3 characters");
          } else {
            FetchUpdateGenre();
          }
    } else {
      const FetchCreateGenre = async () => {
        const response = await apiCreateGenre(payload);
        if (response.status === 200) {
          Swal.fire("Success", "Genre has been created", "success");
          navigate("/admin/genre");
        } else {
          Swal.fire("Error", "Something went wrong", "error");
        }
      };
      if (payload.name === "") {
        setValidate("Genre name is required");
      } else if (payload.name.length < 3) {
        setValidate("Genre name must be at least 3 characters");
      } else {
        FetchCreateGenre();
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
                    {modeEdit.modeEdit ? "Edit Genre" : "Add Genre"}
                  </h4>
                </div>
              </div>
              <div className="iq-card-body">
                <form action="admin-category.html">
                  <div className="form-group">
                    <label>Genre Name:</label>
                    <input
                      defaultValue={
                        modeEdit.modeEdit ? payload.name : ""
                      }
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
                  <div className="form-group">
                    <label>Genre Description:</label>
                    <textarea
                      defaultValue={
                        modeEdit.modeEdit
                        ? payload.description : ""
                      }
                      onChange={(e) => {
                        setPayload({
                          ...payload,
                          description: e.target.value.trim(),
                        });
                      }}
                      className="form-control"
                      rows="4"
                    ></textarea>
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
                        description: "",
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
          </div>)}
        </div>
      </div>
    </div>
    </Fragment>
  );
};

export default AddGenre;
