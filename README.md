
---
# 📊 Social Media Dashboard - Lovable

The **Lovable Social Media Dashboard** is a beautifully designed, responsive React application built with Vite. It provides a centralized view of social media analytics, conversations, and post management for modern brands and creators.

## ⚡ Tech Stack

- **Frontend Framework**: React + TypeScript
- **Bundler**: Vite
- **Styling**: CSS Modules / Styled Components
- **Charts**: Recharts
- **Icons**: Lucide / Heroicons
- **State Management**: React Hooks

## ✨ Features

### 📈 Analytics Overview
- Insightful cards for social metrics (followers, reach, engagement)
- Interactive Recharts (Line, Bar, Area)
- Time range filters with dynamic updates
- Responsive grid layout

### 💬 Conversations Panel
- Unified inbox from different social platforms (simulated)
- Filtering options by platform or message status
- Quick-reply input box for replying to messages

### 📰 Post Activity & Creation
- Recent social posts displayed in a timeline
- Modal for quick post creation with preview

### 🌈 UI/UX Design
- Purple-accent theme (`#9B87F5`, `#7E69AB`)
- Clean, minimal card layouts
- Responsive sidebar navigation
- Light theme with white and gray backgrounds
- Smooth hover transitions

## 📁 Folder Structure

```

1. social-media-dashboard/
│
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AnalyticsOverview\.tsx
│   │   ├── ConversationPanel.tsx
│   │   ├── PostCreationModal.tsx
│   │   ├── Sidebar.tsx
│   ├── data/
│   │   └── mockData.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── vite.config.ts
└── README.md

### 2. Install Dependencies

```bash
npm install
# or
yarn
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

### 4. View in Browser

```
http://localhost:5173
```

## 🧠 Future Improvements

* Connect with real APIs (Twitter, Instagram)
* User authentication (JWT/Supabase)
* Dark/light mode switch
* Notification system

## 📄 License

[MIT](LICENSE)

---

