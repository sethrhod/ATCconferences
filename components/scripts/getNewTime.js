const getNewTime = (time) => {
  const getAmPm = (hours) => {
    if (hours > 12) {
      return "PM";
    } else {
      return "AM";
    }
  };

  const getNewHours = (hours) => {
    if (hours > 12) {
      return hours - 12;
    } else {
      return hours;
    }
  };

  const getNewMinutes = (minutes) => {
    if (minutes == 0) {
      return "00";
    } else {
      if (minutes < 10) {
        return "0" + minutes;
      }
      return minutes;
    }
  };

  const date_object = new Date(time);
  var hours = date_object.getHours();
  var minutes = date_object.getMinutes();
  var newTime =
    String(getNewHours(hours)) +
    ":" +
    String(getNewMinutes(minutes)) +
    " " +
    String(getAmPm(hours));
  
  return newTime;
}

export default getNewTime;