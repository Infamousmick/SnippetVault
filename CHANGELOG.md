# Changelog

All notable changes to the SnippetVault project will be documented in this file.

## [1.0.0] - 2026-07-03

Welcome to the first official release of SnippetVault! This version lays the foundation of the platform, providing a comprehensive hub for managing, formatting, and sharing code snippets.

### ✨ Features

- **Snippet Management:** Full CRUD (Create, Read, Update, Delete) capabilities for your code fragments.
- **Syntax Highlighting:** Native integration of `react-syntax-highlighter` for crystal-clear code rendering.
- **Gemini AI Integration:**
  - Added "Ask Gemini" button for code interaction and explanations.
  - Implemented an "AI Generated" badge to identify snippets created with artificial intelligence.
- **Secure Authentication:** Local JWT-based login and registration system.
- **Profile Management:**
  - Dedicated settings area for password updates.
  - Backend API foundation established for user avatar uploads via Cloudinary (Frontend integration coming in V2).

### 🎨 Improvements

- **Mobile-First Design:** Fully responsive interface featuring a modern dark theme.
- **Code Utilities:**
  - Quick "Copy code" functionality.
  - Automatic code formatting during creation using standalone Prettier.
- **Feed & Discovery:**
  - Base sorting and filtering system in the Dashboard.
  - Custom empty states for when no posts are available.
- **Navigation System:** Dynamic navbar with a versioning badge and an informative footer.

### 🛡️ Security & Architecture

- Implemented global, centralized error handling for both backend and frontend.
- Advanced protection for private routes (CORS and redirects for unauthenticated users).
- Added conditional logic to safely handle unsupported languages in the code formatter.
