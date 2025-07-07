import React, { memo } from "react";

const InputSelect = ({ value, changeValue, options }) => {
  return (
    <select
      className="form-control"
      value={value}
      onChange={(e) => changeValue(e.target.value)}
    >
        <option value="-createdAt">Sắp xếp ...</option>
      {options?.map((el) => (
        <option key={el?.id} value={el?.value}>
          {el?.vn_text}
        </option>
      ))}
    </select>
  );
};

export default memo(InputSelect);
