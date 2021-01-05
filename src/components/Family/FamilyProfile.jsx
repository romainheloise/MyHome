import Axios from "axios";
import { apiUrl } from "../../module/apiUrl";
import { useContext, useEffect, useState, useRef } from "react";
import FamilyRequestBtn from "./FamilyRequestBtn";
import { UserContext } from "../GetLoggedStatus";
import UserProfileIcone from "../UserProfileIcone/UserProfileIcone";
import useRequest from "../../customHooks/useRequest";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../../module/carRespo";
import { Redirect } from "react-router-dom";

const FamilyProfile = ({ match }) => {
  const [demandes, setDemandes] = useState([]);
  const [userStatus, setUserStatus] = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const mountedRef = useRef(true);
  const family = useRequest("get", "family/" + match.params.id, demandes);
  const isMember = useRequest(
    "get",
    "family/ismember/?user=" + userStatus.id + "&family=" + match.params.id
  );

  const leaveFamily = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(apiUrl + "users/" + userStatus.id, {
        family_id: null,
      });
      setUserStatus({ ...userStatus, family_id: null });
      setRedirect(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isMember.data) {
      const fetchUser = async () => {
        try {
          const result = await Axios.get(apiUrl + "users/" + userStatus.id);
          if (mountedRef.current) {
            setDemandes(result.data.familyRequest);
          }
          return result.data.family_id;
        } catch (err) {
          setDemandes([]);
          return 0;
        }
      };
      fetchUser();
    }
  }, [isMember.data, userStatus.id]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <div className="family-profile-all">
      <div className="intro"></div>
      <div className="family-profile-container">
        <div className="family-profile-top-title">
          <h2>{family.data.name}</h2>
          {isMember.data && (
            <button onClick={leaveFamily}>Quitter ma famille</button>
          )}
        </div>
        <h3>Membres de la famille</h3>
        <div className="family-profile-members">
          {family.data.familyMembers && (
            <Carousel
              responsive={responsive}
              swipeable={true}
              draggable={true}
              showDots={false}
              centerMode={false}
              containerClass="carousel-container"
              itemClass="carousel-item"
            >
              {family.data.familyMembers.map((member) => {
                return (
                  <div className="family-profile-solo" key={member.id}>
                    <UserProfileIcone id={member.id} size={50} />
                    <p>{member.username}</p>
                  </div>
                );
              })}
            </Carousel>
          )}
        </div>
        <div className="family-profile-request">
          {isMember.data && <h3>Personnes voulant rejoindre votre famille</h3>}
          <div className="family-profile-request-card">
            {demandes &&
              demandes.map((user) => {
                return (
                  <FamilyRequestBtn
                    reqId={user}
                    famId={family.data.id}
                    demP={[demandes, setDemandes]}
                    currentUser={[userStatus, setUserStatus]}
                    key={user}
                  />
                );
              })}
          </div>
        </div>
      </div>
      {redirect && <Redirect to="/familysearch" />}
    </div>
  );
};

export default FamilyProfile;
