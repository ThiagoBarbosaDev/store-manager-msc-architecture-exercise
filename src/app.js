require('express-async-errors');

const express = require('express');

const { productsRoutes, salesRoutes } = require('./routers');
const { mapError } = require('./utils/errorMap');

const app = express();

app.use(express.json());

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(async ({ type, message }, _req, res, _next) => (
  res.status(mapError(type)).json({ message })
));

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;