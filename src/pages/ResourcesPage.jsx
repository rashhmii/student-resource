import ResourceCard from "../components/ResourceCard";
import "./ResourcesPage.css";

const NAV_TYPES = ["PPT", "PDF", "Doc", "Question Bank", "Question Papers"];

const TYPE_ICONS = {
  PDF: "📄",
  PPT: "📊",
  Doc: "📝",
  "Question Bank": "🗂️",
  "Question Papers": "📋",
};

function timeAgo(date) {
  const diff = (Date.now() - new Date(date).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function ResourcesPage({ resources, activeType, setActiveType, onGoHome }) {
  const filtered = activeType
    ? resources.filter((r) => r.type === activeType)
    : resources;

  return (
    <div className="resources-page">
      {/* Header */}
      <header className="res-header">
        <div className="res-header-inner">
          <button className="back-btn" onClick={onGoHome}>
            ← Back to Home
          </button>
          <div className="res-logo">
            <span>⚡</span>
            <span>StudyVault</span>
          </div>
        </div>
      </header>

      <div className="res-body">
        {/* Sidebar */}
        <aside className="res-sidebar">
          <div className="sidebar-label">Resource Types</div>
          <nav className="sidebar-nav">
            <button
              className={`sidebar-btn ${!activeType ? "active" : ""}`}
              onClick={() => setActiveType(null)}
            >
              <span>📚</span>
              <span>All Resources</span>
              <span className="sidebar-count">{resources.length}</span>
            </button>
            {NAV_TYPES.map((t) => (
              <button
                key={t}
                className={`sidebar-btn ${activeType === t ? "active" : ""}`}
                onClick={() => setActiveType(t)}
              >
                <span>{TYPE_ICONS[t]}</span>
                <span>{t}</span>
                <span className="sidebar-count">
                  {resources.filter((r) => r.type === t).length}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="res-main">
          <div className="res-main-header">
            <h2 className="res-title">
              {activeType ? (
                <>
                  {TYPE_ICONS[activeType]} {activeType}
                </>
              ) : (
                "📚 All Resources"
              )}
            </h2>
            <span className="res-count">
              {filtered.length} {filtered.length === 1 ? "resource" : "resources"}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="res-empty">
              <span>📭</span>
              <p>No {activeType} resources yet.</p>
              <button className="btn btn-ghost" onClick={onGoHome}>
                Upload one →
              </button>
            </div>
          ) : (
            <div className="res-grid">
              {filtered.map((r) => (
                <ResourceCard key={r.id} resource={r} timeAgo={timeAgo} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
