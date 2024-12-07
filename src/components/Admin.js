import React, { useState, useEffect } from "react";
import { CosmosClient } from "@azure/cosmos";

const Admin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = "https://cloud-app.documents.azure.com:443/"; // Remplacez par votre endpoint Azure Cosmos DB
      const key = "Td50ZOMgHN4oL9fDTBD94Wjaeq0LhfS2S7o0DQB9Nfaij8XMHZ9bvWfAGUjxAEBlkVeCJ256tRUwACDbxH4ZZA=="; // Remplacez par votre clé Azure Cosmos DB
      const databaseId = "formu"; // Nom de la base de données
      const containerId = "formuclub"; // Nom du container

      const client = new CosmosClient({ endpoint, key });

      try {
        const database = client.database(databaseId);
        const container = database.container(containerId);

        const query = {
          query: "SELECT * FROM c WHERE c.prediction = @prediction",
          parameters: [{ name: "@prediction", value: 1 }],
        };

        const { resources } = await container.items.query(query).fetchAll();

        // Grouper les résultats par catégorie de poste
        const groupedData = resources.reduce((acc, curr) => {
          const category = curr.Poste || "Autre";
          if (!acc[category]) acc[category] = [];
          acc[category].push(curr);
          return acc;
        }, {});

        setData(groupedData);
      } catch (err) {
        console.error("Erreur lors de la récupération des données : ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Chargement des données...</p>;

  return (
    <div>
      <h1>Bienvenue sur la page admin</h1>
      {Object.keys(data).map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          <table border="1">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Filière</th>
              </tr>
            </thead>
            <tbody>
              {data[category].map((user) => (
                <tr key={user.id}>
                  <td>{user.Nom}</td>
                  <td>{user.Prénom}</td>
                  <td>{user["Adresse Email"]}</td>
                  <td>{user["Numéro de Téléphone"]}</td>
                  <td>{user.Filière}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Admin;
