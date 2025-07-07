import React, { memo } from "react";

const SearchInput = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInvalidFields,
  style,
  fullWidth,
  placeholder,
  isHidelabel,
}) => {
  return (
    <div className="justify-content-between">
      <div className="col-sm-12 col-md-6">
        <div className="iq-search-bar  mt-2 ">
          <div className="searchbox w-100">
            <input
              value={value}
              type={type || "text"}
              className="text search-input w-100"
              onChange={(e) =>
                setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
              }
              onFocus={() => setInvalidFields && setInvalidFields([])}
              placeholder={
                placeholder ||
                nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)
              }
            />
            <div className="search-link">
              <i className="ri-search-line text-black"></i>
            </div>
            <a
              style={{
                pointerEvents: value ? "auto" : "none",
                cursor: value ? "pointer" : "default",
              }}
              onClick={() => {
                setValue((prev) => ({ ...prev, [nameKey]: "" }));
                setInvalidFields && setInvalidFields([])
              } }
              className="search-audio"
            >
              <i className="las la-times text-black"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SearchInput);
