import React, { 
  // useEffect,
   memo,
    // useState
   } from "react";
import { Editor } from "@tinymce/tinymce-react";
// import { useRef } from "react";

const MarkdownEditor = ({
  label,
  value,
  changeValue,
  name,
  invalidFields,
  setInvalidFields,
}) => {
  // const [ data, setData ] = useState(value);
  // const editorRef = useRef(null);
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };
// console.log("value", value)
  return (
    <div className="form-group">
      <span>{label}</span>
      <Editor
        apiKey={process.env.REACT_APP_MCETINY}
        // initialValue={value}
        value={value || ""}
        init={{
          plugins:
            "advlist autolink link image lists codesample accordion anchor autolink wordcount visualchars visualblocks table searchreplace save preview " +
            "pagebreak nonbreaking media insertdatetime importcss help fullscreen emoticons directionality code charmap autoresize",
          toolbar:
            "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | outdent indent" +
            "accordion numlist bullist anchor link wordcount visualchars visualblocks image help" +
            "table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol " +
            "searchreplace" +
            "quickbars preview pagebreak nonbreaking media insertdatetime fullscreen emoticons ltr rtl codesample code charmap restoredraft",
          link_default_target: "_blank",
          insertdatetime_formats: [
            "%H:%M:%S",
            "%Y-%m-%d",
            "%I:%M:%S %p",
            "%D",
            "%d-%m-%Y",
            "%d/%m/%Y",
          ],
          insertdatetime_timeformat: "%H:%M:%S",
          help_accessibility: false,

          // visualchars_default_state: true,
          // visualblocks_default_state: true
          // height: 500,
          // menubar: false,
          // plugins: [
          //   'advlist autolink lists link image charmap print preview anchor',
          //   'searchreplace visualblocks code fullscreen',
          //   'insertdatetime media table paste code help wordcount'
          // ],
          // plugins: [
          //   'advlist link image lists',
          //   // 'media mediaembed',
          // ],
          // onInit: (evt, editor) => {
          //   editorRef.current = editor;
          //   console.log('Editor is ready to use!', editor);
          // },
          // plugins: ["link"],
          // toolbar:
          //   "undo redo | formatselect | " +
          //   "bold italic backcolor | alignleft aligncenter " +
          //   "alignright alignjustify | bullist numlist outdent indent | " +
          //   "removeformat | help | link",
          // default_link_target: "_blank",
          // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        // onChange={(e) =>
        //   changeValue((prev) => ({ ...prev, [name]: e.target.getContent() }))
        // }
        onFocus={() => {
          setInvalidFields && setInvalidFields([]);
        }}
        onEditorChange={(e) =>{
           changeValue((prev) => ({ ...prev, [name]: e }));
        }
        }
      />
      {/* <textarea
        style={{ width: '100%', height: '200px' }}
        value={data}
        onChange={(e) => setData(e.target.value)}
      /> */}
      {invalidFields?.some((el) => el === name) && (
        <span className="text-danger font-size-12 p-0">
          {invalidFields?.find((el) => el === name)?.mes}
        </span>
      )}
    </div>
  );
};

export default memo(MarkdownEditor);
