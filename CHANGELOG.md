# Changelog

All notable changes to the SnippetVault project will be documented in this file.

## [1.4.0] - 2026-07-09

### ✨ Features

- **Avatar Upload System:**
  - Implemented the frontend interface for profile picture updates.
  - Synced the `AuthContext` to instantly reflect the updated avatar across the application (e.g., Navbar) without requiring a page reload.

### 🎨 Improvements

- **UI Customization:**
  - Styled the native `<input type="file">` using the HTML `<label>` routing hack, providing a clean, custom upload button that matches the application's design system.

## [1.3.0] - 2026-07-08

### ✨ Features

- **Advanced Search & Filtering:**
  - Implemented real-time snippet search with a 500ms debounce mechanism to optimize database queries and prevent API rate-limiting.
  - Added dynamic pagination controls (Previous/Next) synchronized with backend skipping and limiting.
  - Integrated smart pagination reset on filter or search query.

- **Enhanced UX/UI:**
  - Added Spinner to provide visual feedback during asynchronous feed fetching.
  - Implemented dynamic empty states that adapt their messaging based on whether the database is empty or a specific search yielded no results.

### 🎨 Improvements

- **CSS Architecture:**
  - Refactored and centralized general UI classes into `index.css` for better maintainability and cleaner component-specific stylesheets.

## [1.2.0] - 2026-07-07

### ✨ Features

- **Comment System:**
  - Implemented full CRUD operations for code snippet comments, allowing users to interact directly with snippets.
  - Added real-time comment creation and deletion with UI feedback.
  - Integrated dynamic comment counting, synchronized between frontend and backend.

### 🛠️ Backend & Architecture
- **Data Synchronization:**
  - Implemented $push and $pull MongoDB operators in the backend services to maintain data consistency between the Snippets and Comments schemas.
  - Added ownership validation check to ensure only authorized users can edit or delete their own comments.

- **Validation:**
  - Integrated robust input validation and sanitization middleware for all comment-related API routes.

### 🐛 Bug Fixes
- UX/UI Stability:
  - Fixed an error caused by improper DOM nesting in the SnippetCard Markdown description.

## [1.1.1] - 2026-07-03

### 🐛 Bug Fixes

- **Mobile UI:**
  - Fixed an issue where custom WebKit scrollbars forced an unwanted physical scrollbar on touch devices, restoring native fluid scrolling.
  - Prevented the "Gemini AI Assist" button text from wrapping and breaking the layout on narrow screens by applying strict flexbox constraints.

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
