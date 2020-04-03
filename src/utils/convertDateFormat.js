export const convertDateFormat = d => {
  d = d.split("-");
  const date = `${d[1]}-${d[2]}-${d[0]}`;
  return date;
};
