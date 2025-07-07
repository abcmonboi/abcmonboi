import React, { useState } from "react";

const HashtagForm = ({ hashtags, handlePayLoadHashtag }) => {
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");
  const handlerHashtag = async (e) => {
    if (e.which == 13 && e.target.value != "") {
      //split hashtag by comma
      const arrTags = e.target.value.split(",");

      if (arrTags.length > 1) {
        var newArr = [];
        for (let i = 0; i < arrTags.length; i++) {
          if (hashtags?.includes(arrTags[i].trim())) {
            // setTag("");
            !error && setError("Include hashtag already exists");
            //remove hashtag exist in arrTags
            //  arrTags.filter((item) => item !== arrTags[i].trim());
            // return;
          } else {
            newArr.push(arrTags[i].trim());
            // setTag("");
          }
        }
        setTag("");
        handlePayLoadHashtag(newArr, "add");
      } else {
        if (hashtags?.includes(arrTags[0].trim())) {
          setTag("");
          setError("Hashtag already exists");
          return;
        } else {
          handlePayLoadHashtag(arrTags, "add");
          setTag("");
        }
      }
    }
  };
  return (
    <div className="form-group ">
      <label>
        <span className="text-danger font-size-16 font-weight-bold">* </span>
        {`Hashtags: (Press Enter to add)`}
      </label>
      <div className="position-relative d-flex align-items-center ">
        <input
          onKeyUp={handlerHashtag}
          type="text"
          className="form-control "
          value={tag}
          onChange={(e) => {
            setTag(e.target.value);
            setError("");
          }}
        />
        {hashtags?.length > 0 && (
        <i
          onClick={() => {
            setTag("");
          }}
          style={{
            right: "2%",
            zIndex: "9999",
            cursor: "pointer",
          }}
          className="fa fa-trash position-absolute"
        />
      )}
      </div>
      <small id="error" className="text-danger ">
        {error}
      </small>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
        }}
        className="tag-container"
      >
        {hashtags &&
          hashtags.map((item, index) => {
            return (
              <div
                className="d-flex align-items-center justify-content-between m-2 p-1 bg-light text-black-50 "
                key={index}
                style={{
                  fontSize: "85%",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handlePayLoadHashtag(item, "remove");
                }}
              >
                <span className="pl-1">{item}</span>
                <div className=" pl-2 pr-2 text-black font-weight-bolder">
                  x
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HashtagForm;
