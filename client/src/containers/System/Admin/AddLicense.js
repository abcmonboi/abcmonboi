import { InputHookForm, MarkdownEditor } from "components";
import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { apiCreateLicense, apiGetAllLicense,apiGetLicense,apiUpdateLicense } from "apis";
import Swal from "sweetalert2";
import { useNavigate,useParams } from "react-router-dom";
import { path } from "ultils/constant";
const AddLicense = ({modeEdit}) => {
  const { lid } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
    // eslint-disable-next-line
  const [data, setData] = useState([]);
  const fetchAllLicense = async () => {
    apiGetAllLicense({ sort: "title" }).then((res) => {
      const data = res.data.data;
      setData(
        data.map((el) => ({
          code: el._id,
          value: el.title,
        }))
      );
    });
  };
  useEffect(() => {
    fetchAllLicense();
  }, []);
  const [payload, setPayload] = useState({
    description: "",
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    // eslint-disable-next-line
    [payload]
  );
  const handleCreateData = async (data) => {
    //check if payload is empty
    const finalPayload = { ...data, ...payload };
    if(modeEdit){
      await apiUpdateLicense(lid,finalPayload).then((res)=>{
        Swal.fire("Success", "Update data successfully", "success").then(() => {
          navigate(path.ADMIN.HOME + path.ADMIN.MANAGELICENSE);
        });
      }).catch((err)=>{
        Swal.fire("Error", `${err.response.data.mes}`, "error");
      })
    } else {
    // const formData = new FormData();
    // for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
    await apiCreateLicense(finalPayload)
      .then((res) => {
        Swal.fire("Success", "Create data successfully", "success").then(() => {
          navigate(path.ADMIN.HOME + path.ADMIN.MANAGELICENSE);
        });
      })
      .catch((err) => {
        Swal.fire("Error", `${err.response.data.mes}`, "error");
      });
    }

  };
  //   console.log("watch", watch('data'));
  const FetchGetData = async () => {
    const response = await apiGetLicense(lid);
    const data = response.data.data;
    reset({
      title: data.title,
    });
    setPayload({
      description: data.description,
    });

  };
  useEffect(() => {
    reset({
      title: "",
    });
    setPayload({
      description: "",
    });
    if (modeEdit) {
      FetchGetData();
    }
    // eslint-disable-next-line
  }, [modeEdit]);
  return (
    <div id="content-page" className="content-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">
                    {modeEdit ? "Edit License" : "Add New License"}
                    </h4>
                </div>
              </div>
              <div className="iq-card-body">
                <form onSubmit={handleSubmit(handleCreateData)}>
                  <InputHookForm
                    label="Title"
                    id="title"
                    type="text"
                    placeholder="Enter title"
                    fullWidth={true}
                    register={register}
                    errors={errors}
                    validate={{ required: "Required!" }}
                  />
                  {/* <SelectHookForm
                    label="Data"
                    options={data}
                    register={register}
                    id={"data"}
                    errors={errors}
                    validate={{ required: "Required!" }}
                  /> */}
                  <MarkdownEditor
                  value={payload?.description}
                    name="description"
                    changeValue={changeValue}
                    label="Description:"
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                  />

                  <button type="submit" className="btn btn-primary mr-2">
                    {modeEdit ? "Edit" : "Create"}
                  </button>
                  <button type="reset" className="btn btn-danger">
                    Reset
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLicense;
