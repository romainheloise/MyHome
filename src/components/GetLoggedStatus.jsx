import Axios from "axios";
import { apiUrl } from "../module/apiUrl";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext([]);
export const UserLoadingContext = createContext(false);
export const GetLogValue = createContext(true);
export const PictureFetchContext = createContext([]);

Axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const GetLoggedStatus = ({ children }) => {
  const [pictureTrigger, setPictureTrigger] = useState(false);
  const [userStatus, setUserStatus] = useState({});
  const [userLoading, setUserLoading] = useState(false);
  const [startFetch, setStartFetch] = useState(true);

  useEffect(() => {
    let isSubscribe = true;
    const fetchStatus = async () => {
      let loading = true;
      try {
        const userInfo = await Axios.get(apiUrl + "users/signin/");
        if (isSubscribe) {
          loading = false;
          setUserStatus(userInfo.data);
          setUserLoading(!loading);
        }
      } catch (err) {
        if (isSubscribe) {
          setUserLoading(false);
          setUserStatus({});
        }
      }
    };

    if (isSubscribe) {
      fetchStatus();
      setStartFetch(false);
    }
  }, [startFetch]);

  return (
    <UserContext.Provider value={[userStatus, setUserStatus]}>
      <UserLoadingContext.Provider value={userLoading}>
        <GetLogValue.Provider value={[startFetch, setStartFetch]}>
          <PictureFetchContext.Provider
            value={[pictureTrigger, setPictureTrigger]}
          >
            {children}
          </PictureFetchContext.Provider>
        </GetLogValue.Provider>
      </UserLoadingContext.Provider>
    </UserContext.Provider>
  );
};

export default GetLoggedStatus;
