# ⚡ StudyVault — Student Resources Platform

A clean, fast React app that lets students upload, search, and browse academic resources — organized by type.

---

## ✨ Features

- **Upload Resources** — Add a title, pick a resource type, and attach any file
- **View Files in Browser** — Uploaded files open directly in a new browser tab using the File API
- **Search** — Filter resources instantly by title or type from the home page
- **Browse by Type** — Navigate to dedicated sections for PPT, PDF, Doc, Question Bank, and Question Papers
- **Delete Your Uploads** — Resources you upload show a delete button; demo/shared resources do not
- **Live Upload Count** — Each type button shows how many resources are in that category

---

## 🖥️ Preview

| Home Page | Resources Page |
|-----------|----------------|
| Upload form, type navigator, recent uploads with search | Sidebar filter by type, resource grid |

---

## 🗂️ Project Structure

```
student-resources/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Root component — state & page routing
    ├── App.css               # Global design system (fonts, colors, shared classes)
    ├── components/
    │   ├── ResourceCard.jsx  # Reusable card — view, delete, badge, timestamp
    │   └── ResourceCard.css
    └── pages/
        ├── HomePage.jsx      # Upload form + search + browse by type
        ├── HomePage.css
        ├── ResourcesPage.jsx # Sidebar type filter + resource grid
        └── ResourcesPage.css
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/student-resources.git

# Navigate into the project
cd student-resources

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder, ready to deploy on Vercel, Netlify, or GitHub Pages.

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| [React 18](https://react.dev/) | UI library |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [Syne](https://fonts.google.com/specimen/Syne) + [DM Sans](https://fonts.google.com/specimen/DM+Sans) | Typography |
| Browser File API (`URL.createObjectURL`) | In-browser file viewing |
| CSS Variables | Theming and design tokens |

No external UI libraries or state management packages — kept intentionally minimal.

---

## 📋 Resource Types Supported

| Type | Description |
|------|-------------|
| 📄 PDF | Lecture notes, reference material |
| 📊 PPT | Presentation slides |
| 📝 Doc | Word documents, assignments |
| 🗂️ Question Bank | Collection of practice questions |
| 📋 Question Papers | Previous year / mock exam papers |

---

## 🔑 Key Implementation Notes

**File Viewing** — uses `URL.createObjectURL()` to generate a temporary browser URL from the in-memory `File` object. PDFs and images render inline in the browser; other formats (PPT, DOCX) trigger a download. The URL is revoked after 10 seconds to free memory.

**Delete Permission** — each resource carries an `uploadedByMe` boolean. Resources uploaded in the current session have this set to `true` and show a delete button. Pre-loaded demo resources have it set to `false` and cannot be deleted — simulating a shared/read-only resource scenario.

**State Management** — all state lives in `App.jsx` and flows down via props. No Redux or Context API needed given the scope.

**No Persistence** — data resets on page refresh (no backend or localStorage). This is by design for simplicity; see the roadmap below for how to extend it.

---

## 🗺️ Roadmap / Possible Extensions

- [ ] Backend integration (Node/Express or Firebase) for persistent storage
- [ ] User authentication — link uploads to a real user account
- [ ] File preview modal (instead of opening a new tab)
- [ ] Download button alongside View
- [ ] Drag-and-drop file upload
- [ ] Subject/course tagging and filtering
- [ ] Dark mode toggle

---

## 📄 License

MIT — free to use, modify, and distribute.

---

> Built with React + Vite. Fonts from Google Fonts.
