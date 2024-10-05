const mapDayToAdditions = (day) => {
	if (day === "Monday") return 0;
	if (day === "Tuesday") return 1;
	if (day === "Wednesday") return 2;
	if (day === "Thursday") return 3;
	if (day === "Friday") return 4;
	if (day === "Saturday") return 5;
	if (day === "Sunday") return 6;
}

// Function to parse and convert time (like "6pm") into a 24-hour format
const parseTime = (time, date) => {
    let [hour, period] = time.match(/[0-9]+|[ap]m/g);
    hour = parseInt(hour, 10);

    if (period === 'pm' && hour < 12) {
        hour += 12;
    } else if (period === 'am' && hour === 12) {
        hour = 0; // Handle midnight case
    }

    // Set the hours and return a new Date object
    const resultDate = new Date(date);
    resultDate.setHours(hour, 0, 0, 0);
    return resultDate;
}

export const getLiveLectures = (schedule) => {
  let relevantOnes = schedule.filter((lec) => {
  	const startOfWeek = new Date(lec.week().starts_on);
  	const daysAfter = mapDayToAdditions(lec.day);

    // Add the specified number of days to the base date
    startOfWeek.setDate(startOfWeek.getDate() + daysAfter);
    
    // Extract the start and end times from the timeRange string
    const [startTime, endTime] = lec.time.split('-');
    
    
    // Get the timestamps for the start and end times
    const startTimestamp = parseTime(startTime, startOfWeek).getTime();
    const endTimestamp = parseTime(endTime, startOfWeek).getTime();

    return (startTimestamp < Date.now() && endTimestamp > Date.now());
  });
  relevantOnes = [schedule[0]]; // REMOVE THIS LINE WHEN NOT DEBUGGING

  return relevantOnes.map((lec) => ({
  	name: lec.content_lectures().map(c => c.name).join('; '),
  	description: lec.content_lectures().map(c => c.name).join('; '),
  	call_url: lec.call_url_h,
  }))
};

export const getLiveHelpSessions = (schedule) => {
  let relevantOnes = schedule.filter((helpsession) => {
  	const startOfWeek = new Date(helpsession.weeks().starts_on);
  	const daysAfter = mapDayToAdditions(helpsession.day);

    // Add the specified number of days to the base date
    startOfWeek.setDate(startOfWeek.getDate() + daysAfter);
    
    // Extract the start and end times from the timeRange string
    const [startTime, endTime] = helpsession.times.split('-');
    
    
    // Get the timestamps for the start and end times
    const startTimestamp = parseTime(startTime, startOfWeek).getTime();
    const endTimestamp = parseTime(endTime, startOfWeek).getTime();

    console.log(startTimestamp, endTimestamp, Date.now())
    return (startTimestamp < Date.now() && endTimestamp > Date.now());
  });
  relevantOnes = [schedule[0]]; // REMOVE THIS LINE WHEN NOT DEBUGGING
  return relevantOnes.map((helpsession) => ({
  	name: 'Help Session',
  	description: `Come and get help with ${helpsession.staff().map(s => s.name).join(', ')}`,
  	call_url: helpsession.call_url_h,
  }))
};