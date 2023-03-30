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

export const formatString = (text) => {
  if (text.length > 70) return text.split(" ").slice(0, 10).join(" ") + "...";
  return text;
};
