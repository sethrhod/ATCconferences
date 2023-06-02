export default function format_time(time) {

    const format_minutes = (date) => {
        var min = date.getMinutes();
        const minutes = min < 10 ? '0' + min : min;
        return minutes;
    }

    const format_hours = (date) => {
        var hr = date.getHours();
        const hour = hr > 12 ? hr - 12 : hr;
        const ampm = hr < 12 ? 'AM' : 'PM';
        return [hour, ampm]
      }

    const date = new Date(time);
    const formatted_hours = format_hours(date);
    const hours = formatted_hours[0];
    const minutes = format_minutes(date);
    const ampm = formatted_hours[1];
    const formatted_time =
        hours + ':' + minutes + ' ' + ampm;
    return formatted_time;
  }