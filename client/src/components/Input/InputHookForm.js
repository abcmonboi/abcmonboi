import React, { memo } from "react";

const InputHookForm = ({
  label,
  disabled,
  register,
  errors,
  id,
  validate,
  type = "text",
  placeholder,
  fullWidth,
  defaultValue,
  style,
  readOnly
}) => {
  return (
    <div className={`form-group ${errors[id] ? "mb-0" : ""}`}>
      {label && <label htmlFor={id}>{label}</label>}
      
      <input
      readOnly={readOnly}
        autoComplete="off"
        type={type}
        id={id}
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        className={`form-control ${fullWidth ? "w-100" : ""} ${style} `}
        defaultValue={defaultValue ? defaultValue : ""}
      />
      {errors[id] && (
        <span className="text-danger font-size-12 p-0">
          {errors[id].message}
        </span>
      )}
    </div>
  );
};

export default memo(InputHookForm);
