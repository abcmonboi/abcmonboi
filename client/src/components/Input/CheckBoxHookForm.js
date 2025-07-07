import React, { memo } from "react";

const CheckBoxHookForm = ({
  label,
  disabled,
  register,
  errors,
  id,
  validate,
  type = "checkbox",
  fullWidth,
  defaultValue,
  defaultChecked,
}) => {
  return (
    <div className={`form-group ${errors[id] ? "mb-0" : ""}`}>
      <div className="custom-control custom-switch custom-switch-text custom-control-inline align-items-center ">
        {label && <label htmlFor={id}>{label}</label>}
        <div className={`custom-switch-inner ${label ? "ml-2" : ""}`}>
          <input
            autoComplete="off"
            type={type}
            id={id}
            {...register(id, validate)}
            disabled={disabled}
            className={`custom-control-input`}
            defaultValue={defaultValue ? defaultValue : ""}
            defaultChecked={defaultChecked ? defaultChecked : ""}
          />
          <label
            className="custom-control-label"
            htmlFor={id}
            data-on-label="On"
            data-off-label="Off"
          >
          </label>
        </div>
      </div>
      {errors[id] && (
        <span className="text-danger font-size-12 p-0">
          {errors[id].message}
        </span>
      )}
    </div>
  );
};

export default memo(CheckBoxHookForm);
