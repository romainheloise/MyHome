import { apiUrl } from "../../module/apiUrl";
import { UserContext } from "../GetLoggedStatus";
import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import validator from "../../module/validator";
import FamilyCard from "./FamilyCard";
import "./Family.scss";
import { FaThumbsUp } from "react-icons/fa";

const Family = () => {
  const [userStatus, setUserStatus] = useContext(UserContext);
  const [inputs, setInputs] = useState({
    name: "",
    searchbar: "",
  });
  const [error, setError] = useState("");
  const [familyList, setFamilyList] = useState([]);
  const [creationDone, setCreationDone] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const inputsHandler = (e) => {
    setError("");
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const createFamily = async (e) => {
    e.preventDefault();
    if (validator.isMinSize(inputs.name, 3)) {
      try {
        const result = await Axios.post(apiUrl + "family/", {
          name: inputs.name,
          creator: userInfo.id,
        });
        setError(`la Famille ${result.data.name} existe à present ! `);
        setUserStatus({ ...userStatus, family_id: result.data.id });
        setCreationDone(true);
      } catch (err) {
        setError(err.response.data);
      }
    } else {
      setError("Pas assez de caracteres");
    }
  };

  const searchFamily = async (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    try {
      const autoC = await Axios.get(apiUrl + "family/search/" + e.target.value);
      setFamilyList(autoC.data);
    } catch (err) {
      setFamilyList([]);
    }
  };

  useEffect(() => {
    setUserInfo({ ...userStatus });
  }, [userStatus]);

  return (
    <div className="family-all">
      <div className="intro"></div>
      <div className="family-container-main">
        {userInfo.family_id === null && (
          <div className="family-bloc">
            <h2 className="create">Creer votre famille</h2>
            <div className="family-create">
              <h3>Entrez le nom de votre famille</h3>
              <input
                type="text"
                name="name"
                placeholder="Minimum 3 Caracteres"
                value={inputs.name}
                onChange={inputsHandler}
              />
              <button onClick={createFamily}>Creer</button>
            </div>
            <p>{error}</p>
          </div>
        )}
        {creationDone && (
          <div className="creation-done">
            <FaThumbsUp size="60" />
          </div>
        )}
        <div className="family-bloc">
          <h2 className="search">Recherchez une famille et rejoignez la</h2>
          <div className="family-search">
            <input
              type="text"
              name="searchbar"
              value={inputs.searchbar}
              placeholder="Entrez un nom de famille"
              onChange={searchFamily}
            />
          </div>
        </div>
        <div className="family-search-result">
          {familyList.map((family) => {
            return (
              <FamilyCard {...family} key={family.id} userId={userStatus.id} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Family;
