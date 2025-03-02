export const getTotalPoints = (weeks) => {
  let totalPoints = 0;
  for (const week of weeks) {
    totalPoints += week.points;
  }
  return totalPoints;
}

export const getTotalTime = (weeks) => {
  let totalTime = 0;
  for (const week of weeks) {
    totalTime += week.seconds;
  }
  return totalTime;
}