import React from "react";
import discussionsData from "./data/discussions.json";

export default function Discussions({ onSelectDiscussion }) {
  return (
    <div style={{ padding: "20px", width: "250px", borderRight: "1px solid #ccc" }}>
      <h2 style={{ color: "white" }}>Vos Discussions</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {discussionsData.discussions.map((discussion) => (
          <li
            key={discussion.id}
            style={{
              padding: "10px",
              margin: "10px 0",
              border: "1px solid #ccc",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: "#f8f9fa",
              color: "black", // Correction ici
              fontWeight: "bold",
              textAlign: "center"
            }}
            onClick={() => onSelectDiscussion(discussion)}
          >
            {discussion.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
