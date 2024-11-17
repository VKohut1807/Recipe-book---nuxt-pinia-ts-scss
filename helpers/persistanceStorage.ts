export const getItem = (key: string): string | object | null => {
  try {
    const item = localStorage.getItem(String(key));
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Error in getting data from localStorage", error);
    return null;
  }
};

export const setItem = (key: string, data: string | object): void | null => {
  try {
    localStorage.setItem(String(key), JSON.stringify(data));
  } catch (error) {
    console.error("Error in setting data to localStorage", error);
    return null;
  }
};
