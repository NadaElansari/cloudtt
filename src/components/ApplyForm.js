import React, { useState } from "react";
import { useParams } from "react-router-dom"; 
import "../ApplyForm.css";

const ApplyForm = () => {
  const { clubId } = useParams();
  const [formData, setFormData] = useState({
    Nom: "",
    Prénom: "",
    "Adresse Email": "",
    "Numéro de Téléphone": "",
    Âge: "",
    Sexe: "",
    Filière: "",
    "Année d'étude": "",
    "Compétences Techniques": "",
    "Compétences Personnelles": "",
    Poste: "",
    "Motivation pour le Poste": "",
    "Idées ou Projets": "",
    "Heures par Semaine": "",
    "Disponibilité Réunions": "",
    clubId: clubId,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [prediction, setPrediction] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const postes = [
    "Président",
    "Vice-Président",
    "Secrétaire Général",
    "Head Cell Data & IA",
    "Co-Head Data & IA",
    "Head Cell Competitive Programming",
    "Co-Head Cell Data & IA",
    "Head Cell CyberSecurity",
    "Co-Head Cell CyberSecurity",
    "Sponsoring Cell",
    "Media Manager",
  ];

  const competencesTechOptions = [
    "Programmation (Python, Java, etc.)",
    "Analyse de données",
    "Gestion de projets",
    "Communication orale et écrite",
    "Connaissances en IA ou Data Science",
    "Cybersécurité",
    "Design et création de contenu",
    "Compétition algorithmique",
  ];

  const competencesPersoOptions = [
    "Leadership",
    "Travail en équipe",
    "Créativité",
    "Résolution de problèmes",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setPrediction("");
    setIsLoading(true);

    try {
        const response = await fetch("http://localhost:3002/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      
        if (response.ok) {
          const result = await response.json();
          if (result.status === 'success') {
            setSuccessMessage("Formulaire soumis avec succès !");
            setPrediction(result.prediction);
          } else {
            setErrorMessage("Erreur : " + (result.error || "Erreur inconnue."));
          }
        } else {
          const errorData = await response.json().catch(() => null);
          setErrorMessage("Erreur lors de la soumission : " + (errorData?.error || "Erreur inconnue."));
        }
      } catch (error) {
        setErrorMessage("Erreur lors de la communication avec le serveur : " + error.message);
      } finally {
        setIsLoading(false);
      }      
  };

  return (
    <div className="apply-form-container">
      <form onSubmit={handleSubmit}>
        <h1>Formulaire d'Application</h1>
        <label>
          Nom:
          <input
            type="text"
            name="Nom"
            value={formData.Nom}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Prénom:
          <input
            type="text"
            name="Prénom"
            value={formData.Prénom}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Adresse Email:
          <input
            type="email"
            name="Adresse Email"
            value={formData["Adresse Email"]}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Numéro de Téléphone:
          <input
            type="text"
            name="Numéro de Téléphone"
            value={formData["Numéro de Téléphone"]}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Âge:
          <input
            type="number"
            name="Âge"
            value={formData["Âge"]}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Sexe:
          <select name="Sexe" value={formData.Sexe} onChange={handleChange} required>
            <option value="">Sélectionnez</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </select>
        </label>
        <br />
        <label>
          Filière:
          <input
            type="text"
            name="Filière"
            value={formData.Filière}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Année d'étude:
          <select
            name="Année d'étude"
            value={formData["Année d'étude"]}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez</option>
            <option value="1ère année">1ère année</option>
            <option value="2ème année">2ème année</option>
            <option value="3ème année">3ème année</option>
          </select>
        </label>
        <br />
        <label>
          Compétences Techniques:
          <select
            name="Compétences Techniques"
            value={formData["Compétences Techniques"]}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez</option>
            {competencesTechOptions.map((tech, index) => (
              <option key={index} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Compétences Personnelles:
          <select
            name="Compétences Personnelles"
            value={formData["Compétences Personnelles"]}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez</option>
            {competencesPersoOptions.map((perso, index) => (
              <option key={index} value={perso}>
                {perso}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Poste:
          <select name="Poste" value={formData.Poste} onChange={handleChange} required>
            <option value="">Sélectionnez</option>
            {postes.map((poste, index) => (
              <option key={index} value={poste}>
                {poste}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Heures par Semaine:
          <input
            type="number"
            name="Heures par Semaine"
            value={formData["Heures par Semaine"]}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Motivation pour le Poste:
          <textarea
            name="Motivation pour le Poste"
            value={formData["Motivation pour le Poste"]}
            onChange={handleChange}
            placeholder="Expliquez brièvement pourquoi vous souhaitez rejoindre ce poste."
            required
          />
        </label>
        <br />
        <label>
          Idées ou Projets:
          <textarea
            name="Idées ou Projets"
            value={formData["Idées ou Projets"]}
            onChange={handleChange}
            placeholder="Décrivez une idée de projet que vous aimeriez réaliser dans ce club."
            required
          />
        </label>
        <br />
        <label>
          Disponibilité Réunions:
          <select
            name="Disponibilité Réunions"
            value={formData["Disponibilité Réunions"]}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez</option>
            <option value="Oui">Oui</option>
            <option value="Non">Non</option>
          </select>
        </label>
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Chargement..." : "Soumettre"}
        </button>
      </form>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {prediction && (
        <div className="prediction-message">
          <strong>Résultat de la prédiction :</strong> {prediction}
        </div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default ApplyForm;
