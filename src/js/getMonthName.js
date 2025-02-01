export default function getMonthName(year, monthIndex) {
  return new Date(year, monthIndex, 1).toLocaleString('en-GB', {
    month: 'long',
  });
};
