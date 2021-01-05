import Axios from "axios";
import { apiUrl } from "../../module/apiUrl";
import { useState } from "react";
import validator from "../../module/validator";
import "./GetPassword.scss";

const GetPassword = ({ setDisplaySignIn }) => {
  const [inputs, setInputs] = useState({
    checklogin: "",
    checkpassword: "",
  });
  const [error, setError] = useState("");
  const [newPwd, setNewPwd] = useState(false);
  const [userId, setUserId] = useState({});

  const inputsHandler = (e) => {
    setInputs({ ...inputs, [e.target.id]: e.target.value });
    setError("");
  };

  const sendLog = async (e) => {
    e.preventDefault();
    if (validator.emailIsValid(inputs.checklogin)) {
      try {
        const result = await Axios.post(apiUrl + "users/changepwd/", {
          login: inputs.checklogin,
        });
        setNewPwd(true);
        setUserId(result.data);
      } catch (err) {
        setNewPwd(false);
        setError(err.response.data);
      }
    } else {
      setError("Merci d'entrer un email valide");
    }
  };

  const sendNewPassword = async (e) => {
    e.preventDefault();
    if (validator.isMinSize(inputs.checkpassword, 8)) {
      try {
        const result = await Axios.put(
          apiUrl + "users/changepwd/" + userId.id,
          {
            id: userId.id,
            password: inputs.checkpassword,
          }
        );

        setError(result.data);
        setDisplaySignIn(false);
      } catch (err) {
        err.response && setError(err.response.data);
      }
    } else {
      setError("Merci d'entrer un mot de passe  valide");
    }
  };

  return (
    <div className="getpassword-all">
      <h3>Reinitialiser votre mot de pass</h3>
      <div className="getpassword-container">
        <div className="getpassword-checkemail">
          <h3>Email</h3>
          <input
            id="checklogin"
            type="text"
            placeholder="Entrez votre adresse mail"
            value={inputs.checklogin}
            onChange={inputsHandler}
          />
          <button onClick={sendLog}>Envoyer</button>
        </div>
        {newPwd && (
          <div>
            <div className="getpassword-checkemail">
              <h3>Passe</h3>
              <input
                id="checkpassword"
                type="password"
                value={inputs.checkpassword}
                placeholder="Nouveau mot de passe"
                onChange={inputsHandler}
              />

              <button onClick={sendNewPassword}>Envoyer</button>
            </div>
          </div>
        )}
        <p>{error}</p>
      </div>
    </div>
  );
};

export default GetPassword;
