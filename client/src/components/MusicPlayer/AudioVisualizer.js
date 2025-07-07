import React, { memo } from "react";
import { useRef } from "react";

 const AudioVisualizer = (props) => {
  // the homepage has a function to map through all the objects     in the
  // database, and in return i get every object. I then get the link from each
  // object and pass this link into this function as an ARgument.
  // let link = props;
  const audioRef = useRef();

  // useEffect(() => {
  //   audioRef.current.innerHTML = "";

  //   if (audioRef.current) {
  //     let audioTrack = wavesurfer.create({
  //       container: audioRef.current,
  //       // scrollParent: false,
  //       // waveColor: "#cdedff",
  //       waveColor: "#1faf16",
  //       // progressColor: "#1AAFFF",
  //       height: 50,
  //     });
  //     audioTrack.load(props?.song?.streaming);
  //     // audioTrack.on("ready", function () {
  //     //   audioTrack.resume();
  //     // }
  //     // );
  //   }
  //   // create audiowaeform by baseAudioContext and canvas
   
   

  // }, [props?.song?.streaming]);
  return (
    <p
      style={{
        padding: "0px",
        cursor: "pointer",
      }}
      className="mb-0 col-md-4 col-md-4 audio-visualizer "
      ref={audioRef}
    ></p>
  
  );
};
export default memo(AudioVisualizer);