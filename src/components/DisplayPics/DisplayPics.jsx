import { useEffect, useContext, useRef } from "react";
import "./DisplayPics.css";
import DisplayCard from "./DisplayCard";
import { PictureFetchContext } from "../GetLoggedStatus";
import useRequest from "../../customHooks/useRequest";
import { launchMason } from "../../module/mason";

const DisplayPics = ({ urlChoices }) => {
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
      <div className="intro"></div>
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
