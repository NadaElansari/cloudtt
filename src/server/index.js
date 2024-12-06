// server.js
const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(cors());

const dbConfig = {
  user: "sqlserver",
  password: "1234",
  server: "34.148.85.62", // Adresse IP de votre instance
  database: "clubs", // Nom de la base de données
  options: {
    encrypt: true, // Si vous utilisez SSL
    trustServerCertificate: true, // À utiliser si SSL n'est pas correctement configuré
  },
};

app.get("/clubs", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query("SELECT * FROM clubs");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
