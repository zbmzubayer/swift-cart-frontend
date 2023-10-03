const setToLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export { getFromLocalStorage, setToLocalStorage };
