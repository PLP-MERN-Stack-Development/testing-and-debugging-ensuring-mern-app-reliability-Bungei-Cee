import axios from "axios";

const API_URL = "http://localhost:5000/api/bugs";

// Get all bugs
export const getBugs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new bug
export const createBug = async (bugData) => {
  const response = await axios.post(API_URL, bugData);
  return response.data;
};

// Delete a bug
export const deleteBug = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
