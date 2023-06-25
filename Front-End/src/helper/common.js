export const addDaysToDate = (date, days) => {
  if (!date || typeof date !== 'object') return new Date();
  let d = new Date(date);
  return new Date(d.setDate(d.getDate() + days));
};
