export function getMonthName(year, monthIndex) {
  return new Date(year, monthIndex, 1).toLocaleString('en-GB', {
    month: 'long',
  });
}
export function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}
export function parseToken(token) {
  const parsedToken = token ? JSON.parse(token).token : null;
  const cleanedToken = parsedToken ? parsedToken.replace(/"/g, '') : null;
  return cleanedToken;
}
