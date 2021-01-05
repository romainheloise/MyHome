const dateFormatter = (date) => {
  const jour = date.split("T")[0];
  const heure = date.split("T")[1].split(".")[0];
  let france = parseInt(heure.split(":")[0]) + 2;
  if (france >= 24) {
    france -= 24;
    if (france < 10) {
      france = "0" + france;
    }
  } else if (france < 0) {
    france += 24;
  }
  let resultHeure = heure.split(":");
  resultHeure[0] = france;
  const result =
    jour.split("-").reverse().join("-") + " " + resultHeure.join(":");
  return result;
};

export default dateFormatter;
