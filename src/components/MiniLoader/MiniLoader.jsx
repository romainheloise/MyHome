import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const MiniLoader = ({ children, sizeAll, loadingValue }) => {
  return (
    <div>
      {loadingValue ? (
        <Loader
          type="ThreeDots"
          color="#77aca2"
          height={sizeAll}
          width={sizeAll}
          timeout={0}
        />
      ) : (
        children
      )}
    </div>
  );
};

export default MiniLoader;
