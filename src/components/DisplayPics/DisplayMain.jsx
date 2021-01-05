import { useEffect, useState, useContext } from "react";
import DisplayPics from "../DisplayPics/DisplayPics";
import {
  UserContext,
  UserLoadingContext,
  GetLogValue,
} from "../GetLoggedStatus";
import useRequest from "../../customHooks/useRequest";

const urlChoices = {
  a: "family/pics/",
  b: "pics?pictures.private=0",
};

const DisplayMain = () => {
  const [userStatus] = useContext(UserContext);
  const [startFetch, setStartFetch] = useContext(GetLogValue);
  const userLoadingValue = useContext(UserLoadingContext);
  const userFamily = useRequest("get", "users/" + userStatus.id);
  const [fetchUrl, setFetchUrl] = useState(urlChoices.b);

  useEffect(() => {
    setStartFetch(true);
    if (userLoadingValue) {
      if (userStatus.family_id) {
        setFetchUrl(urlChoices.a + userFamily.data.family_id);
      }
    } else {
      setFetchUrl(urlChoices.b);
    }
  }, [
    userLoadingValue,
    userStatus.family_id,
    userFamily.data.family_id,
    startFetch,
    setStartFetch,
  ]);

  return <DisplayPics urlChoices={fetchUrl} />;
};

export default DisplayMain;
