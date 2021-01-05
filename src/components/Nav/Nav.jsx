import { NavLink, Link } from "react-router-dom";
import "./Nav.scss";
import { UserContext } from "../GetLoggedStatus";
import { useContext, useRef, useState } from "react";
import SideMenu from "./SideMenu";
import { CSSTransition } from "react-transition-group";
import { RiHomeHeartFill } from "react-icons/ri";
import { BsPeopleFill } from "react-icons/bs";
import { GoSignIn } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import SignIn from "../Sign/SignIn";
import useResizePics from '../../customHooks/useResizePics'

const Nav = () => {
  const [userStatus, setUserStatus] = useContext(UserContext);
  const [displayUserMenu, setDisplayUserMenu] = useState(false);
  const [displaySignIn, setDisplaySignIn] = useState(false);
  const resizePic = useResizePics(userStatus.profile, "c_fill,h_100,q_60,w_100");
  const mainBtnRef = useRef();
  const signInBtnRef = useRef();
  const nodeRef = useRef(null);

  return (
    <nav>
      <ul>
        <div className="nav-title">
          <h1>My Family</h1>
        </div>

        <div className="nav-user">
          <div className="nav-user-center">
            {userStatus.id && (
              <li id="profile-menu-pic">
                <div
                  className="menu-profile-pic"
                  style={{
                    backgroundImage: `url('${resizePic}')`,
                  }}
                  onClick={() => {
                    setDisplayUserMenu(!displayUserMenu);
                  }}
                  ref={mainBtnRef}
                ></div>
                {userStatus.familyRequest &&
                  userStatus.familyRequest.length > 0 && (
                    <Link to={`/family/${userStatus.family_id}`}>
                      <p className="request-join">
                        {userStatus.familyRequest.length}
                      </p>
                    </Link>
                  )}
              </li>
            )}

            <CSSTransition
              in={displayUserMenu}
              timeout={200}
              unmountOnExit
              classNames="my-node"
              nodeRef={nodeRef}
            >
              <SideMenu
                userStat={[userStatus, setUserStatus]}
                isDisplayed={[displayUserMenu, setDisplayUserMenu]}
                mainBtn={mainBtnRef.current}
                transRef={nodeRef}
              />
            </CSSTransition>
          </div>
        </div>
        <div className="nav-menu">
          <NavLink to="/" activeClassName="selected" className="home-link-reg">
            <li>
              <RiHomeHeartFill className="nav-menu-icon" />
              <p>Home</p>
            </li>
          </NavLink>
          <NavLink
            to="/"
            activeClassName="selected"
            className="home-link-small"
          >
            <li>
              <RiHomeHeartFill className="nav-menu-icon" />
              <p>Home</p>
            </li>
          </NavLink>
          <NavLink to="/familysearch" activeClassName="selected">
            <li>
              <BsPeopleFill className="nav-menu-icon" />
              <p>Familles</p>
            </li>
          </NavLink>
          <NavLink to="/search" activeClassName="selected">
            <li>
              <FaSearch className="nav-menu-icon" />
              <p>Recherche</p>
            </li>
          </NavLink>
          {!userStatus.id && (
            <li
              className="li-id-btn"
              onClick={() => {
                setDisplaySignIn(!displaySignIn);
              }}
              ref={signInBtnRef}
            >
              <GoSignIn className="nav-menu-icon" />
              <p>S'identifier</p>
            </li>
          )}
          <CSSTransition
            in={displaySignIn}
            timeout={200}
            unmountOnExit
            classNames="my-node"
            nodeRef={nodeRef}
          >
            <SignIn
              signInBtnRef={signInBtnRef.current}
              signinPopDisplay={[displaySignIn, setDisplaySignIn]}
              transRef={nodeRef}
            />
          </CSSTransition>
          {!userStatus.id && (
            <li className="signup-reg">
              <NavLink to="/signup" activeClassName="selected">
                Inscription
              </NavLink>
            </li>
          )}
          {!userStatus.id && (
            <NavLink to="/signup" activeClassName="selected">
              <li className="signup-reg-small">
                <BsPencilSquare className="nav-menu-icon" />
                <p>Inscription</p>
              </li>
            </NavLink>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Nav;
