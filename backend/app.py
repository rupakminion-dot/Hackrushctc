from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

DATA_PATH = "data"


# ---------- Utility Functions ---------- #

def load_data(filename):
    with open(os.path.join(DATA_PATH, filename), "r") as f:
        return json.load(f)


def save_data(filename, data):
    with open(os.path.join(DATA_PATH, filename), "w") as f:
        json.dump(data, f, indent=4)


def calculate_credits(user):
    credits = 0

    if user.get("email"):
        credits += 5
    if user.get("phone"):
        credits += 5
    if user.get("linkedin"):
        credits += 10
    if user.get("github"):
        credits += 10
    if user.get("bio"):
        credits += 5

    skills = user.get("skills", [])
    if len(skills) >= 3:
        credits += 10

    return credits


# ---------- AUTH ---------- #

@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    users = load_data("users.json")

    if any(u["email"] == data["email"] for u in users):
        return jsonify({"error": "User already exists"}), 400

    data["credits"] = calculate_credits(data)
    data["created_at"] = str(datetime.now())

    users.append(data)
    save_data("users.json", users)

    return jsonify({"message": "Registered successfully"})


@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    users = load_data("users.json")

    for user in users:
        if user["email"] == data["email"] and user["password"] == data["password"]:
            return jsonify({"message": "Login successful", "user": user})

    return jsonify({"error": "Invalid credentials"}), 401


# ---------- PROFILE ---------- #

@app.route("/api/profile/<email>", methods=["GET"])
def get_profile(email):
    users = load_data("users.json")

    for user in users:
        if user["email"] == email:
            return jsonify(user)

    return jsonify({"error": "User not found"}), 404


# ---------- SKILLS ---------- #

@app.route("/api/skills", methods=["GET"])
def skills():
    return jsonify(load_data("skills.json"))


# ---------- TRANSACTIONS ---------- #

@app.route("/api/transaction", methods=["POST"])
def add_transaction():
    data = request.json
    transactions = load_data("transactions.json")
    users = load_data("users.json")

    credit = 20

    if data.get("rating", 0) >= 4:
        credit += 10
    if data.get("verified", False):
        credit += 15

    data["credits_earned"] = credit
    data["timestamp"] = str(datetime.now())
    data["status"] = data.get("status", "completed")


    transactions.append(data)

    # Update user credits
    for user in users:
        if user["email"] == data["email"]:
            user["credits"] += credit

    save_data("transactions.json", transactions)
    save_data("users.json", users)

    return jsonify({"message": "Transaction recorded"})


@app.route("/api/transactions/<email>", methods=["GET"])
def get_transactions(email):
    transactions = load_data("transactions.json")
    return jsonify([t for t in transactions if t["email"] == email])


# ---------- LEADERBOARD ---------- #

@app.route("/api/leaderboard", methods=["GET"])
def leaderboard():
    users = load_data("users.json")
    sorted_users = sorted(users, key=lambda x: x["credits"], reverse=True)
    return jsonify(sorted_users)


# ---------- AI CHAT ---------- #

@app.route("/api/ai-chat", methods=["POST"])
def ai_chat():
    data = request.json
    ai_data = load_data("ai.json")
    query = data.get("query", "").lower()

    for item in ai_data:
        if item["keyword"] in query:
            return jsonify({"response": item["response"]})

    return jsonify({"response": "Explore AI, Cloud, or Web Development for growth."})


@app.route("/api/update-profile", methods=["POST"])
def update_profile():
    data = request.json
    users = load("users.json")

    for user in users:
        if user["email"] == data["email"]:
            user.update(data)

    save("users.json", users)
    return jsonify({"message": "Profile updated"})

# ---------- RUN ---------- #

if __name__ == "__main__":
    app.run(debug=True)
