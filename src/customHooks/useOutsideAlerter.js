import { useState, useEffect } from "react";

const useOutsideAlerter = (refMain, optRef) => {
  const [outside, setOutside] = useState(false);
  useEffect(() => {
    function handleClickOutside(e) {     
      if (refMain && optRef) {
        if (!refMain.contains(e.target) && !optRef.contains(e.target)) {
          setOutside(true);
        }
      } else {
        if (refMain && !refMain.contains(e.target)) {
          setOutside(true);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refMain, optRef]);

  return outside;
};

export default useOutsideAlerter;
