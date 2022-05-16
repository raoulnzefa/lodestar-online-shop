export function getDateFromTimestamp(timestamp) {
  const time = new Date(timestamp);
  let day = String(time.getDate());
  let month = String(time.getMonth() + 1);
  let year = String(time.getFullYear());

  if (day.length < 2) {
    day = '0' + day;
  }

  if (month.length < 2) {
    month = '0' + month;
  }

  return `${day}.${month}.${year}`;
}