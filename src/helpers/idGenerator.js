const NUMBER = 16;

export const generateUniqueId = () => {
  const timestamp = new Date().getTime().toString(NUMBER);
  const randomNum = Math.floor(Math.random() * NUMBER).toString(NUMBER);
  return timestamp + randomNum;
};
