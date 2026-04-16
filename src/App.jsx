import { useState } from "react";
import HomePage from "./pages/HomePage";
import ResourcesPage from "./pages/ResourcesPage";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home"); // "home" | "resources"
  const [activeType, setActiveType] = useState(null);
  const [resources, setResources] = useState([
    {
      id: 1,
      title: "Data Structures Notes",
      type: "PDF",
      uploadedAt: new Date(Date.now() - 3600000 * 2),
    },
    {
      id: 2,
      title: "OS Concepts Slides",
      type: "PPT",
      uploadedAt: new Date(Date.now() - 3600000 * 5),
    },
    {
      id: 3,
      title: "DBMS Assignment",
      type: "Doc",
      uploadedAt: new Date(Date.now() - 3600000 * 10),
    },
  ]);

  function addResource(resource) {
    setResources((prev) => [{ ...resource, id: Date.now() }, ...prev]);
  }

  function navigateTo(type) {
    setActiveType(type);
    setPage("resources");
  }

  function goHome() {
    setPage("home");
    setActiveType(null);
  }

  return (
    <div className="app">
      {page === "home" ? (
        <HomePage
          resources={resources}
          onAddResource={addResource}
          onNavigate={navigateTo}
        />
      ) : (
        <ResourcesPage
          resources={resources}
          activeType={activeType}
          setActiveType={setActiveType}
          onGoHome={goHome}
        />
      )}
    </div>
  );
}
