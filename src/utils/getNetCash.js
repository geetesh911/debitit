export const getNetCash = data => {
  let drCash = 0;
  let crCash = 0;
  data.length > 0 &&
    data.forEach(c => {
      if (c.type === "dr") drCash += c.amount;
      if (c.type === "cr") crCash += c.amount;
    });

  const netCash = drCash - crCash;
  return netCash;
};
