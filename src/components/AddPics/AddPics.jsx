import Axios from "axios";
import { useContext, useState } from "react";
import { apiUrl } from "../../module/apiUrl";
import { UserContext, PictureFetchContext } from "../GetLoggedStatus";
import "./AddPics.scss";
import { IoIosSend } from "react-icons/io";
import CheckBox from "./CheckBox/CheckBox";
import MiniLoader from "../MiniLoader/MiniLoader";

const AddPics = () => {
  const [inputs, setInputs] = useState({
    title: "",
    desc: "",
    private: false,
  });
  const [selectedFile, setSelectedFile] = useState([]);
  const [error, setError] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const [userStatus] = useContext(UserContext);
  const [pictureTrigger, setPictureTrigger] = useContext(PictureFetchContext);

  const inputHandler = (e) => {
    setError("");
    if (e.target.id === "private") {
      setInputs({ ...inputs, [e.target.id]: !inputs[e.target.id] });
    } else {
      setInputs({ ...inputs, [e.target.id]: e.target.value });
    }
  };

  const sendFile = async (e) => {
    e.preventDefault();
    setPostLoading(true);
    let invalidInputs = false;
    for (const key in inputs) {
      if (!inputs[key] && key !== "private") {
        invalidInputs = true;
        setError(`Merci de remplir ce champ : ${key}`);
      }
    }
    if (invalidInputs) {
      return;
    }

    const formData = new FormData();
    formData.append("title", inputs.title);
    formData.append("desc", inputs.desc);
    formData.append(
      "creation",
      new Date().toISOString().slice(0, 19).replace("T", " ")
    );
    formData.append("private", inputs.private);
    formData.append("user_id", userStatus.id);
    Object.values(selectedFile).forEach((file) => {
      formData.append("image", file);
    });

    try {
      await Axios.post(apiUrl + "pics/pic", formData);
      setInputs({
        title: "",
        desc: "",
      });
      setPostLoading(false);
      setError("Photo postée");
      setPictureTrigger(!pictureTrigger);
    } catch (err) {
      err.response && setError(err.response.data);
    }
  };

  return (
    <div className="addpics-all">
      <form encType="multipart/form-data" method="post" onSubmit={sendFile}>
        <h2>Titre des photos</h2>
        <input
          id="title"
          type="text"
          value={inputs.title}
          onChange={inputHandler}
          placeholder="Insérer le titre des ou de la photo"
        />
        <h2>Description</h2>
        <textarea
          id="desc"
          type="text"
          value={inputs.desc}
          onChange={inputHandler}
        />
        <label htmlFor="add-photo">
          {selectedFile.length > 0
            ? `${selectedFile.length} ${
                selectedFile.length > 1
                  ? "fichiers selectionnés"
                  : "fichier selectionner "
              }`
            : "Sélectionner un ou plusieurs souvenirs"}
        </label>
        <input
          id="add-photo"
          type="file"
          onChange={(e) => {
            setSelectedFile(e.target.files);
          }}
          accept="image/jpg , image/jpeg , image/png"
          multiple
        />
        <div className="addpics-check">
          <h2>Privée </h2>
          <CheckBox
            privateHandler={inputHandler}
            inputsBox={[inputs, setInputs]}
          />
        </div>
        <button type="submit">
          {!postLoading && <p>Poster</p>}
          <MiniLoader sizeAll={20} loadingValue={postLoading}>
            <IoIosSend size={18} />
          </MiniLoader>
        </button>
        <p className="error">{error}</p>
      </form>
    </div>
  );
};

export default AddPics;
