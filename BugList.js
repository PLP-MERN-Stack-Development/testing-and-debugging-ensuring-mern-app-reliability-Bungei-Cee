// src/components/BugList.js
import React, { useEffect, useState } from "react";
import { getBugs, deleteBug } from "../api/bugApi";

const BugList = () => {
  const [bugs, setBugs] = useState([]);

  // Load all bugs from backend
  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    try {
      const data = await getBugs();
      setBugs(data);
    } catch (error) {
      console.error("Error fetching bugs:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await deleteBug(id);
      setBugs(bugs.filter((bug) => bug._id !== id));
    } catch (error) {
      console.error("Error deleting bug:", error);
    }
  };

  return (
    <div className="bug-list">
      <h2>🐞 Reported Bugs</h2>
      {bugs.length === 0 ? (
        <p>No bugs reported yet.</p>
      ) : (
        <ul>
          {bugs.map((bug) => (
            <li key={bug._id}>
              <strong>{bug.title}</strong> — {bug.description}  
              <span className="priority">[{bug.priority}]</span>  
              <button
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(bug._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BugList;
