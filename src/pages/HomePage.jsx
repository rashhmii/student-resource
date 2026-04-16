import { useState, useRef } from "react";
import ResourceCard from "../components/ResourceCard";
import "./HomePage.css";

const RESOURCE_TYPES = ["PDF", "PPT", "Doc", "Question Bank", "Question Papers"];

const TYPE_ICONS = {
  PDF: "📄",
  PPT: "📊",
  Doc: "📝",
  "Question Bank": "🗂️",
  "Question Papers": "📋",
};

const NAV_TYPES = ["PPT", "PDF", "Doc", "Question Bank", "Question Papers"];

function timeAgo(date) {
  const diff = (Date.now() - new Date(date).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function HomePage({ resources, onAddResource, onNavigate, onDelete }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("PDF");
  const [file, setFile] = useState(null);
  const [search, setSearch] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const fileRef = useRef();

  function handleUpload(e) {
    e.preventDefault();
    if (!title.trim() || !file) return;
    onAddResource({
      title: title.trim(),
      type,
      uploadedAt: new Date(),
      fileName: file.name,
      fileObject: file,
    });
    setTitle("");
    setFile(null);
    setType("PDF");
    fileRef.current.value = "";
    setUploaded(true);
    setTimeout(() => setUploaded(false), 3000);
  }

  const filtered = resources.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home">
      {/* Header */}
      <header className="home-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">StudyVault</span>
          </div>
          <p className="header-tagline">Upload. Discover. Learn.</p>
        </div>
      </header>

      <div className="home-body">
        {/* Upload Card */}
        <section className="upload-section">
          <div className="section-label">Upload a Resource</div>
          <form className="upload-form" onSubmit={handleUpload}>
            <div className="form-row">
              <div className="form-group">
                <label>Resource Title</label>
                <input
                  type="text"
                  placeholder="e.g. Chapter 3 Notes"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group form-group-sm">
                <label>Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  {RESOURCE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {TYPE_ICONS[t]} {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="file-drop-area">
              <input
                ref={fileRef}
                type="file"
                id="file-input"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
              <label htmlFor="file-input" className="file-drop-label">
                {file ? (
                  <span className="file-chosen">
                    <span className="file-chosen-icon">✅</span>
                    <span>{file.name}</span>
                  </span>
                ) : (
                  <span className="file-placeholder">
                    <span className="file-icon">📁</span>
                    <span>Click to choose a file</span>
                    <span className="file-hint">PDF, PPT, DOC, DOCX and more</span>
                  </span>
                )}
              </label>
            </div>

            <div className="form-footer">
              {uploaded && (
                <span className="success-msg">✅ Resource uploaded successfully!</span>
              )}
              <button
                type="submit"
                className="btn btn-primary upload-btn"
                disabled={!title.trim() || !file}
              >
                Upload Resource →
              </button>
            </div>
          </form>
        </section>

        {/* Browse by Type */}
        <section className="browse-section">
          <div className="section-label">Browse by Type</div>
          <div className="type-nav">
            {NAV_TYPES.map((t) => (
              <button
                key={t}
                className={`type-nav-btn type-nav-${t.replace(/\s+/g, "")}`}
                onClick={() => onNavigate(t)}
              >
                <span className="type-nav-icon">{TYPE_ICONS[t]}</span>
                <span>{t}</span>
                <span className="type-nav-count">
                  {resources.filter((r) => r.type === t).length}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Recent Resources */}
        <section className="recent-section">
          <div className="recent-header">
            <div className="section-label">Recent Resources</div>
            <div className="search-wrap">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search by title or type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className="search-clear" onClick={() => setSearch("")}>
                  ✕
                </button>
              )}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <span>🔍</span>
              <p>No resources found{search ? ` for "${search}"` : ""}.</p>
            </div>
          ) : (
            <div className="resource-grid">
              {filtered.map((r) => (
                <ResourceCard key={r.id} resource={r} timeAgo={timeAgo} onDelete={onDelete} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
