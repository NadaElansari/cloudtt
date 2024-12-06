import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importer useNavigate

const ClubsList = () => {
  const [clubs, setClubs] = useState([]);
  const navigate = useNavigate(); // Initialiser le hook useNavigate

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch("http://localhost:5000/clubs");
        const data = await response.json();
        setClubs(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des clubs :", error);
      }
    };

    fetchClubs();
  }, []);

  const handleApply = (clubId) => {
    navigate(`/apply/${clubId}`); // Redirection dynamique
  };

  return (
    <div>
      <h1>Liste des Clubs</h1>
      <ul>
        {clubs.map((club) => (
          <li key={club.id}>
            <strong>{club.nom}</strong>
            <p>{club.description}</p>
            <p>Nombre de membres : {club.membres_count}</p>
            <p>
              Mailto :{" "}
              <a href={`mailto:${club.contact_email}`}>{club.contact_email}</a>
            </p>
            <button onClick={() => handleApply(club.id)}>Je Postule</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClubsList;
