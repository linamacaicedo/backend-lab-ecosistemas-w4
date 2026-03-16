let stores = [];

export const createStore = (store) => {
  stores.push(store);
  return store;
};

export const getAllStores = () => {
  return stores;
};