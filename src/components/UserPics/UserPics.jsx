import { Link } from "react-router-dom";
import dateFormatter from "../../module/dateFormatter";
import Gallery from "./Gallery";
import "./UserPics.scss";
import UserProfileIcone from "../UserProfileIcone/UserProfileIcone";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../../module/carRespo";
import useRequest from "../../customHooks/useRequest";
import { useEffect, useState } from "react";

const UserPics = ({ match }) => {
  const [gallery, setGallery] = useState([]);
  const userInfo = useRequest("get", "users/" + match.params.id);
  const family = useRequest("get", "family/" + userInfo.data.family_id);
  const galleryReq = useRequest("get", "pics/?user_id=" + match.params.id);

  useEffect(() => {
    setGallery(galleryReq.data);
  }, [galleryReq.data]);

  return (
    <div className="userpics-container">
      <div className="intro"></div>
      <div className="userpics-wrapper">
        <div className="userpics-card-all">
          <div className="userpics-info">
            <div
              className="userpics-profile"
              style={{
                backgroundImage: `url(${userInfo.data.profile} )`,
              }}
            ></div>
            <div className="userpics-info-text">
              <div className="userpics-info-top">
                <h2>{userInfo.data.username}</h2>
              </div>
              {userInfo.data.family_id && (
                <Link to={`/family/${userInfo.data.family_id}`}>
                  <h3>Famille : {family.data.name}</h3>
                </Link>
              )}
              <h4>
                Inscrit depuis le :
                {userInfo.data.date_creation &&
                  dateFormatter(userInfo.data.date_creation)}
              </h4>
            </div>
          </div>

          {family.data.familyMembers && (
            <div className="userpics-family-title">
              <h2>Ma famille</h2>
              <div className="userpics-fam-members">
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
                      <UserProfileIcone
                        id={member.id}
                        size={50}
                        key={member.id}
                      />
                    );
                  })}
                </Carousel>
              </div>
            </div>
          )}

          <div className="userpics-gallery-wrapper">
            <h3>Mes souvenirs</h3>
            <div className="userpics-gallery">
              {gallery.map((pic) => {
                return (
                  <Gallery
                    {...pic}
                    userId={userInfo.data.id}
                    galleryState={[gallery, setGallery]}
                    key={pic.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPics;
