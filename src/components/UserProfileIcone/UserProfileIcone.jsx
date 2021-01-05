import { useContext } from "react";
import { Link } from "react-router-dom";
import "./UserProfileIcone.scss";
import { ModalContext } from "../Routes/RoutesApp";
import recoverBody from "../../module/recoverBody";
import useRequest from "../../customHooks/useRequest";

const UserProfileIcone = ({ id, size }) => {
  const [displayModal, setDisplayModal] = useContext(ModalContext);
  const userInfo = useRequest("get", "users/" + id);
  return (
    <Link to={"/users/" + id} draggable="false">
      <div
        className="userprofile-icone"
        style={{
          backgroundImage: `url(${userInfo.data.profile})`,
          width: size + "px",
          height: size + "px",
        }}
        onClick={() => {
          setDisplayModal({ ...displayModal, auth: false });
          recoverBody(displayModal.scrollPos);
        }}
        draggable="false"
      ></div>
    </Link>
  );
};

export default UserProfileIcone;
