import { useState, useContext, useEffect } from "react";
import SearchCard from "./SearchCard";
import { UserContext } from "../GetLoggedStatus";
import Gallery from "../UserPics/Gallery";
import "./SearchUser.scss";
import useRequestWitChoices from "../../customHooks/useRequestWitChoices";

const Searchuser = () => {
  const [input, setInput] = useState({
    text: "",
    select: "Utilisateur",
  });
  const [userStatus] = useContext(UserContext);
  const [fetchCondition, setfetchCondition] = useState(true);
  const url = {
    a: "users/autocomp/" + input.text,
    b: `family/pics/search/?id=${userStatus.family_id}&lettres=${input.text}`,
  };
  const selectedData = useRequestWitChoices("get", url, fetchCondition);

  const inputsHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    input.select === "Utilisateur"
      ? setfetchCondition(true)
      : setfetchCondition(false);
  }, [input]);

  return (
    <div className="search-all">
        <div className="intro"></div>
      <div className="search-wrapper">
        <div className="search-h2">
          <h2>Recherche</h2>
        </div>
        <div className="select-inputs">
          <select name="select" value={input.select} onChange={inputsHandler}>
            <option value="Utilisateur">Utilisateur</option>
            {userStatus.family_id && <option value="Photos">Photos</option>}
          </select>
          <input
            name="text"
            type="text"
            placeholder={
              input.select === "Utilisateur"
                ? "Rechercher un utilisateur"
                : "Souvenirs de famille par titre ou #"
            }
            value={input.user}
            onChange={inputsHandler}
          />
        </div>
      </div>
      <div className="search-card-result">
        {input.select === "Utilisateur" &&
          selectedData.data.map((user) => {
            return <SearchCard {...user} key={user.id} />;
          })}
        {input.select === "Photos" &&
          selectedData.data.map((pic) => {
            return (
              <Gallery
                path={pic.path}
                id={pic.id}
                userId={pic.user_id}
                title={pic.title}
                key={pic.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Searchuser;
