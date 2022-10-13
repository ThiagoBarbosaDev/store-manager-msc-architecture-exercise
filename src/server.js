const app = require('./app');
const connection = require('./models/database/connection');
require('dotenv').config();

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, async () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
  const [dbres] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  const [idres] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [3]);
  console.log('idres', idres);
  if (dbres.length) { console.log(`DATABASE OK, product LENGTH = ${dbres.length}`); }
});
