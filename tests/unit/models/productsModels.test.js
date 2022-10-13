const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/database/connection');
const productsModel = require("../../../src/models/products.models");
const { productsServices } = require('../../../src/services');
const { productsMock } = require('./mocks/products.models.mock');

describe('Testes de unidade da camada model de produtos', function () {
  afterEach(sinon.restore);

  it('Recuperando os dados de todos os produtos', async function () {
    // Arrange
    sinon.stub(connection, "execute").resolves([productsMock]);
    // Act
    const result = await productsModel.findAll();
    // Assert
    expect(result).to.be.deep.equal(productsMock);
  });

  it('Recuperando os dados de um produto baseado no ID', async function () {
    // Arrange
    sinon.stub(connection, "execute").resolves([[productsMock[0]]]);
    // Act
    const result = await productsModel.find(1);
    // Assert
    expect(result).to.be.deep.equal(productsMock[0]);
  });

  it('Cadastrando um novo produto', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    const mockProduct = 'ProdutoX'
    // Act
    const result = await productsModel.insert(mockProduct);
    // Assert
    expect(result).to.be.deep.equal(4);
  });
});