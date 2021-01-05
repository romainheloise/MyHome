import { apiUrl } from "../../module/apiUrl";
import "./Gallery.scss";
import { UserContext } from "../GetLoggedStatus";
import { useContext, useRef, useState } from "react";
import Axios from "axios";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { ModalContext } from "../Routes/RoutesApp";
import stopBody from "../../module/stopBody";
import useRequest from "../../customHooks/useRequest";
import useIntersectionObs from "../../customHooks/useIntersectionObs";
import MiniLoader from "../MiniLoader/MiniLoader";
import { Redirect } from "react-router-dom";
import useWindowSize from "../../customHooks/useWindowSize";

const Gallery = ({ path, id, userId, galleryState, title }) => {
  const [userStatus] = useContext(UserContext);
  const [displayModal, setDisplayModal] = useContext(ModalContext);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [displayInfo, setDisplayInfo] = useState(false);
  const comments = useRequest("get", "comments/pic/" + id);
  const cardRef = useRef();
  const cardOpacity = useIntersectionObs(cardRef);
  const windowWidth = useWindowSize();
  const [redirect, setRedirect] = useState(false);

  const deletePic = async (e) => {
    e.preventDefault();
    setDeleteLoading(true);
    try {
      if (galleryState) {
        const [gallery, setGallery] = galleryState;
        await Axios.delete(apiUrl + "pics/delete/" + id);
        const removeFromGallery = gallery.filter((pic) => pic.id !== id);
        setDeleteLoading(false);
        setGallery(removeFromGallery);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const dispModal = () => {
    if (windowWidth > 500) {
      setDisplayModal({
        ...displayModal,
        auth: !displayModal.auth,
        picId: id,
        scrollPos: window.scrollY,
      });
      stopBody();
    } else {
      setRedirect(true);
    }
  };

  return (
    <div
      className="gallery-container"
      ref={cardRef}
      style={{ opacity: `${cardOpacity}` }}
    >
      <div
        className="gallery-pics"
        style={{ backgroundImage: `url(${path})` }}
        onClick={dispModal}
        onMouseLeave={() => setDisplayInfo(false)}
        onMouseOver={() => setDisplayInfo(true)}
      >
        <div
          className={
            displayInfo ? "gallery-top-info gready" : "gallery-top-info"
          }
        >
          <p>{title}</p>
          <p>
            {comments &&
              `${comments.data.length} ${
                comments.data.length > 1 ? "commentaires" : "commentaire"
              }`}
          </p>
        </div>
      </div>
      {userStatus.id === userId && galleryState && (
        <button onClick={deletePic}>
          <MiniLoader sizeAll={20} loadingValue={deleteLoading}>
            <RiDeleteBin2Fill size={24} />
          </MiniLoader>
        </button>
      )}
      {redirect && <Redirect to={`/pics/${id}`} />}
    </div>
  );
};

export default Gallery;
