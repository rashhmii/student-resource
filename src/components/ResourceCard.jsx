import "./ResourceCard.css";

const TYPE_ICONS = {
  PDF: "📄",
  PPT: "📊",
  Doc: "📝",
  "Question Bank": "🗂️",
  "Question Papers": "📋",
};

export default function ResourceCard({ resource, timeAgo }) {
  const typeKey = resource.type.replace(/\s+/g, "");

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
        <button className="card-view-btn">View</button>
      </div>
    </div>
  );
}
