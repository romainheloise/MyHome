import { useEffect, useState } from "react";
import Axios from "axios";
import { apiUrl } from "../module/apiUrl";

const useRequest = (method, url, option) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isSubscribe = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await Axios[method](apiUrl + url);
        if (isSubscribe) {
          setData(result.data);
        }
      } catch (err) {
        if (isSubscribe) {
          setError(err);
          setData([]);
        }
      }
      setLoading(false);
    };

    if (isSubscribe) {
      fetchData();
    }

    return () => {
      isSubscribe = false;
    };
  }, [url, method, option]);

  return { data, error, loading };
};

export default useRequest;
