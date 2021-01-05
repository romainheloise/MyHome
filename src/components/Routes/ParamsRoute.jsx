import Axios from "axios";
import { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { apiUrl } from "../../module/apiUrl";

const ParamsRoute = ({ component: Component, ...rest }) => {
  const direction = rest.path.split("/")[1];
  const wayId = rest.computedMatch.params.id;
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const isExisting = async () => {
      const result = await Axios.get(apiUrl + direction + "/" + wayId);
      if (result.data.length === 0) {
        setRedirect(true);
      }
    };
    isExisting();
  }, [direction, wayId]);

  return (
    <Route
      {...rest}
      render={(props) =>
        redirect ? <Redirect to="/404" /> : <Component {...props} />
      }
    />
  );
};

export default ParamsRoute;
