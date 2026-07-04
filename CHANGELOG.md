# Changelog

All notable changes to the SnippetVault project will be documented in this file.

## [1.1.0] - 2026-07-04

This update focuses on enhancing user expression through Markdown and refining the overall UI consistency.

### ✨ Features

- **Markdown Support:**
  - Integrated `react-markdown` to allow rich text formatting in snippet descriptions.
  - Added a real-time Preview mode in the snippet creation form, providing a seamless toggle between "Write" and "Preview".
- **Enhanced UI Customization:**
  - Standardized scrollbar styling across the application for a consistent dark theme experience.
  - Implemented custom cross-browser text selection (`::selection`) to improve readability and visual identity.

### 🎨 Improvements

- **CSS Architecture Refactoring:**
  - Performed a major refactor of global styles to separate structural components (`.markdown-preview-box`) from typographic content (`.markdown-content`), ensuring better reusability and cleaner code.
- **Dynamic Versioning:**
  - Automated the version badge in the Navbar by dynamically reading the current version from `package.json`.
- **UI Polish:**
  - Fixed minor UI inconsistencies in form components, ensuring a cleaner "dark mode" look across all input types and modal overlays.

### 🛡️ Security & Architecture

- Improved CSS specificity and maintainability by centralizing global UI resets in `index.css`.

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
