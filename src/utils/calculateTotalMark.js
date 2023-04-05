const calculateTotalMark = (array, studentId) => {
  const result = array?.reduce((total, singleArrayObject) => {
    if (singleArrayObject.student_id === studentId) {
      return total + singleArrayObject.mark;
    }
    return total;
  }, 0);

  return result;
};

export default calculateTotalMark;
