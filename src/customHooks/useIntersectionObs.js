import { useEffect, useState } from "react";

const useIntersectionObs = (refCard, windowWitdh) => {
  const [cardOpacity, setCardOpacity] = useState(1);

  useEffect(() => {
    if (refCard.current && windowWitdh > 500) {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: buildThresholdList(10),
      };

      let observer = new IntersectionObserver((entries) => {
        const iRatio = entries[0].intersectionRatio;
        setCardOpacity(iRatio);
      }, options);
      observer.observe(refCard.current);
    }
  }, [refCard,windowWitdh]);
  return cardOpacity;
};

export default useIntersectionObs;

const buildThresholdList = (numSteps) => {
  let thresholds = [];

  for (let i = 1.0; i <= numSteps; i++) {
    let ratio = i / numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
};
