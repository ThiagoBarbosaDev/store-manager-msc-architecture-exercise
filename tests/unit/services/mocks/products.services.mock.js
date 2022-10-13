const productsMock = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
];

const productNotFoundErrorMock = {
  message: "Product not found",
  type: "ID_WITHOUT_RESULTS",
};

module.exports = {
  productsMock,
  productNotFoundErrorMock,
};
