//format date to readable format
export const formateDate = (date, withTime = false) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (withTime) {
    const formatedDate = new Date(date)
      .toLocaleString("en-US", options)
      .replace(",", "");
    const formatedTime = new Date(date).toLocaleTimeString("en-US");
    return formatedDate + " " + formatedTime;
  }
  return new Date(date).toLocaleString("en-US", options).replace(",", "");
};

//filter string up to 10 words
export const formatString = (text) => {
  if (text.length > 70) return text.split(" ").slice(0, 10).join(" ") + "...";
  return text;
};

// format dd/mm/yyyy to iso format
export const formatDatetoISO = (dateString) => {
  const [day, month, year] = dateString.split("/");
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toISOString();
};
