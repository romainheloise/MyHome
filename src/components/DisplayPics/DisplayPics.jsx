import { useEffect, useContext, useRef, useState } from "react";
import "./DisplayPics.css";
import DisplayCard from "./DisplayCard";
import { PictureFetchContext, UserContext } from "../GetLoggedStatus";
import useRequest from "../../customHooks/useRequest";
import { launchMason } from "../../module/mason";

const DisplayPics = ({ urlChoices }) => {
  const [popInfo, setPopinfo] = useState(true);
  const [userStatus] = useContext(UserContext);
  const [pictureTrigger] = useContext(PictureFetchContext);
  const pics = useRequest("get", urlChoices, pictureTrigger);
  const bricksRef = useRef();

  useEffect(() => {
    if (bricksRef.current && bricksRef.current !== null) {
      if (pics.data.length > 0 && !pics.loading) {
        launchMason(bricksRef.current).runOnImageLoad(() => {
          launchMason(bricksRef.current).recalculate(true);
        }, true);
      }
    }
  }, [pics.data, pics.loading, bricksRef]);

  return (
    <div className="display-pics-main">
      <div className="intro">
        {!userStatus.id && popInfo && (
          <h2 onClick={() => setPopinfo(false)}>
            Crée ou cherche et rejoins ta famille pour partager vos souvenirs
          </h2>
        )}
      </div>
      <div className="display-pics-wrapper" ref={bricksRef}>
        {pics &&
          pics.data.map((pic) => {
            return <DisplayCard {...pic} key={pic.id} />;
          })}
      </div>
    </div>
  );
};

export default DisplayPics;
