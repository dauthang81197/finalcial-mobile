export const getDateRanges = () => {
  const now = new Date();

  // --- Daily (hôm nay)
  const dailyStart = new Date(now);
  const dailyEnd = new Date(now);

  // --- Weekly (tuần hiện tại, từ thứ 2 đến CN)
  const dayOfWeek = now.getDay(); // Chủ nhật = 0, thứ 2 = 1 ...
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // tính offset tới thứ 2
  const sundayOffset = dayOfWeek === 0 ? 0 : 7 - dayOfWeek; // tới chủ nhật

  const weeklyStart = new Date(now);
  weeklyStart.setDate(now.getDate() + mondayOffset);

  const weeklyEnd = new Date(now);
  weeklyEnd.setDate(now.getDate() + sundayOffset);

  // --- Monthly (như bạn có sẵn)
  const monthlyStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthlyEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const toDateStr = (d: Date) => d.toISOString().split("T")[0];

  return {
    daily: {
      startDate: toDateStr(dailyStart),
      endDate: toDateStr(dailyEnd),
    },
    weekly: {
      startDate: toDateStr(weeklyStart),
      endDate: toDateStr(weeklyEnd),
    },
    monthly: {
      startDate: toDateStr(monthlyStart),
      endDate: toDateStr(monthlyEnd),
    },
  };
};

export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
