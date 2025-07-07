import React from "react";

const SelectHookForm = ({
  label,
  options = [],
  register,
  errors,
  id,
  validate,
  style,
  fullWidth,
  defaultValue,
  multiple
}) => {
  return (
    <div className={`form-group ${errors[id] ? "mb-0" : ""}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        {...register(id, validate)}
        className={`form-control ${fullWidth ? "w-100" : ""} `}
        defaultValue={defaultValue}
        multiple={multiple}
      >
        {/* <option value="">Select...</option> */}
        {options.map((el, index) => (
          <option key={index} value={el.code}>
            {el.value}
          </option>
        ))}
      </select>
      {errors[id] && (
        <span className="text-danger font-size-12 p-0">
          {errors[id].message}
        </span>
      )}
    </div>
  );
};

export default SelectHookForm;
