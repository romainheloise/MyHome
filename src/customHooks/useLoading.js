import { useEffect, useState } from "react";

const useLoading = (fetchObj) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let readyFetch = true;
    for (const key in fetchObj) {
      if (fetchObj[key]) readyFetch = false;
    }
    setReady(readyFetch);
  }, [fetchObj]);

  return ready;
};

export default useLoading;
