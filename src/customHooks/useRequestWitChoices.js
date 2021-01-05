import { useEffect, useState } from "react";
import Axios from "axios";
import { apiUrl } from "../module/apiUrl";

const useRequestWitChoices = (method, url, condition) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let unMount = false;
    let result = [];
    const fetchData = async () => {
      setLoading(true);
      try {
        if (condition) {
          result = await Axios[method](apiUrl + url.a);
        } else {
          result = await Axios[method](apiUrl + url.b);
        }
        if (!unMount) setData(result.data);
      } catch (err) {
        setError(err);
        setData([]);
      }
      setLoading(false);
    };
    fetchData();

    return () => {
      unMount = true;
    };
  }, [url.a, url.b, method, condition]);

  return { data, error, loading };
};

export default useRequestWitChoices;
