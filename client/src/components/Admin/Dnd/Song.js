import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as actions from "store/actions";
import { useDispatch, useSelector } from "react-redux";

function Song({ song,setList }) {
  const dispatch = useDispatch();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: song.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const { currentSongID, isPlaying } = useSelector((state) => state.music);
  const handlePlayMusic = (song) => {
    if (song?.streaming !== undefined) {
      if (isPlaying && currentSongID === song.id) {
        dispatch(actions.setIsPlaying(false));
      } else {
        dispatch(actions.playAlbum(false));
        dispatch(actions.setCurrentSongId(song.id));
        dispatch(actions.setIsPlaying(true));
      }
    }
  };
  //prevent drag song when click play button

  return (
    <div
      style={style}
      ref={setNodeRef}
      className="bg-light d-flex justify-content-between align-items-center row position-relative my-2 shadow-sm p-1 rounded-pill"
    >
      <div className="col-12 media align-items-center ">
        <div
          onClick={(e) => {
            handlePlayMusic(song);
          }}
          className="iq-thumb-hotsong "
        >
          {(song?.thumbnail || song?.album?.album_art)
           ? (
          <div>
            <img
              style={{
                objectFit: "cover",
              }}
              src={song?.thumbnail ? song.thumbnail : song.album?.album_art}
              className="img-fluid avatar-50 rounded"
              alt=""
            />
          </div>
          ) : (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "60px",
                height: "60px",
              }}
            >
              <i className="ri-surround-sound-line sfx-player-icon text-primary"></i>
            </div>
          )}
          <div className="overlay-music-icon ">
            <a>
              <i className="las la-play-circle bg-primary rounded-circle font-size-24"></i>
            </a>
          </div>
        </div>
        <div className="media-body ml-3 ">
          <p
            className="mb-0 musicplayer-song-title description-infor-1-line"
            data-toggle="tooltip"
            title={song?.title}
          >
            {song?.title}
          </p>
          {song?.artists &&
            song?.artists?.map((item, index, self) => {
              return (
                <small
                  key={index}
                  className=""
                  data-toggle="tooltip"
                  title={item.name}
                >
                  {item.name + (index === self.length - 1 ? "" : ", ")}
                </small>
              );
            })}
        </div>
       
        <div className="flex align-items-center list-user-action">
          <a
            className="bg-primary"
            data-toggle="tooltip"
            data-placement="top"
            title="Drag"
            {...attributes}
            {...listeners}
            data-original-title="Edit"
          >
            <i className="las la-arrows-alt font-size-20"></i>
          </a>
          <a
            className="bg-danger"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
            data-original-title="Delete"
            onClick={() => {
              setList((list) => {
                const newList = list.filter((item) => item.id !== song.id);
                return newList;
              });
            }}
          >
            <i className="ri-indeterminate-circle-line font-size-20  " />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Song;
