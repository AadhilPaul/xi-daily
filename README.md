# ⚽ XI Daily

**A daily football puzzle where you complete a famous starting XI by identifying the missing player.**

XI Daily is a full-stack football puzzle game inspired by the simplicity of daily puzzle games. Each day presents a different historic football match with one player missing from the starting XI. Use your football knowledge and the available hints to identify them.

The goal is simple:

> **Can you complete the XI?**

## 🎮 How It Works

Each daily puzzle is based on a real football match.

You are given:

* The match
* The starting formation
* The positions of the players
* The players surrounding the missing position

One player is hidden from the XI.

Your job is to identify the missing player.

### 🧩 Guessing

You have a limited number of attempts to find the correct player.

Player aliases are supported, so different commonly-used names for the same player can be recognized as valid answers.

### 💡 Hints

Hints become available as you progress through your attempts.

Current hints include:

* **Nationality**
* **Notable previous club**
* **Age bracket**

The previous-club hint focuses on notable clubs the player played for before the match, rather than simply showing their current club.

## ✨ Features

* 📅 Daily football puzzles
* ⚽ Historic matches and starting XIs
* 🧩 Limited guessing attempts
* 💡 Progressive hints
* 🌍 Player nationality information
* 🏟️ Notable previous-club information
* 🔎 Player search/autocomplete
* 👤 Anonymous user identification
* 📊 Per-puzzle result tracking
* 📱 Mobile-first gameplay
* 🔗 Shareable puzzle results

## 🏗️ Architecture

XI Daily is split into a React frontend and Django REST API backend.

```text
xi-daily/
│
├── backend/
│   ├── puzzles/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── hints.py
│   │   └── urls.py
│   └── manage.py
│
└── frontend/
    └── React + TypeScript application
```

### Backend

The backend is responsible for:

* Puzzle data
* Player and club information
* Match data
* Guess validation
* Hint generation
* User results
* Player search
* REST API endpoints

### Frontend

The frontend provides the interactive game experience and communicates with the Django REST API.

## 🛠️ Tech Stack

| Layer          | Technology            |
| -------------- | --------------------- |
| Frontend       | React                 |
| Language       | TypeScript            |
| Backend        | Django                |
| API            | Django REST Framework |
| Database       | PostgreSQL            |
| Authentication | Anonymous UUID        |
| Development    | Vite                  |

## 🗄️ Data Model

The application models football data separately from puzzle and user activity.

```text
Player
  │
  └── PlayerClub
        │
        └── Club history

Match
  │
  └── Puzzle
        │
        ├── Missing Player
        └── Formation

AnonymousUser
  │
  └── UserResult
        │
        └── Guess
```

This separation allows the same player and match data to be reused across different daily puzzles.

## 🔌 API

The backend exposes REST endpoints used by the frontend.

### Today's Puzzle

```http
GET /api/puzzle/today/
```

Returns the current daily puzzle and the information required to render the starting XI.

### Player Search

```http
GET /api/players/search/?q=<query>
```

Searches the player database for possible guesses.

## 🚀 Getting Started

### Prerequisites

Make sure you have:

* Python 3.x
* Node.js
* PostgreSQL
* npm

### Backend

```bash
cd backend

python -m venv venv
source venv/bin/activate

pip install -r requirements.txt

python manage.py migrate
python manage.py runserver
```

### Frontend

In another terminal:

```bash
cd frontend

npm install
npm run dev
```

The frontend will connect to the locally running Django API.

## 🧪 Development

The project includes Django management commands for populating the database with historical football matches and player data.

This makes it possible to curate and add new daily puzzles without hard-coding puzzle data into the frontend.

## 🧠 What I Learned

Building XI Daily has involved working across the entire stack rather than only building a frontend.

### Backend

* Designing relational data models with Django
* Building REST APIs with Django REST Framework
* Working with PostgreSQL
* Creating custom management commands
* Validating guesses on the server
* Designing reusable hint logic

### Frontend

* Building interactive interfaces with React
* Managing application state with TypeScript
* Communicating with REST APIs
* Creating a mobile-first game interface
* Handling user input and game state

### Product Development

The project also required thinking about the game itself:

* Designing a limited-attempt guessing system
* Choosing useful hints without making puzzles trivial
* Representing football formations
* Handling player aliases
* Curating historically meaningful matches

## 📌 Project Status

**Active development**

XI Daily is being developed as a personal full-stack project focused on combining football data, game design, and modern web development.

## 👤 Author

**Aadhil Paul**

[GitHub](https://github.com/AadhilPaul)
