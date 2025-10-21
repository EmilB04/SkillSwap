# SkillSwap

> A modern skill-sharing platform built with React, TypeScript, and Cloudflare Workers

SkillSwap is a web application that connects people who want to learn new skills with those who can teach them. Users can browse available skill-exchange opportunities, create their own listings, and connect with others in the community.

## 🚀 Features

- **Browse Skills**: Explore a wide variety of skill-exchange opportunities
- **User Profiles**: Create and manage your personal profile with your skills and interests
- **Smart Search**: Filter jobs by category, date range, and payment type
- **Secure Authentication**: User registration and login with session management
- **Responsive Design**: Beautiful UI that works seamlessly on desktop and mobile
- **Real-time Notifications**: Stay updated with messages and activity (coming soon)
- **Direct Messaging**: Connect with other users (coming soon)

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern React with Server Components
- **TypeScript** - Type-safe development
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **Vite 6.3.6** - Fast build tool and dev server

### Backend
- **Cloudflare Workers** - Edge computing platform
- **rwsdk 0.3.12** - Server-side rendering framework
- **Wrangler 4.20.5** - Cloudflare Workers CLI

### Database
- **Cloudflare D1** - SQLite-based serverless database
- **Drizzle ORM 0.44.5** - Type-safe database toolkit
- **drizzle-kit 0.31.5** - Schema migrations and management

## 📋 Prerequisites

- Node.js 18+ and npm 10+
- Cloudflare account (for deployment)
- Git

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/EmilB04/SkillSwap.git
cd SkillSwap/SkillSwap
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure database

Update `wrangler.jsonc` with your D1 database ID:

```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "skillswap-db",
      "database_id": "your-database-id-here",
      "migrations_dir": "drizzle"
    }
  ]
}
```

### 4. Run migrations

```bash
# Local development database
npm run migrate:dev

# Production database
npm run migrate:prd
```

### 5. Seed the database (optional)

```bash
npm run seed
```

### 6. Start development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
SkillSwap/
├── src/
│   ├── app/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── JobCard.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── profile/     # Profile-related components
│   │   ├── pages/          # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Explore.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── user/       # User pages (profile, auth)
│   │   ├── assets/         # Images and icons
│   │   ├── styles.css      # Global styles
│   │   └── Document.tsx    # HTML document wrapper
│   ├── db/
│   │   ├── schema/         # Database schema definitions
│   │   ├── index.ts        # Database connection
│   │   └── seed.ts         # Database seeding
│   ├── session/            # Session management
│   ├── types/              # TypeScript type definitions
│   ├── client.tsx          # Client entry point
│   └── worker.tsx          # Server entry point (routes)
├── drizzle/                # Database migrations
├── public/                 # Static assets
├── package.json
├── wrangler.jsonc         # Cloudflare Workers config
├── vite.config.mts        # Vite configuration
└── tsconfig.json          # TypeScript configuration
```

## 🗄️ Database Schema

The application uses the following main tables:

- **users** - User accounts and profiles
- **ads** - Skill-exchange listings
- **sessions** - User authentication sessions
- **direct_messages** - User messaging
- **notifications** - User notifications
- **reviews** - User reviews and ratings
- **profile_details** - Extended user profile information

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run release      # Clean, build, and deploy to Cloudflare
npm run migrate:dev  # Run migrations on local DB
npm run migrate:prd  # Run migrations on production DB
npm run migrate:new  # Generate new migration
npm run seed         # Seed database with sample data
npm run types        # Run TypeScript type checking
npm run clean        # Clear build cache
```

## 🚀 Deployment

### Deploy to Cloudflare Workers

1. Make sure you're logged in to Cloudflare:
```bash
npx wrangler login
```

2. Create your D1 database:
```bash
npx wrangler d1 create skillswap-db
```

3. Update `wrangler.jsonc` with your database ID

4. Run migrations on production:
```bash
npm run migrate:prd
```

5. Deploy:
```bash
npm run release
```

## 🎨 Key Features Implementation

### Authentication
- Server-side session management
- Secure password hashing (coming soon)
- Protected routes

### Profile System
- Collapsible sidebar navigation
- Persistent UI state with localStorage
- Active tab highlighting
- Settings, messages, and notifications pages

### Job Listings
- Category filtering
- Date range filtering
- Payment type filtering (cash/swap)
- Search functionality

## 🤝 Contributing

This is a student project for Webapplikasjoner. Contributions, issues, and feature requests are welcome!

## 📝 License

MIT

## 👥 Authors

- Emil B. - [EmilB04](https://github.com/EmilB04)

## 🙏 Acknowledgments

- Built with [rwsdk](https://github.com/redwoodjs/rwsdk) framework
- Powered by [Cloudflare Workers](https://workers.cloudflare.com/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)

---

**Project Status**: Active Development 🚧