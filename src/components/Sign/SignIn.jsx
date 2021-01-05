import { useState, useContext, useRef, useEffect } from "react";
import { Redirect } from "react-router-dom";
import validator from "../../module/validator";
import { apiUrl } from "../../module/apiUrl";
import Axios from "axios";
import { UserContext, GetLogValue } from "../GetLoggedStatus";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { BsChevronRight } from "react-icons/bs";
import MiniLoader from "../MiniLoader/MiniLoader";

import "./SignIn.scss";
import useOutsideAlerter from "../../customHooks/useOutsideAlerter";
import GetPassword from "./GetPassword";

const SignIn = ({ signInBtnRef, signinPopDisplay, transRef }) => {
  const [error, setError] = useState({});
  const [visiblePass, setvisiblePass] = useState(false);
  const [inputs, setInputs] = useState({
    login: "",
    password: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const setDisplaySignIn = signinPopDisplay[1];
  const [retrievePass, setRetrievePass] = useState(false);
  const [loadingSign, setLoadingSign] = useState(false);
  const [topPosition, setTopPosition] = useState(100);
  const setUserStatus = useContext(UserContext)[1];
  const setStartFetch = useContext(GetLogValue)[1];
  const signInRef = useRef();
  const outside = useOutsideAlerter(signInRef.current, signInBtnRef);

  useEffect(() => {
    if (outside) {
      setDisplaySignIn(false);
    }
  }, [outside, setDisplaySignIn]);

  useEffect(() => {
    if (window.innerWidth < 500) {
      if (retrievePass) {
        setTopPosition(-420);
      } else {
        setTopPosition(-250);
      }
    }
  }, [retrievePass]);

  const inputsHandler = (e) => {
    setError({});
    setInputs({ ...inputs, [e.target.id]: e.target.value });
  };

  const validation = (e) => {
    e.preventDefault();
    let errorTemp = {};
    for (const key in inputs) {
      if (key === "login") {
        if (!validator.emailIsValid(inputs[key])) {
          errorTemp = {
            ...errorTemp,
            [key]: "E mail valide",
          };
        }
      }
      if (key === "password") {
        if (!validator.isMinSize(inputs[key], 8)) {
          errorTemp = {
            ...errorTemp,
            [key]: "Minimum 8 caracteres",
          };
        }
      }
    }
    if (Object.keys(errorTemp).length === 0) {
      signIn();
    } else {
      setError(errorTemp);
    }
  };

  const signIn = async () => {
    setLoadingSign(true);
    try {
      const receivedData = await Axios.post(apiUrl + "users/signin/", inputs);
      sessionStorage.setItem("accessToken", receivedData.data.accessToken);
      setUserStatus({ ...receivedData.data.user });
      setStartFetch(true);
      setLoggedIn(true);
      setDisplaySignIn(false);
      setLoadingSign(false);
    } catch (err) {
      if (err.response) {
        setError({ ...error, sign: err.response.data });
      }
    }
  };

  return (
    <div
      className="signin-all"
      ref={transRef}
      style={{ top: topPosition + "px" }}
    >
      <div className="signin-wrapp" ref={signInRef}>
        <h2>S'identifier</h2>
        <form onSubmit={validation}>
          <div className="signin-inputs-error">
            <div className="signin-inputs">
              <h3>E mail</h3>
              <input
                id="login"
                type="text"
                value={inputs.login}
                onChange={inputsHandler}
              />
            </div>
            <p>{error.login}</p>
          </div>
          <div className="signin-inputs-error">
            <div className="signin-inputs">
              <h3>Mot de passe</h3>
              <input
                id="password"
                type={visiblePass ? "text" : "password"}
                value={inputs.password}
                onChange={inputsHandler}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setvisiblePass(!visiblePass);
                }}
              >
                {visiblePass ? (
                  <AiFillEyeInvisible size={18} />
                ) : (
                  <AiFillEye size={18} />
                )}
              </button>
            </div>
            <p>{error.password}</p>
            <p>{error.sign}</p>
          </div>
          <button type="submit">
            <MiniLoader sizeAll={20} loadingValue={loadingSign}>
              <BsChevronRight size={18} />
            </MiniLoader>
          </button>
          <p
            onClick={() => setRetrievePass(!retrievePass)}
            style={{ cursor: "pointer" }}
          >
            Mot de passe oublié ?
          </p>
          {loggedIn && <Redirect to="/" />}
        </form>
        {retrievePass && <GetPassword setDisplaySignIn={setDisplaySignIn} />}
      </div>
    </div>
  );
};

export default SignIn;
