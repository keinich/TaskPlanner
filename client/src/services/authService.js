export const getProfile = () => {
  return JSON.parse(localStorage.getItem("profile"));
};

export const setProfile = (p) => {
  localStorage.setItem("profile", JSON.stringify(p));
}
