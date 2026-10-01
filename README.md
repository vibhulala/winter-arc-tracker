# ❄️ Winter Arc Tracker

A full-stack daily productivity and streak-tracking web application
built to track personal goals throughout the Winter Arc.

## 🚀 Live Demo

Frontend: [Netlify Link]
Backend: [Render Link]

## ✨ Features

- User Registration & Login
- Personalized Daily Targets
- Add New Targets
- Complete / Uncomplete Targets
- Delete Targets
- Daily Completion History
- 80% Completion Based Streak System
- Persistent Login Sessions
- Responsive UI
- REST API based Backend
- Full-Stack Frontend & Backend Integration

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3

### Backend
- Python
- Django
- Django Authentication
- Django REST-style APIs

### Database
- SQLite

### Deployment
- Netlify — Frontend
- Render — Backend
- GitHub — Source Control

## 🏗️ Architecture

React Frontend
       ↓
Netlify
       ↓
Django API
       ↓
Render
       ↓
SQLite Database

## 🔐 Authentication

The application uses Django's authentication system for:

- User registration
- Login
- Logout
- Session management
- User-specific targets

## 📊 Streak Logic

A day is considered successful when the user completes
at least 80% of their active targets.

Example:

5 Targets
→ 4 completed = Successful Day ✅
→ 5 completed = Successful Day ✅
→ 3 completed = Streak Break ❌

## 📁 Project Structure

WINTER-ARC-TRACKER/
│
├── BACKEND/
│   ├── config/
│   ├── targets/
│   ├── manage.py
│   └── requirements.txt
│
└── FRONTEND/
    ├── src/
    ├── public/
    ├── package.json
    └── vite.config.js

## ⚙️ Local Setup

### Backend

```bash
cd BACKEND

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
