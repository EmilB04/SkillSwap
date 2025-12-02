# SkillSwap 💡

A modern skill-sharing platform built with React, TypeScript, and Cloudflare Workers, designed to connect people who want to learn, teach, and grow.

## 💻 About the Project

**SkillSwap** is a web application that transforms skill sharing into a seamless, community-driven experience. Users can post ads to offer their skills, find others willing to teach, and arrange either a trade (swap) or a paid service. It’s a marketplace for knowledge, collaboration, and personal growth.

## 👥 Contributors

- **Emil Berglund -  [EmilB04](https://github.com/EmilB04)** - Fullstack Developer & Project Owner
  - Full system architecture and project lead
  - Frontend setup with React, Vite, and TypeScript
  - UI/UX design and implementation with Tailwind CSS
  - Page structure, global layout, and navigation
  - Feature implementation (Profile, Explore, Ad Creation)
- **Andreas B.O. Skaarberg - [Andolaus](https://github.com/Andolaus)** - Fullstack Developer
  - Backend architecture on Cloudflare Workers
  - Authentication system and session management
  - Database schema and integration with Drizzle ORM
  - API development for all core services (users, ads, reviews)
- **Ida K. Tollaksen - [idatol](https://github.com/idatol)** - Frontend Developer
  - UI/UX design and implementation
  - Job/Ad detail pages and dynamic filtering
  - Interactive map integration for ad locations
  - Responsive design for the Explore and Job pages
- **Sebastian W. Thomsen - [Thomsen97](https://github.com/Thomsen97)** - Fullstack Developer
  - User messaging and notifications system
  - UI components for real-time interactions
  - Test suite setup with Vitest and React Testing Library

### ✨ Key Features

- **Skill Listings**: Post, browse, and discover a wide variety of skill offers.
- **Advanced Search & Filtering**: Filter ads by category, payment type (swap/cash), and more.
- **User Profiles**: Create a personal profile to showcase your skills and transaction history.
- **Secure Authentication**: Passwordless login using modern WebAuthn standards.
- **Responsive UI**: A beautiful and functional interface that works on any device.
- **Serverless Backend**: High performance and scalability powered by Cloudflare's edge network.
- **Direct Messaging**: Connect securely with other users to coordinate details *(coming soon)*.
- **Review System**: Build trust within the community through a transparent rating system.

### 🛠️ Tech Stack

- **Framework**: React 19 (with Server Components) & `rwsdk`
- **Language**: TypeScript
- **Backend**: Cloudflare Workers
- **Database**: Cloudflare D1 with Drizzle ORM
- **Styling**: Tailwind CSS
- **Bundler**: Vite
- **Testing**: Vitest & React Testing Library
- **Deployment**: Cloudflare Wrangler

### 🌐 Supported Platforms

- Modern Web Browsers (Chrome, Firefox, Safari, Edge)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm
- Git

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/EmilB04/SkillSwap.git
    cd SkillSwap && cd SkillSwap
    ```

2.  **Install dependencies**

    ```bash
    pnpm install
    ```

3.  **Run database migrations**

    ```bash
    pnpm run migrate:dev
    ```

4.  **Seed the database (optional)**

    ```bash
    pnpm run seed
    ```

5.  **Start the development server**

    ```bash
    pnpm run dev
    ```

    The application will now be running at `http://localhost:5173`.

## 🏫 Academic Context

This project is developed as part of the **Webapplikasjoner** (Web Applications) course, demonstrating:

- Modern fullstack development practices
- Serverless architecture on the edge
- Type-safe database management with an ORM
- Secure, passwordless authentication patterns
- Responsive and accessible UI/UX design

## 📄 License

This project is developed for educational purposes and is licensed under the MIT License.

---

*Built with ❤️ for the Webapplikasjoner course - Connecting skills and empowering communities.* 🌍✨

<!--
This README was generated with help from Gemini 2.5 Pro with the following prompt:

Update #file:README.md with relevant info about the project along side the contributors

Attachments: Git-commit history
Context: The previous Github README file + The whole project structure and codebase
-->
