import useRequest from "../../customHooks/useRequest";
import "./DisplayPicPhone.scss";
import UserProfileIcone from "../UserProfileIcone/UserProfileIcone";
import SoloComm from "../Commentaries/SoloComm";
import Commentaries from "../Commentaries/Commentaries";
import { useState, useEffect } from "react";
import useWindowSize from "../../customHooks/useWindowSize";
import { Redirect } from "react-router-dom";

const DisplayPicPhone = ({ match }) => {
  const [commentsState, setCommentsState] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const comments = useRequest("get", "comments/pic/" + match.params.id);
  const pic = useRequest("get", "pics/" + match.params.id);
  const userInfo = useRequest("get", "users/" + pic.data.user_id);
  const windowWidth = useWindowSize();

  useEffect(() => {
    if (windowWidth > 500) {
      setRedirect(true);
    }
  }, [windowWidth]);

  useEffect(() => {
    setCommentsState(comments.data);
  }, [comments.data]);

  return (
    <div className="picphone-all">
      <img src={pic.data.path} alt={pic.data.title} />
      <div className="picphone-info-all">
        <div className="picphone-info-container">
          <div className="picphone-info-profile">
            <UserProfileIcone
              path={userInfo.data.profile}
              id={userInfo.data.id}
              size={60}
            />
            <h3>{userInfo.data.username}</h3>
          </div>
          <div className="picphone-info-picdata">
            <h2>{pic.data.title}</h2>
            <h3>Poste le :</h3>
            <p></p>
            <h3> Description : </h3>
            <p>{pic.data.desc}</p>
          </div>
        </div>
        <Commentaries
          picId={pic.data.id}
          comState={[commentsState, setCommentsState]}
        />
        <div className="picphone-comments">
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
      <div className="bottom"></div>
      {redirect && <Redirect to="/" />}
    </div>
  );
};

export default DisplayPicPhone;
