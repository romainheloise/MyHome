import Macy from "macy";

export const launchMason = (ref) => {
  const macyInstance = Macy({
    container: ref,
    trueOrder: false,
    waitForImages: false,
    margin: 8,
    columns: 6,
    breakAt: {
      1400: 5,
      1200: 4,
      940: 3,
      700: 2,
      500: 1,
    },
  });
  return macyInstance;
};
