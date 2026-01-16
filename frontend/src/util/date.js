export const isHappeningNow = (event) => {
  const dayMap = {
    Sun: 'Sunday',
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday',
    Sat: 'Saturday',
  };

  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Australia/Sydney' }));

  const currentDay = now.toLocaleString('en-US', { weekday: 'long' });
  const eventDay = dayMap[event.day] || event.day;

  if (eventDay !== currentDay) return false;

  const timeStr = event.time || event.times;
  if (!timeStr) return false;

  const [startStr, endStr] = timeStr.split('-');

  const { hour: startHour, min: startMin } = parseTime(startStr);
  const startTime = new Date(now);
  startTime.setHours(startHour, startMin, 0, 0);

  const { hour: endHour, min: endMin } = parseTime(endStr.split(' ')[0]);
  const endTime = new Date(now);
  endTime.setHours(endHour, endMin, 0, 0);

  return now >= startTime && now <= endTime;
};

export const getCurrentWeek = (startOfTermDate) => {
  const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'Australia/Sydney' }));

  const startOfTerm = new Date(startOfTermDate);
  const diffInDays = Math.floor((today - startOfTerm) / (1000 * 60 * 60 * 24));
  return Math.floor(diffInDays / 7) + 1;
};

const parseTime = (timeString) => {
  let [hour, min] = timeString.trim().match(/\d+/g);
  let isPM = timeString.toLowerCase().includes('pm');
  hour = parseInt(hour, 10);

  if (isPM && hour !== 12) hour += 12;
  if (!isPM && hour === 12) hour = 0;

  return { hour, min: min ? parseInt(min, 10) : 0 };
};
