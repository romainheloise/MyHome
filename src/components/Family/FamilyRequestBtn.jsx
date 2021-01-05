import Axios from "axios";
import { apiUrl } from "../../module/apiUrl";
import { useState } from "react";
import UserProfileIcone from "../UserProfileIcone/UserProfileIcone";
import useRequest from "../../customHooks/useRequest";
import { BiCheck } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";

const FamilyRequestBtn = ({ reqId, famId, demP, currentUser }) => {
  const [demandes, setDemandes] = demP;
  const [error, setError] = useState("");
  const [userStatus, setUserStatus] = currentUser;
  const userInfo = useRequest("get", "users/" + reqId);

  const respReq = async (e) => {
    e.preventDefault();
    if (e.target.parentNode.id === "Accepter" || e.target.id === "Accepter") {
      try {
        await Axios.put(apiUrl + "users/" + reqId, {
          family_id: famId,
        });
        await Axios.delete(apiUrl + "requetes?user_id=" + reqId);
      } catch (err) {
        err.response && setError(err.response.data);
      }
    } else {
      try {
        await Axios.delete(apiUrl + "requetes?user_id=" + reqId);
      } catch (err) {
        err.response && setError(err.response.data);
      }
    }
    const tempDem = demandes.filter((demande) => demande !== reqId);
    const remDem = userStatus.familyRequest.filter((r) => r !== reqId);
    setUserStatus({ ...userStatus, familyRequest: remDem });
    setDemandes(tempDem);
  };
  return (
    <div className="family-profile-req-btn">
      <UserProfileIcone id={userInfo.data.id} size={80} />
      <p>{userInfo.data.username}</p>
      <div className="family-profile-btn">
        <button id="Accepter" onClick={respReq}>
          <BiCheck id="Accepter" size={24} />
        </button>
        <button id="Refuser" onClick={respReq}>
          <IoCloseSharp id="Refuser" size={24} />
        </button>
      </div>
      <p>{error}</p>
    </div>
  );
};

export default FamilyRequestBtn;
