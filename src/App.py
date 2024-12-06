from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import traceback
import numpy as np

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Chemins vers les fichiers
MODEL_DIR = os.path.join(os.path.dirname(__file__), "Model/")
ENCODER_PATH = os.path.join(MODEL_DIR, "encoder.pkl")
SCALER_PATH = os.path.join(MODEL_DIR, "scaler.pkl")
MODEL_PATH = os.path.join(MODEL_DIR, "model.pkl")

# Chargement des fichiers nécessaires
try:
    encoder = joblib.load(ENCODER_PATH)
    scaler = joblib.load(SCALER_PATH)
    model = joblib.load(MODEL_PATH)
    print("Tous les fichiers nécessaires ont été chargés avec succès.")
except Exception as e:
    print(f"Erreur lors du chargement des fichiers : {traceback.format_exc()}")
    raise e


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        print(f"Données reçues : {data}")

        # Validation et extraction des données
        expected_columns = [
            "Nom",
            "Prénom",
            "Adresse Email",
            "Numéro de Téléphone",
            "Âge",
            "Sexe",
            "Filière",
            "Année d'étude",
            "Compétences Techniques",
            "Compétences Personnelles",
            "Poste",
            "Motivation pour le Poste",
            "Idées ou Projets",
            "Heures par Semaine",
            "Disponibilité Réunions",
        ]
        missing_columns = [col for col in expected_columns if col not in data]
        if missing_columns:
            return jsonify({"error": f"Colonnes manquantes : {', '.join(missing_columns)}"}), 400

        categorical_features = [
            data.get("Poste"),
            data.get("Filière"),
            data.get("Sexe"),
            data.get("Année d'étude"),
        ]

        try:
            numerical_features = [
                float(data.get("Âge") or 0),
                float(data.get("Heures par Semaine") or 0),
            ]
        except ValueError as e:
            return jsonify({"error": f"Valeurs numériques invalides : {str(e)}"}), 400

        # Transformation des données
        encoded_features = encoder.transform([categorical_features])
        scaled_features = scaler.transform([numerical_features])
        features = np.hstack((encoded_features, scaled_features))

        # Prédiction
        prediction = model.predict(features)
        response = {
            "prediction": int(prediction[0]),
            "status": "success",
        }
        return jsonify(response)

    except Exception as e:
        print(f"Erreur interne : {traceback.format_exc()}")
        return jsonify({"error": "Une erreur interne est survenue.", "details": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=3002)
