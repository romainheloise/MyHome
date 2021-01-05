import { useEffect, useState } from "react";

const useResizePics = (path, typeOfResize) => {
  const [resizePath, setResizePath] = useState("");

  useEffect(() => {
    if (path) {
      const splitPath = path.split("/");
      splitPath.splice(6, 0, typeOfResize);
      setResizePath(splitPath.join("/"));
    }
  }, [path, typeOfResize]);

  return resizePath;
};

export default useResizePics;
