import Axios from "axios";
import { useContext, useState } from "react";
import { apiUrl } from "../../module/apiUrl";
import { UserContext } from "../GetLoggedStatus";
import { IoIosSend } from "react-icons/io";

const Commentaries = ({ picId, refresh, comState }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [userStatus] = useContext(UserContext);

  const sendComment = async (e) => {
    e.preventDefault();
    const newCom = {
      userId: userStatus.id,
      picturesId: picId,
      contenu: input,
    };

    setInput("");
    try {
      const result = await Axios.post(apiUrl + "comments/", newCom);
      setError("Message envoye");
      if (comState) {
        const [comments, setComments] = comState;
        const tempComments = [...comments];
        tempComments.unshift(result.data);
        setComments(tempComments);
      }
      if (refresh) {
        const [refreshCom, setRefreshCom] = refresh;
        setRefreshCom(refreshCom + 1);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        if (
          err.response.data.split(" ").includes("'user_id'") ||
          err.response.data === "Unauthorized"
        ) {
          setError("Merci de vous identifier");
        }
      }
    }
  };

  return (
    <div className="comments-box">
      <div className="comments-input">
        <input
          className="comments-put"
          type="text"
          value={input}
          placeholder={error ? error : "Ecrire un commentaire"}
          onChange={(e) => {
            setError("");
            setInput(e.target.value);
          }}
        />
        <button onClick={sendComment} className="add-com">
          <IoIosSend size={18} />
        </button>
      </div>
    </div>
  );
};

export default Commentaries;
