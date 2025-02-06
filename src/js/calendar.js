export function getMonthName(year, monthIndex) {
  return new Date(year, monthIndex, 1).toLocaleString('en-GB', {
    month: 'long',
  });
}
export function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}
export async function findDayAndSplit(array) {
  for (const day of array) {
    if (day.date) {
      [dayNumber, monthTag] = day.date.split(', ');
    }
  }
}
