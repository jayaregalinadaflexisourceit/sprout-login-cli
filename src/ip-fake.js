const generateRandom = () => {
  return Math.floor(Math.random() * 255);
};

export default () => {
  return [generateRandom(), generateRandom(), generateRandom()].join('.');
};
