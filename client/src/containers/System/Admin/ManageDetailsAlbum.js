import React, {
  useState,
  useEffect,
  Fragment,
  useRef,
  useCallback,
} from "react";
import {
  apiCreateAlbum,
  apiGetAlbumById,
  apiUpdateAlbum,
  apiFilterSearchSong,
} from "../../../apis";
import { useNavigate, useParams } from "react-router-dom";
import {
  CreateMultiSongComponent,
  DetailsAlbumComponent,
} from "../../../components";
import TableSongByAlbumComponent from "../../../components/Admin/ManageDetailsAlbum/TableSongByAlbumComponent";

const ManageDetailsAlbum = () => {
  const { aid } = useParams();
  const [isLoading, setisLoading] = useState(true);
  const [isLoadingSong, setisLoadingSong] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [album, setAlbum] = useState();
  const [song, setSong] = useState();
  const [showUploadMultiSong, setShowUploadMultiSong] = useState(false);
  const fields = ["title", "artists", "status", "thumbnail","createdAt","updatedAt"];
  const [totalSong, setTotalSong] = useState();
  const ManageDetailsAlbumRef = useRef(null);
  const FetchGetAlbum = async () => {
    const response = await apiGetAlbumById(aid);
    const data = response.data.data;
    setAlbum(data);
    setisLoading(false);
  };
  const FetchSongByAlbum = async () => {
    const response = await apiFilterSearchSong({
      album: aid,
      fields: fields.join(","),
      limit: 30,
      sort : "-updatedAt",
    });
    const data = response?.data?.data;
    setSong(data);
    setTotalSong(response?.data?.counts);
    setisLoadingSong(false);
  };

  const handleModal = useCallback(
    (value) => {
      setShowModal(value);
    },
    [showModal]
  );
  const handleLoadingSong = useCallback(
    (value) => {
      setisLoadingSong(value);
    },
    [isLoadingSong]
  );
  const handleLoading = useCallback(
    (value) => {
      setisLoading(value);
    },
    [isLoading]
  );
  const handleUploadMultiSong = useCallback(
    (value) => {
      //  showModal ? setShowModal(false) : setShowModal(true);
      setShowUploadMultiSong(value);
    },
    [showUploadMultiSong]
  );
  useEffect(() => {
    if (!showModal && aid && isLoadingSong) {
      FetchGetAlbum();
      FetchSongByAlbum();
      ManageDetailsAlbumRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isLoadingSong]);

  return (
    <div
      ref={ManageDetailsAlbumRef}
      id="content-page "
      className="content-page "
    >
      <div className="container-fluid ">
        <DetailsAlbumComponent
          handleUploadMultiSong={handleUploadMultiSong}
          album={album}
          isLoading={isLoading}
          totalSong={totalSong}
          handleModal={handleModal}
          showModal={showModal}
          handleLoading={handleLoading}
          handleLoadingSong={handleLoadingSong}
        />
        {showUploadMultiSong ? (
          <CreateMultiSongComponent
            album={album}
            handleLoading={handleLoading}
            handleLoadingSong={handleLoadingSong}
            handleUploadMultiSong={handleUploadMultiSong}
          />
        ) : (
          <TableSongByAlbumComponent
            song={song}
            isLoadingSong={isLoadingSong}
            handleModal={handleModal}
            showModal={showModal}
            handleLoadingSong={handleLoadingSong}
            handleLoading={handleLoading}
          />
        )}
      </div>
    </div>
  );
};

export default ManageDetailsAlbum;
