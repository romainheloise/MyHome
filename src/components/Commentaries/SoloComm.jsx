import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { apiUrl } from "../../module/apiUrl";
import "./SoloComm.scss";
import { UserContext } from "../GetLoggedStatus";
import UserProfileIcone from "../UserProfileIcone/UserProfileIcone";
import { CgCloseR } from "react-icons/cg";
import useRequest from "../../customHooks/useRequest";

const SoloComm = (props) => {
  const [deleteAutorise, setDeleteAuthorise] = useState(false);
  const [userStatus] = useContext(UserContext);
  const [comments, setComments] = props.delCom;
  const userInfo = useRequest("get", "users/" + props.user_id);

  const deleteCom = async (e) => {
    e.preventDefault();
    try {
      Axios.delete(apiUrl + "comments/" + props.id);
      const delComments = comments.filter((com) => com.id !== props.id);
      setComments(delComments);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userStatus.id && userStatus.id === props.user_id) {
      setDeleteAuthorise(true);
    }
  }, [userStatus, props.user_id]);

  return (
    <div className="solo-comm-container">
      <UserProfileIcone id={props.user_id} size={30} />
      <div className="solo-comm-info">
        <h3>{userInfo.data.username}</h3>
        <p>{props.contenu}</p>
      </div>
      {deleteAutorise && (
        <button type="button" onClick={deleteCom}>
          <CgCloseR size={18} />
        </button>
      )}
    </div>
  );
};

export default SoloComm;
