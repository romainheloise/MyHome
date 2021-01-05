import { Link } from "react-router-dom";
import AddPics from "../AddPics/AddPics";
import useOutsideAlerter from "../../customHooks/useOutsideAlerter";
import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { GetLogValue } from "../GetLoggedStatus";

const SideMenu = ({ userStat, isDisplayed, mainBtn, transRef }) => {
  const [startFetch, setStartFetch] = useContext(GetLogValue);
  const [userStatus, setUserStatus] = userStat;
  const [displayUserMenu, setDisplayUserMenu] = isDisplayed;
  const [redirect, setRedirect] = useState(false);
  const outside = useOutsideAlerter(transRef.current, mainBtn);

  const logOut = () => {
    sessionStorage.clear();
    setUserStatus({});
    setRedirect(true);
    setDisplayUserMenu(false);
    setStartFetch(!startFetch);
  };

  useEffect(() => {
    if (outside) {
      setDisplayUserMenu(false);
    }
  }, [outside, displayUserMenu, setDisplayUserMenu]);

  return (
    <div className="side-m" ref={transRef}>
      <div className="arrow-up"></div>
      <div className="side-menu">
        <h2 className="side-menu-title">Ajouter une photo</h2>
        <ul>
          <AddPics />
          <Link to={`/users/${userStatus.id}`}>
            <li
              onClick={() => {
                setDisplayUserMenu(false);
              }}
            >
              Mon profile
            </li>
          </Link>
          {userStatus.family_id && (
            <Link to={`/family/${userStatus.family_id}`}>
              <li
                onClick={() => {
                  setDisplayUserMenu(false);
                }}
              >
                Ma famille
              </li>
            </Link>
          )}
          <li id="logOut" onClick={logOut}>
            Se déconnecter
          </li>
        </ul>
      </div>
      <div className="arrow-down"></div>
      {redirect && <Redirect to="/" exact />}
    </div>
  );
};

export default SideMenu;
