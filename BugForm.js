import React, { useState } from "react";
import { createBug } from "../api/bugApi";

const BugForm = ({ onBugAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please fill in all fields");
      return;
    }

    const newBug = { title, description, priority, status: "open" };

    try {
      await createBug(newBug);
      onBugAdded(); // refresh the bug list in parent
      setTitle("");
      setDescription("");
      setPriority("Low");
    } catch (error) {
      console.error("Error submitting bug:", error);
      alert("Failed to submit bug. Check your backend.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bug-form">
      <h2>Report a New Bug</h2>

      <input
        type="text"
        placeholder="Bug Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Bug Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button type="submit">Submit Bug</button>
    </form>
  );
};

export default BugForm;
