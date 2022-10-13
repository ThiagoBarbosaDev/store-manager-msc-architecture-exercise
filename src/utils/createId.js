const createId = (data) => {
  const lastDataObj = data.at(-1);
  const newId = lastDataObj.id + 1 || 1;
  return newId;
};

module.exports = createId;