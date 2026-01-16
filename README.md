# Torre Test - Job Search Application

A modern, production-grade job search application built with **Next.js 15 (App Router)**, **React 19**, and **Tailwind CSS v4**. This project showcases a polished, glassmorphic UI coupled with robust engineering practices like strict type safety, custom hooks, and performance optimizations.

## ✨ Features

### 🎨 Modern UI/UX

- **Glassmorphism Design system**: Premium translucent aesthetics using backdrop filters and subtle gradients.
- **Responsive Split-View**:
  - **Desktop**: Interactive master-detail view with sticky side panel.
  - **Mobile**: Seamless list view with full-screen, animated detail overlays and bottom-sheet style interactions.
- **3D Interactions**: Physics-based 3D tilt effects on job cards.
- **Dark Mode**: First-class dark mode support with smooth transitions.
- **Accessible**: Keyboard navigation support (`Tab` + `Enter` selection), ARIA roles, and semantic HTML.

### 🔍 Search & Discovery

- **Live Filtering**: Dynamic filtering by Language, Skill, and Status.
- **Smart Data Fetching**:
  - **Debounced Search**: Optimized API calls.
  - **Request Cancellation**: `AbortController` implementation to cancel stale requests during rapid navigation.
  - **Pagination**: Infinite-scroll style "Load More" functionality.

## 🛠 Tech Stack & Architecture

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server & Client Components)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **State Management**: React Hooks (`useState`, `useEffect`, `useCallback`)
- **Data Fetching**: Custom hooks pattern (`useJobs`, `useJobDetail`)

### Key Architectural Decisions

1. **Strict Type Safety**: Comprehensive TypeScript definitions in `types.ts` eliminate `any` usage, ensuring code reliability.
2. **Separation of Concerns**:
    - **Logic**: Encapsulated in `hooks/` (e.g., `useJobs.ts` handles pagination and search state).
    - **UI**: Pure presentational components in `components/`.
    - **Config**: Centralized constants in `constants.ts` for easy maintenance.
3. **Performance**:
    - Next.js Image optimization for remote assets (configured for Torre & Cloudinary).
    - Memoized callbacks to prevent unnecessary re-renders.

## 📂 Project Structure

```text
app/
├── job/
│   ├── components/      # UI Components (JobCard, Sidebar, Header...)
│   ├── hooks/           # Custom Logic (useJobs, useJobDetail)
│   ├── constants.ts     # Configuration & API constants
│   ├── types.ts         # Strict TypeScript interfaces
│   └── page.tsx         # Main View Controller
└── globals.css          # Tailwind Directives & Theme Variables
```

## 🚀 Getting Started

1. **Clone the repository**:

    ```bash
    git clone git@github.com:zintaen/torre-product-engineer-test.git
    cd torre-product-engineer-test
    ```

2. **Install dependencies**:

    ```bash
    npm install
    # or
    pnpm install
    ```

3. **Run the development server**:

    ```bash
    npm run dev
    ```

4. **Open the app**:
    Visit [http://localhost:3000](http://localhost:3000)

## 🧪 Development

To build for production:

```bash
npm run build
```

This runs the Next.js compiler with strict type validation.

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
