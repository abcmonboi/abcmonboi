import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function User({ song }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: song._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    // <li className="mb-3 music-player">
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="bg-light d-flex justify-content-between align-items-center row position-relative my-2 shadow-sm p-1 rounded-pill"
    >
      {/*Thumnail Title 4 */}
      <div className="col-12 media align-items-center ">
        <div className="iq-thumb-hotsong">
          <a>
            <img
              style={{
                objectFit: "cover",
              }}
              src={song?.thumbnail ? song.thumbnail : song.album?.album_art}
              className="img-fluid avatar-50 rounded"
              alt=""
            />
          </a>
          <div
            // onClick={() => {
            //   handlePlayMusic(song);
            // }}
            className="overlay-music-icon pr-0 pl-0 "
          >
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
      </div>
    </div>
    // </li>
  );
}

export default User;
