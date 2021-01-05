import { useState } from "react";
import Axios from "axios";
import validator from "../../module/validator";
import { apiUrl } from "../../module/apiUrl";
import { Redirect } from "react-router-dom";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { BsChevronRight } from "react-icons/bs";
import MiniLoader from "../MiniLoader/MiniLoader";
import "./SignUp.scss";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    username: "",
    login: "",
    password: "",
    passwordC: "",
  });
  const [error, setError] = useState({});
  const [postLoading, setPostLoading] = useState(false);
  const [visiblePass, setvisiblePass] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const inputsHandler = (e) => {
    setError({});
    setInputs({ ...inputs, [e.target.id]: e.target.value });
  };

  const passTest = (e) => {
    e.preventDefault();
    let errorTemp = {};
    for (const key in inputs) {
      if (key === "username") {
        if (!validator.isMinSize(inputs[key], 2)) {
          errorTemp = {
            ...errorTemp,
            [key]: "Please enter minimum 2 characters",
          };
        }
      }
      if (key === "login") {
        if (!validator.emailIsValid(inputs[key])) {
          errorTemp = {
            ...errorTemp,
            [key]: "Merci d'entrer un e mail valide ",
          };
        }
      }
      if (key === "password") {
        if (!validator.isMinSize(inputs[key], 8)) {
          errorTemp = {
            ...errorTemp,
            [key]: "Please enter minimum 8 characters",
          };
        } else if (!validator.isSame(inputs[key], inputs.passwordC)) {
          errorTemp = {
            ...errorTemp,
            [key]: "Vos mots de passes sont differents",
          };
        }
      }
    }

    if (!profilePic)
      errorTemp = {
        ...errorTemp,
        profile: "Please add a picture",
      };

    if (Object.keys(errorTemp).length === 0) {
      sendUser();
    } else {
      setError(errorTemp);
    }
  };

  const sendUser = async () => {
    setPostLoading(true);
    let date = new Date();
    date = date.toISOString().slice(0, 19).replace("T", " ");

    const formData = new FormData();
    formData.append("username", inputs.username);
    formData.append("login", inputs.login);
    formData.append("password", inputs.password);
    formData.append("date_creation", date);
    formData.append("image", profilePic);

    try {
      await Axios.post(apiUrl + "users/prof/", formData);
      setLoggedIn(true);
      setPostLoading(false);
    } catch (err) {
      setError({ ...error, sign: 'Oops petit probleme' });
    }
  };

  return (
    <div className="signup-all">
      <div className="signup-wrapp">
        <h2>S'enregistrer</h2>
        <form encType="multipart/form-data" method="post" onSubmit={passTest}>
          <div className="signup-inputs">
            <h3>Prénom</h3>
            <input
              id="username"
              type="text"
              value={inputs.username}
              placeholder="min 2 caractéres"
              onChange={inputsHandler}
            />
          </div>
          <p>{error.username}</p>

          <div className="signup-inputs">
            <h3>E mail</h3>
            <input
              id="login"
              type="text"
              value={inputs.login}
              placeholder="e mail valide"
              onChange={inputsHandler}
            />
          </div>
          <p>{error.login}</p>

          <div className="signup-inputs">
            <h3>Mot de passe</h3>
            <input
              id="password"
              type={!visiblePass ? "password" : "text"}
              value={inputs.password}
              placeholder="min 8 caractéres"
              onChange={inputsHandler}
            />
            <button
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

          <div className="signup-inputs">
            <h3>Confirmer le mot de passe</h3>
            <input
              id="passwordC"
              type={!visiblePass ? "password" : "text"}
              value={inputs.passwordC}
              placeholder="min 8 caractéres"
              onChange={inputsHandler}
            />
          </div>
          <p>{error.password}</p>
          <label htmlFor="add-profile-pic">
            {profilePic && typeof profilePic !== "string"
              ? "Photo ajoutée"
              : "Sélectionner une photo"}
          </label>
          <input
            id="add-profile-pic"
            type="file"
            accept="image/jpeg , image/png"
            onChange={(e) => {
              setProfilePic(e.target.files[0]);
            }}
          />
          <p>{error.profile}</p>

          <button type="submit">
            <MiniLoader sizeAll={20} loadingValue={postLoading}>
              <BsChevronRight size={18} />
            </MiniLoader>
          </button>
          <p>{error.sign}</p>
          {loggedIn && <Redirect to="/" />}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
