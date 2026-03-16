let products = [];

export const createProduct = (product) => {
  products.push(product);
  return product;
};

export const getAllProducts = () => {
  return products;
};