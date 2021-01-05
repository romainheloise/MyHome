import { useEffect, useState, useRef, useContext } from "react";
import SoloComm from "../Commentaries/SoloComm";
import Commentaries from "../Commentaries/Commentaries";
import "./DisplaySolo.scss";
import recoverBody from "../../module/recoverBody";
import dateFormatter from "../../module/dateFormatter";
import UserProfileIcone from "../UserProfileIcone/UserProfileIcone";
import { ModalContext } from "../Routes/RoutesApp";
import useOutsideAlerter from "../../customHooks/useOutsideAlerter";
import useRequest from "../../customHooks/useRequest";
import useWindowSize from "../../customHooks/useWindowSize";
import MiniLoader from "../MiniLoader/MiniLoader";

const DisplaySolo = () => {
  const [commentsState, setCommentsState] = useState([]);
  const [formatDate, setFromatDate] = useState("");
  const [divSize, setDivsize] = useState({
    photo: null,
  });
  const [commentsBoxSize, setCommentsBoxSize] = useState(0);
  const [displayModal, setDisplayModal] = useContext(ModalContext);
  const photos = useRequest("get", "pics/" + displayModal.picId);
  const userInfo = useRequest("get", "users/" + photos.data.user_id);
  const comments = useRequest("get", "comments/pic/" + displayModal.picId);
  const windowWidth = useWindowSize();
  const imageRef = useRef();
  const topcom = useRef();
  const modalBack = useRef();
  const outsideModal = useOutsideAlerter(modalBack.current);

  useEffect(() => {
    if (outsideModal || (windowWidth <= 500 && windowWidth !== 0)) {
      setDisplayModal({ ...displayModal, auth: false });
      recoverBody(displayModal.scrollPos);
    }
  }, [outsideModal, displayModal, setDisplayModal, windowWidth]);

  useEffect(() => {
    const commentsBox = divSize.photo - topcom.current.offsetHeight || 0;
    setCommentsBoxSize(commentsBox);
  });

  useEffect(() => {
    if (photos.data && photos.data.creation) {
      const actualCreation = dateFormatter(photos.data.creation);
      setFromatDate(actualCreation);
    }
  }, [photos.data]);

  useEffect(() => {
    setCommentsState(comments.data);
  }, [comments.data]);

  return (
    <div
      className="solo-container"
      ref={modalBack}
      onClick={() => {
        setDisplayModal({ ...displayModal, auth: !displayModal.auth });
        recoverBody(displayModal.scrollPos);
      }}
      style={{ top: window.scrollY + "px" }}
    >
      <div className="solo-photo-photo" onClick={(e) => e.stopPropagation()}>
        <MiniLoader sizeAll={20} loadingValue={photos.loading}>
          <img
            src={photos.data.path}
            alt={photos.data.title}
            ref={imageRef}
            onLoad={() => {
              setDivsize({ ...divSize, photo: imageRef.current.clientHeight });
            }}
          />
        </MiniLoader>
        <div className="solo-info-wrapper">
          <div className="solo-info-card-container">
            <div className="solo-info-card-main">
              <div className="solo-title" ref={topcom}>
                <h2>{photos.data.title}</h2>
                <h3>Poste le :</h3>
                <p>{formatDate}</p>
                <h3> Description : </h3>
                <p>{photos.data.desc}</p>
                <div className="solo-info-center">
                  <UserProfileIcone
                    path={userInfo.data.profile}
                    id={userInfo.data.id}
                    size={60}
                  />
                  <h3>{userInfo.data.username}</h3>
                  <Commentaries
                    picId={photos.data.id}
                    comState={[commentsState, setCommentsState]}
                  />
                </div>
              </div>
              <div
                className="solo-comms"
                style={{ height: commentsBoxSize + "px" }}
              >
                {commentsState &&
                  commentsState.map((com) => {
                    return (
                      <SoloComm
                        {...com}
                        delCom={[commentsState, setCommentsState]}
                        key={com.id}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplaySolo;
