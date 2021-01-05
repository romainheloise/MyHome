import Axios from "axios";
import { useState } from "react";
import { apiUrl } from "../../module/apiUrl";
import { Link } from "react-router-dom";

const FamilyCard = ({ id, name, userId }) => {
  const [error, setError] = useState("");

  const joinFamily = async () => {
    try {
      await Axios.post(apiUrl + "requetes/", {
        family_id: id,
        user_id: userId,
      });

      setError(`Vous avez envoyez une demande aux ${name}`);
    } catch (err) {
      err.response && setError(err.response.data);
    }
  };

  return (
    <div className="family-card">
      <Link to={`/family/${id}`}>
        <div className="family-name-circle">
          <h2>{name}</h2>
        </div>
      </Link>
      <input
        type="button"
        value={`Rejoindre les ${name}`}
        onClick={joinFamily}
      />

      <p>{error}</p>
    </div>
  );
};

export default FamilyCard;
