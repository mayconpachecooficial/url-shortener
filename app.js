const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', urlRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


