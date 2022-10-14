const insert = async (payload) => {
  // const error = nameValidation(payload);

  // if (error.type) {
  //   return error;
  // }

  // const response = await productsModels.find(id);
  console.logI('ignora esse log');
  return { type: null, message: payload };
};

module.exports = {
  insert,
};
