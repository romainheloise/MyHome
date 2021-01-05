import { useContext, useEffect, useState, useRef } from "react";
import Commentaries from "../Commentaries/Commentaries";
import { FaCommentDots } from "react-icons/fa";
import UserProfileIcone from "../UserProfileIcone/UserProfileIcone";
import { ModalContext } from "../Routes/RoutesApp";
import stopBody from "../../module/stopBody";
import useRequest from "../../customHooks/useRequest";
import useIntersectionObs from "../../customHooks/useIntersectionObs";
import useWindowSize from "../../customHooks/useWindowSize";
import useResizePics from "../../customHooks/useResizePics";
import useImageWaiting from "../../customHooks/useImageWaiting";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { Redirect } from "react-router-dom";

const DisplayCard = ({ path, title, id, user_id }) => {
  const [refreshCom, setRefreshCom] = useState(0);
  const [displayModal, setDisplayModal] = useContext(ModalContext);
  const [redirect, setRedirect] = useState(false);
  const userInfo = useRequest("get", "users/" + user_id);
  const coms = useRequest("get", "comments/pic/" + id);
  const cardRef = useRef();
  const imageRef = useRef();
  const windowWidth = useWindowSize();
  const resizePath = useResizePics(path, "w_0.10,c_scale");
  const cardOpacity = useIntersectionObs(cardRef, windowWidth);
  const imageIsLoaded = useImageWaiting(imageRef);

  const openModal = () => {
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

  useEffect(() => {
    setRefreshCom(coms.data.length);
  }, [coms.data]);

  return (
    <div
      className="display-pics-card"
      ref={cardRef}
      style={{ opacity: `${cardOpacity}` }}
    >
      <div className="display-pics-pop">
        <div className="display-pics-pop-inside">
          <UserProfileIcone id={userInfo.data.id} size={30} />
          <h2>{userInfo.data.username}</h2>
        </div>
      </div>
      <div className="display-pics-image">
        <img
          src={resizePath}
          alt={title}
          className={"display-pics-image"}
          onClick={openModal}
          ref={imageRef}
        />
        <div className={imageIsLoaded ? "waiting" : "image-loader"}>
          <Loader
            type="ThreeDots"
            color="#77aca2"
            height={50}
            width={50}
            timeout={0}
          />
        </div>
      </div>
      <div className="display-pics-pop">
        <div className="display-pics-pop-wrapper">
          <div className="display-pics-pop-info">
            <h3>{title}</h3>
            <div className="comments">
              <div className="comments-inside">
                <FaCommentDots size={20} />
                <h3>{refreshCom} </h3>
              </div>
              <Commentaries picId={id} refresh={[refreshCom, setRefreshCom]} />
            </div>
          </div>
        </div>
      </div>
      {redirect && <Redirect to={`/pics/${id}`} />}
    </div>
  );
};

export default DisplayCard;
