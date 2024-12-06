const express = require("express");
const { CosmosClient } = require("@azure/cosmos");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

const cors = require("cors");
app.use(cors());

// Middleware pour analyser les JSON
app.use(bodyParser.json());

// Configuration de Cosmos DB
const cosmosClient = new CosmosClient({
  endpoint: "https://cloud-app.documents.azure.com:443/",
  key: "Td50ZOMgHN4oL9fDTBD94Wjaeq0LhfS2S7o0DQB9Nfaij8XMHZ9bvWfAGUjxAEBlkVeCJ256tRUwACDbxH4ZZA==",
});

const databaseId = "formu";
const containerId = "formuclub";

const database = cosmosClient.database(databaseId);
const container = database.container(containerId);

// Route pour recevoir les données du formulaire
app.post("/predict", async (req, res) => {
    const formData = req.body;
    console.log("Données reçues pour Cosmos DB :", formData); // Ajouter ceci

    try {
        // Stocker les données dans Cosmos DB
        const { resource: createdItem } = await container.items.create(formData);

        // Retourner une réponse de succès
        res.status(200).json({
            status: "success",
            message: "Formulaire soumis avec succès",
            data: createdItem,
        });
    } catch (error) {
        console.error("Erreur lors de l'insertion dans Cosmos DB:", error.message);
        res.status(500).json({
            status: "error",
            message: "Erreur lors de la soumission des données",
        });
    }
});


// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
