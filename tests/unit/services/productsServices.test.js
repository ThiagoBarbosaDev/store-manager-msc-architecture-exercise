const { expect } = require("chai");
const sinon = require("sinon");
const { productsModels } = require('../../../src/models');
const passengerModel = require("../../../src/models/products.models");
const { productsServices } = require('../../../src/services');
const { productsMock, productNotFoundErrorMock } = require('./mocks/products.services.mock');

describe("Testes de unidade da camada services de produtos", function () {
  afterEach(sinon.restore);

  it("Recuperando os dados de todos os produtos", async function () {
    // Arrange
    sinon.stub(productsModels, "findAll").resolves(productsMock);
    // Act
    const result = await productsServices.findAll();
    // Assert
    expect(result.message).to.be.deep.equal(productsMock);
  });
  it("Recuperando os dados de um produto baseado no ID", async function () {
    // Arrange
    sinon.stub(productsModels, "find").resolves(productsMock[0]);
    // Act
    const result = await productsServices.find(1);
    // Assert
    expect(result.message).to.be.deep.equal(productsMock[0]);
  });
  it("Gera um erro se o ID não existir", async function () {
    // Arrange
    sinon.stub(productsModels, "find").resolves(undefined);
    // Act
    const result = await productsServices.find(4);
    // Assert
    expect(result).to.be.deep.equal(productNotFoundErrorMock);
  });
});
