export const convertMinutesToTime = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);

  const minutes = totalMinutes % 60;

  const period = hours >= 12 ? "PM" : "AM";

  const formattedHour = hours % 12 || 12;

  return `${formattedHour}:${minutes.toString().padStart(2, "0")} ${period}`;
};
