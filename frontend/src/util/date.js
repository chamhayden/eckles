export const isHappeningNow = (event) => {
  const now = new Date("2025-02-18 20:00");

  // const now = new Date(
  //   new Date().toLocaleString("en-US", { timeZone: "Australia/Sydney" })
  // );

  const currentDay = now.toLocaleString("en-US", { weekday: "long" });
  if (event.day !== currentDay) return false;

  // Handle different time field names
  const timeStr = event.time || event.times; // Use correct key
  if (!timeStr) return false; // Safety check

  const [startStr, endStr] = timeStr.split("-");

  const { hour: startHour, min: startMin } = parseTime(startStr);
  const startTime = new Date(now);
  startTime.setHours(startHour, startMin, 0, 0);

  const { hour: endHour, min: endMin } = parseTime(endStr.split(" ")[0]); // Remove extra session code (e.g., (T20A))
  const endTime = new Date(now);
  endTime.setHours(endHour, endMin, 0, 0);

  return now >= startTime && now <= endTime;

};

export const getCurrentWeek = (startOfTermDate) => {
  //   const today = new Date(
  //     new Date().toLocaleString("en-US", { timeZone: "Australia/Sydney" })
  //   );
  const today = new Date("2025-02-17");
  const startOfTerm = new Date(startOfTermDate);
  const diffInDays = Math.floor((today - startOfTerm) / (1000 * 60 * 60 * 24));
  return Math.floor(diffInDays / 7) + 1;
};

const parseTime = (timeString) => {
  let [hour, min] = timeString.trim().match(/\d+/g);
  let isPM = timeString.toLowerCase().includes("pm");
  hour = parseInt(hour, 10);

  if (isPM && hour !== 12) hour += 12;
  if (!isPM && hour === 12) hour = 0;

  return { hour, min: min ? parseInt(min, 10) : 0 };
};
