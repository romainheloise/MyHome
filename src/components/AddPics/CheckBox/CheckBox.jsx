import "./Checkbox.scss";

const CheckBox = ({ privateHandler, inputsBox }) => {
  const [inputs] = inputsBox;

  return (
    <div className="cb-all">
      <div className="cb-slide">
      <h2>{inputs.private && "oui"}</h2>
        <div
          className={`cb-rond ${
            inputs.private ? "private-true" : "private-false"
          }`}
          id="private"
          onClick={privateHandler}
        ></div>
        <h2>{!inputs.private && "non"}</h2>
      </div>
    </div>
  );
};

export default CheckBox;
