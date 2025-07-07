import React from 'react'

const TextAreaHookForm = ({
    label,
    disabled,
    register,
    errors,
    id,
    validate,
    placeholder,
    fullWidth,
    defaultValue,
    style,
    readOnly,
    rows,
  }) => {
  return (
    <div className={`form-group ${errors[id] ? "mb-0" : ""}`}>
    {label && <label htmlFor={id}>{label}</label>}
    <textarea
    readOnly={readOnly}
      autoComplete="off"
      id={id}
      {...register(id, validate)}
      disabled={disabled}
      placeholder={placeholder}
      className={`form-control ${fullWidth ? "w-100" : ""} ${style} `}
      defaultValue={defaultValue ? defaultValue : ""}
      rows={rows}
    />
    {errors[id] && (
      <span className="text-danger font-size-12 p-0">
        {errors[id].message}
      </span>
    )}
  </div>
  )
}

export default TextAreaHookForm