require('dotenv').config();
const express = require('express');
const reservasRoutes = require('./routes/reservasRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //middleware para procesar peticiones tipo JSON

app.use('/api/reservas', reservasRoutes);

app.listen(port, () => {
  console.log(`Servidor iniciado en puerto ${port}`);
});
