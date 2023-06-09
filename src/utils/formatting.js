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

// format iso date to dd/mm/yyyy
export const formatIsoToDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

//find highest "id" value in an array
export const findSuitableId = (array = []) => {
  const highestId =
    array?.length > 0
      ? array.reduce((max, element) => Math.max(max, element?.id), 0)
      : 0;
  return highestId + 1;
};

//filtering video title to "Assignment [number] - title"
export const filterAssignmentTitle = (assignments, title) => {
  return `Assignment ${findSuitableId(assignments)} - ${title}`;
};

export const removeTitleFilter = (title = "") => {
  // returns an array
  return title.split("-");
};

// check if a video has already assigned with a task
export const hasAssignment = (videoId, assignments) => {
  const indexofAssignment = assignments.findIndex(
    (assignment) => Number(assignment.video_id) === Number(videoId)
  );
  return indexofAssignment === -1 ? false : true;
};

//first letter capital
export const firstLetterCapital = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
