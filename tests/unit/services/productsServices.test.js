const { expect } = require("chai");
const sinon = require("sinon");
const { productsModels } = require('../../../src/models');
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

    it("Cadastrando um novo produto", async function () {
      // Arrange
      const modelReturnMock = {
          id: 4,
          name: "ProdutoX",
      };

      const serviceReturnMock = { type: null, message: modelReturnMock };

      sinon.stub(productsModels, "insert").resolves([{ insertId: 4 }]);
      sinon.stub(productsModels, "find").resolves(modelReturnMock);
      const mockProduct = { name: "ProdutoX" };
      // Act
      const result = await productsServices.insert(mockProduct);
      // Assert
      expect(result).to.be.deep.equal(serviceReturnMock);
    });

    it("Deve gerar um erro ao não passar a chave 'name' no body ", async function () {
      // Arrange
      const expectedReturn = {
        type: 'VALUE_NOT_FOUND',
        message: '"name" is required'
      }
      const mockProduct = {};
      // Act
      const result = await productsServices.insert(mockProduct);
      // Assert
      expect(result).to.be.deep.equal(expectedReturn);
    });

    it("Deve gerar um erro ao passar a chave 'name' no body com menos de 5 caractéres ", async function () {
      // Arrange
      const expectedReturn = {
        type: "BAD_REQUEST",
        message: '"name" length must be at least 5 characters long',
      };
      const mockProduct = { name: "foo" };
      // Act
      const result = await productsServices.insert(mockProduct);
      // Assert
      expect(result).to.be.deep.equal(expectedReturn);
    });
});
