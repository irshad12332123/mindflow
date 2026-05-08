export const convertToISODateTime = (
  scheduleDate: string,
  time: string,
): Date => {
  const [timePart, modifier] = time.split(" ");

  let [hours, minutes] = timePart.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }

  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  const formattedHours = String(hours).padStart(2, "0");

  const formattedMinutes = String(minutes).padStart(2, "0");

  const isoString = `${scheduleDate}T${formattedHours}:${formattedMinutes}:00.000Z`;

  return new Date(isoString);
};
