export const getToken = () => {
  let cookies = document.cookie.split(";");
  let cookie = "";
  cookies.forEach((c) => {
    if (c.includes("token")) {
      cookie = c;
      return;
    }
  });
  return cookie.split("=")[1];
};
