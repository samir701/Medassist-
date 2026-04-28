import json
import os
import time
import google.generativeai as genai

# -------------------------------
# Gemini Configuration
# -------------------------------
genai.configure(api_key="AIzaSyAUFI4EMJe9rcwTEx48xh5A4QfQqVGaLTM")

model = genai.GenerativeModel("models/gemini-flash-latest")

# -------------------------------
# Load Knowledge Base
# -------------------------------
def load_kb():
    with open(r"C:\\Users\SAMIRMSI\Desktop\\Medassist+\\CHATBOT\\medicine_kb.json", "r") as f:
        kb = json.load(f)
    return kb

kb = load_kb()
print("KB loaded successfully:", kb.keys())

# -------------------------------
# Intent Detection
# -------------------------------
def detect_intent(query):
    query = query.lower()
    if "your name" in query or "who are you" in query:
        return "bot_name"
    if "have" in query or "feeling" in query or "pain" in query:
        return "symptom_check"
    if "weather" in query or "cold" in query or "hot" in query:
        return "weather_health"
    return "general"

# -------------------------------
# Symptom Extraction
# -------------------------------
def extract_symptom(query, kb):
    query = query.lower()
    for disease, data in kb.get("diseases", {}).items():
        for symptom in data.get("symptoms", []):
            if symptom in query:
                return symptom
    return None

# -------------------------------
# Disease Matching (SAFE)
# -------------------------------
def find_disease_by_symptom(user_symptom, kb):
    diseases = kb.get("diseases", {})
    for disease, data in diseases.items():
        if user_symptom in data.get("symptoms", []):
            return disease, data
    return None, None

# -------------------------------
# Doctor Advice Logic
# -------------------------------
def doctor_advice(disease_data):
    if disease_data.get("consult_doctor"):
        return "⚠️ Doctor consultation is recommended."
    return "✅ Home care is usually sufficient."

# -------------------------------
# Main MediBot Function
# -------------------------------
def medibot(query):
    intent = detect_intent(query)
    if intent == "bot_name":
        return "👋 Hi, I am MedBot+ 🩺"

    if intent == "symptom_check":
        symptom = extract_symptom(query, kb)

        if not symptom:
            return "❓ I couldn't identify the symptom clearly. Please describe again."

        disease, data = find_disease_by_symptom(symptom, kb)

        if disease:
            return f"""
🩺 Possible Disease: {disease.capitalize()}
🤒 Symptom Detected: {symptom}
💊 Suggested Medicine: {', '.join(data['medicine'])}
{doctor_advice(data)}
"""
        else:
            return "⚠️ Please consult a doctor for accurate diagnosis."

    if intent == "weather_health":
        for weather, problems in kb.get("weather_effects", {}).items():
            if weather in query.lower():
                return f"🌦️ {weather.capitalize()} weather may cause: {', '.join(problems)}"

    # 🚫 BLOCK NON-MEDICAL QUESTIONS
    return (
        "❌ I can only assist with medical-related queries.\n"
        "✅ Example: fever, headache, cold, medicine advice."
    )
# # -------------------------------
# # Chat Loop
# # -------------------------------
# print("\n🤖 MediBot is running! Type 'exit' to stop.\n")

# while True:
#     user_input = input("You: ")
#     if user_input.lower() == "exit":
#         print("MediBot: Stay healthy! 👋")
#         break
#     print("MediBot:", medibot(user_input))
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # VERY IMPORTANT for frontend connection

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    reply = medibot(user_message)

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

