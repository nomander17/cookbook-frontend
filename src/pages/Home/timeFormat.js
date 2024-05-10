export const relativeTime = (postTime) => {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const postDate = new Date(postTime);
  if (isNaN(postDate)) {
    return "Invalid date";
  }
  const now = new Date();
  const secondsDiff = (now - postDate) / 1000;

  if (secondsDiff < 60) {
    return rtf.format(-Math.floor(secondsDiff), "second");
  }
  const minutesDiff = secondsDiff / 60;
  if (minutesDiff < 60) {
    return rtf.format(-Math.floor(minutesDiff), "minute");
  }
  const hoursDiff = minutesDiff / 60;
  if (hoursDiff < 24) {
    return rtf.format(-Math.floor(hoursDiff), "hour");
  }
  const daysDiff = hoursDiff / 24;
  if (daysDiff < 30) {
    return rtf.format(-Math.floor(daysDiff), "day");
  }
  const monthsDiff = daysDiff / 30;
  if (monthsDiff < 12) {
    return rtf.format(-Math.floor(monthsDiff), "month");
  }
  const yearsDiff = monthsDiff / 12;
  return rtf.format(-Math.floor(yearsDiff), "year");
};

export const absoluteTime = (postTime) => {
  return new Date(postTime).toLocaleString();
}