const setToLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage };
