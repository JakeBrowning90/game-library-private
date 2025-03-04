const parameterizeArray = (key, arr) => {
  arr = arr.map(encodeURIComponent);
  return "&" + key + "[]=" + arr.join("&" + key + "[]=");
};

export { parameterizeArray };
