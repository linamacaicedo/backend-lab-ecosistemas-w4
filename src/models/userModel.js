let users = [];

export const createUser = (user) => {
  users.push(user);
  return user;
};

export const getUserByEmail = (email) => {
  return users.find((u) => u.email === email);
};

export const getAllUsers = () => {
  return users;
};