export const getTotalPoints = (profile) => {
  let totalPoints = 0;
  for (const week of profile.totalPoints) {
    totalPoints += week.points;
  }
  return totalPoints;
}

export const getTotalTime = (profile) => {
  let totalTime = 0;
  for (const week of profile.totalTime) {
    totalTime += week.seconds;
  }
  return totalTime;
}

export const getWeeklyPoints = (profile) => {
  const date = new Date();
  const startDate = new Date(1970, 0, 1); // Start from January 1, 1970 (UNIX epoch)
  const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000)); // Total days passed
  const currentWeek = Math.floor(days / 7); // Calculate weeks passed

  let weeklyPoints = profile.totalPoints.find(
    entry => entry.week === currentWeek
  );
  return weeklyPoints === undefined ? 0 : weeklyPoints.points;
};