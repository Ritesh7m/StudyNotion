
export const calculateTotalDuration = (course) => {
  let totalSeconds = 0;
  course.courseContent.forEach((section) => {
    section.subSection.forEach((lecture) => {
      const timeParts = lecture.timeDuration.split(":").map(Number);
      const seconds = timeParts.length === 3
        ? timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2]
        : timeParts[0] * 60 + timeParts[1];
      totalSeconds += seconds;
    });
  });

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};
