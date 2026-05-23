<div align="center">

<img src="https://img.shields.io/badge/MailCraft-Frontend-6366f1?style=for-the-badge&logo=react&logoColor=white" />

# MailCraft Frontend

**AI-powered email reply generator — React web application**  
Built with React · Vite · Google Gemini AI

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

</div>

---

## 📌 Overview

MailCraft is a production-ready web application that generates polished, context-aware email replies using Google Gemini AI. Paste any email, select your communication style, and receive a professional reply in under 3 seconds.

---

## 🌐 Live Demo

```
https://mail-craft-frontend.vercel.app
```

---

## ✨ Features

- **8 Tone Styles** — Professional, Formal, Friendly, Apologetic, Assertive, Concise, Persuasive, Diplomatic
- **Sub-3s Generation** — Powered by Google Gemini 2.5 Flash
- **Sample Email Library** — 8 pre-loaded professional email scenarios
- **In-app Editing** — Edit generated reply before copying
- **One-click Copy** — Copy to clipboard instantly
- **Zero Data Retention** — Emails are never stored

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | React 18 |
| Build Tool | Vite |
| Styling | Vanilla CSS (custom design system) |
| Fonts | Syne, DM Sans, JetBrains Mono |
| Backend | Spring Boot REST API |
| AI Model | Google Gemini 2.5 Flash |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/omshewalegit/MailCraft-Frontend.git
cd MailCraft-Frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8080
```

### 4. Run the development server

```bash
npm run dev
```

App starts at → `http://localhost:5173`

---

## 📁 Project Structure

```
src/
├── App.jsx
├── App.css
├── EmailWriter.jsx     ← Main component
├── index.css
├── main.jsx
└── assets/
```

---

## 🔗 Related Repositories

| Repo | Description |
|------|-------------|
| [MailCraft Backend](https://github.com/omshewalegit/MailCraft-backend) | Spring Boot REST API |
| [MailCraft Extension](https://github.com/omshewalegit/MailCraft-extension) | Chrome Extension for Gmail |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch `git checkout -b feature/amazing-feature`
3. Commit your changes `git commit -m 'Add amazing feature'`
4. Push to the branch `git push origin feature/amazing-feature`
5. Open a Pull Request

---

<div align="center">

**If this project helped you, give it a ⭐**

*Built with ❤️ by [Om Shewale](https://github.com/omshewalegit)*

</div>
