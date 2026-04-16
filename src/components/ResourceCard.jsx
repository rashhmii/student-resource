import "./ResourceCard.css";

const TYPE_ICONS = {
  PDF: "📄",
  PPT: "📊",
  Doc: "📝",
  "Question Bank": "🗂️",
  "Question Papers": "📋",
};

export default function ResourceCard({ resource, timeAgo, onDelete }) {
  const typeKey = resource.type.replace(/\s+/g, "");

  function handleView() {
    if (!resource.fileObject) return;
    const url = URL.createObjectURL(resource.fileObject);
    window.open(url, "_blank");
    // Revoke after a short delay so the new tab has time to load it
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }

  function handleDelete() {
    if (window.confirm(`Delete "${resource.title}"?`)) {
      onDelete(resource.id);
    }
  }

  return (
    <div className="resource-card">
      <div className="card-top">
        <span className="card-icon">{TYPE_ICONS[resource.type] || "📁"}</span>
        <span className={`type-badge type-${typeKey}`}>{resource.type}</span>
      </div>
      <h3 className="card-title">{resource.title}</h3>
      {resource.fileName && (
        <p className="card-filename">{resource.fileName}</p>
      )}
      <div className="card-footer">
        <span className="card-time">🕐 {timeAgo(resource.uploadedAt)}</span>
        <div className="card-actions">
          {resource.fileObject ? (
            <button className="card-download-btn" onClick={handleView}>
              Download
            </button>
          ) : (
            <span className="card-no-file" title="No file stored for demo resources">
             
            </span>
          )}
          {resource.uploadedByMe && (
            <button className="card-delete-btn" onClick={handleDelete} title="Delete resource">
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
