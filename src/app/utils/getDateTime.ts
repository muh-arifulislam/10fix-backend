const getDateTime = () => {
  // Create a new Date object representing the current time
  const now = new Date();

  // Adjust the time to Bangladesh Time (BDT)
  // Bangladesh Time is UTC+6
  const bangladeshTimeOffset = 6 * 60 * 60 * 1000; // Convert 6 hours to milliseconds
  const bangladeshTime = new Date(now.getTime() + bangladeshTimeOffset);

  // Convert the adjusted time to UTC
  const utcTime = new Date(
    bangladeshTime.getTime() - bangladeshTime.getTimezoneOffset() * 60000,
  );

  // Use toISOString() to get the ISO 8601 representation of the time in UTC
  const isoString = utcTime.toISOString();

  return isoString;
};

export default getDateTime;
