import Nav from "../Nav/Nav";
import UserPics from "../UserPics/UserPics";
import ParamsRoute from "./ParamsRoute";
import Searchuser from "../Search/Searchuser";
import DisplaySolo from "../DisplayPics/DisplaySolo";
import { Switch, Route, Redirect } from "react-router-dom";
import SignUp from "../Sign/SignUp";
import Family from "../Family/Family";
import FamilyProfile from "../Family/FamilyProfile";
import "./RouteApps.scss";
import { createContext, useState } from "react";
import GetLoggedStatus from "../GetLoggedStatus";
import DisplayMain from "../DisplayPics/DisplayMain";
import DisplayPicPhone from "../DisplayPics/DisplayPicPhone";

export const ModalContext = createContext([]);

const RoutesApp = () => {
  const [displayModal, setDisplayModal] = useState({
    picId: 0,
    auth: false,
  });

  return (
    <div className="routes-app">
      <GetLoggedStatus>
        <ModalContext.Provider value={[displayModal, setDisplayModal]}>
          <Nav />
          {displayModal.auth && <DisplaySolo />}
          <div className="route-content">
            <Switch>
              <Route exact path="/" component={DisplayMain} />
              <Route path="/signup" component={SignUp} />
              <Route path="/familysearch" component={Family} />
              <Route path="/family/:id" component={FamilyProfile} />
              <Route path="/search" component={Searchuser} />
              <ParamsRoute path="/users/:id" component={UserPics} />
              <ParamsRoute path="/pics/:id" component={DisplayPicPhone} />
              <Redirect to="/error" />
            </Switch>
          </div>
        </ModalContext.Provider>
      </GetLoggedStatus>
    </div>
  );
};

export default RoutesApp;
