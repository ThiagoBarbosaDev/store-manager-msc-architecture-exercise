const sinon = require("sinon");
const { productsControllers } = require('../../../src/controllers');
const { productsServices } = require("../../../src/services");
const { productNotFoundErrorMock } = require('../services/mocks/products.services.mock');
const { productsMock, responseIdNotFoundErrorMock } = require('./mocks/products.controllers.mock');

describe("Testes de unidade da camada controller de produtos", function () {
  afterEach(sinon.restore);

  it("Listando todos os produtos", async function () {
    const res = {};
    const req = {};
    const productsList = productsMock;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsServices, "findAll")
      .resolves({ type: null, message: productsList });

    await productsControllers.findAll(req, res);

    sinon.assert.calledWith(res.status, 200)
    sinon.assert.calledWith(res.json, productsMock);
  });

  it("Listando um produto baseado pelo ID", async function () {
    const res = {};
    const req = { params: { id: 1 }};
    const productsList = productsMock[0];

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsServices, "find")
      .resolves({ type: null, message: productsList });

    await productsControllers.find(req, res);

    sinon.assert.calledWith(res.status, 200)
    sinon.assert.calledWith(res.json, productsMock[0]);
  });

  it("Gera um erro se o ID não existir", async function () {
    const res = {};
    const req = { params: { id: 4 } };
    const productsList = productsMock[0];

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsServices, "find").resolves(productNotFoundErrorMock);

    await productsControllers.find(req, res);

    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledWith(res.json, responseIdNotFoundErrorMock);
  });

  it("Cadastrando um novo produto na camada", async function () {
    const res = {};
    const req = { body: { name: 'ProdutoX' } };
    const serviceResult = {type: null, message: { name: 'ProdutoX', id: 2 }}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsServices, "insert").resolves(serviceResult);

    await productsControllers.insert(req, res);

    sinon.assert.calledWith(res.status, 201);
    sinon.assert.calledWith(res.json, serviceResult.message);
  });

  it("Gerar um erro ao cadastrar um novo produto sem o nome", async function () {
    const res = {};
    const req = { body: {} };
    const serviceResult = {
      type: 'VALUE_NOT_FOUND',
      message: '"name" is required',
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsServices, "insert").resolves(serviceResult);

    await productsControllers.insert(req, res);

    sinon.assert.calledWith(res.status, 400);
    sinon.assert.calledWith(res.json, { message: serviceResult.message });
  });

  it("Gerar um erro ao cadastrar um novo produto com o nome muito curto", async function () {
    const res = {};
    const req = { body: {} };
    const serviceResult = {
      type: "INVALID_NAME_LENGTH",
      message: '"name" length must be at least 5 characters long',
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsServices, "insert").resolves(serviceResult);

    await productsControllers.insert(req, res);

    sinon.assert.calledWith(res.status, 422);
    sinon.assert.calledWith(res.json, { message: serviceResult.message });
  });
  
});

