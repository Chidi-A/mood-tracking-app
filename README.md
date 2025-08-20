# 🌟 Mood Tracking App

A comprehensive mood and wellness tracking application built with React, TypeScript, and Supabase. Track your daily moods, sleep patterns, and personal reflections with beautiful visualizations and insights.

![React](https://img.shields.io/badge/React-19.1.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)
![Supabase](https://img.shields.io/badge/Supabase-2.52.1-green.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.11-blue.svg)

## ✨ Features

### 🎭 Mood Tracking

- **5-level mood scale**: Very Sad, Sad, Neutral, Happy, Very Happy
- **Visual mood icons** with color-coded indicators
- **Daily mood logging** with timestamp tracking
- **Mood trend visualization** with interactive charts

### 😴 Sleep Monitoring

- **Sleep hours tracking** with categorization
- **Sleep pattern analysis** and trends
- **Visual sleep indicators** and progress tracking
- **Sleep quality insights** and averages

### 📝 Personal Reflection

- **Journal entries** for daily thoughts and experiences
- **Feeling tags** to categorize emotions
- **Reflection prompts** and guided journaling
- **Personal growth tracking**

### 📊 Analytics & Insights

- **Interactive trend charts** showing mood and sleep patterns
- **Average calculations** for mood and sleep over time
- **Visual progress indicators** and statistics
- **Responsive charts** that work on all devices

### 👤 User Management

- **Secure authentication** with Supabase Auth
- **User profiles** with customizable avatars
- **Onboarding flow** for new users
- **Settings management** and profile updates

### 🎨 User Experience

- **Responsive design** that works on desktop, tablet, and mobile
- **Modern UI** with Tailwind CSS
- **Smooth animations** and transitions
- **Accessible design** following best practices

## 🚀 Tech Stack

### Frontend

- **React 19.1.0** - Modern React with latest features
- **TypeScript 5.8.3** - Type-safe development
- **Vite 7.0.4** - Fast build tool and dev server
- **Tailwind CSS 4.1.11** - Utility-first CSS framework

### State Management

- **Redux Toolkit 2.8.2** - Predictable state container
- **React Query 5.83.0** - Server state management
- **React Hook Form 7.60.0** - Form state management

### Backend & Database

- **Supabase 2.52.1** - Backend-as-a-Service
- **PostgreSQL** - Relational database
- **Supabase Auth** - User authentication
- **Supabase Storage** - File storage for avatars

### Visualization

- **Recharts 3.1.0** - Composable charting library
- **Custom chart components** for mood and sleep data

### Routing

- **React Router 7.8.0** - Client-side routing
- **Protected routes** - Authentication-based access control

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account and project

### Setup

1. **Clone the repository**

   ```bash
   git clone [your-repo-url]
   cd mood-tracking-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**
   Create a `.env.local` file in the root directory:

   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database setup**
   Set up your Supabase database with the required tables:

   - `profiles` - User profile information
   - `mood_entries` - Daily mood and sleep data
   - `quotes` - Inspirational quotes (optional)

5. **Start development server**

   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AverageMoodCard.tsx
│   ├── TrendsChartCard.tsx
│   ├── Header.tsx
│   └── ...
├── features/           # Feature-specific components
│   ├── LogMoodModal.tsx
│   ├── steps/
│   └── types.ts
├── hooks/              # Custom React hooks
│   ├── useAuth.ts
│   ├── useMoodQueries.ts
│   └── ...
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   └── ...
├── services/           # API and business logic
│   ├── authService.ts
│   ├── moodService.ts
│   └── ...
├── store/              # Redux store configuration
│   ├── store.ts
│   ├── authSlice.ts
│   └── ...
├── utils/              # Utility functions
└── assets/            # Static assets
```

This comprehensive README covers all the key aspects of your mood tracking app, including:

- **Clear feature overview** with emojis for visual appeal
- **Complete tech stack** with version numbers
- **Step-by-step installation** instructions
- **Project structure** explanation
- **Usage guidelines** for users
- **Development information** for contributors
- **Responsive design** details
- **Authentication flow** explanation

The README is professional, informative, and user-friendly, making it easy for both users and developers to understand and work with your app.

## 🎯 Usage

### Getting Started

1. **Sign up** for a new account or **log in** with existing credentials
2. **Complete onboarding** to set up your profile
3. **Log your first mood** using the "Log mood" button
4. **Track your progress** on the dashboard

### Daily Mood Logging

1. Click the **"Log mood"** button on the dashboard
2. **Select your mood** from the 5-level scale
3. **Enter sleep hours** for the previous night
4. **Add feeling tags** that describe your emotions
5. **Write a journal entry** (optional)
6. **Submit** to save your entry

### Viewing Insights

- **Dashboard** shows your latest mood and sleep averages
- **Trends chart** displays mood and sleep patterns over time
- **Statistics cards** show progress and insights
- **Profile settings** allow customization

## 🔧 Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🔐 Authentication Flow

1. **Sign Up**: Create account with email/password
2. **Email Verification**: Verify email address (if enabled)
3. **Onboarding**: Complete profile setup
4. **Dashboard Access**: Full app functionality
5. **Profile Management**: Update settings and preferences

## 📱 Responsive Design

The app is fully responsive and optimized for:

- **Desktop** (1024px+): Full dashboard layout
- **Tablet** (768px-1023px): Adapted layout with touch support
- **Mobile** (320px-767px): Mobile-first design with touch interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 🙏 Acknowledgments

- **Frontend Mentor** for the design inspiration
- **Supabase** for the excellent backend services
- **Recharts** for the beautiful chart components
- **Tailwind CSS** for the utility-first styling approach

---

**Happy mood tracking! 🌈**
