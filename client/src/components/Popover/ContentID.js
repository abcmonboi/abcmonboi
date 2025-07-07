import React, { memo } from "react";

const ContentID = () => {
  return (
    <div
      className="popover fade bs-popover-right border border-primary show"
      role="tooltip"
      id="popover1"
      style={{
        position: "absolute",
        transform: "translate3d(506px, 214px, 0px)",
        top: 0,
        left: 0,
        willChange: "transform",
      }}
      x-placement="right"
    >
      <div className="arrow " style={{ top: 17 }} />

      <h3
        className="popover-header bg-primary border border-primary d-flex  align-items-center
        "
      ></h3>
      <div className="popover-body">
        <span className="">
          <p>Bài hát này đã được đăng ký Content ID</p>
        </span>
      </div>
    </div>
  );
};

export default memo(ContentID);
