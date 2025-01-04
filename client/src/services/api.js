import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // Backend URL

// Fetch all components
export const fetchComponents = async () => {
  return await axios.get(`${API_BASE_URL}/api/components/list-components`);
};

// Add a new component
export const addComponent = async (data) => {
  return await axios.post(
    `${API_BASE_URL}/api/components/register-component/`,
    data
  );
};

// Update an existing component
export const updateComponent = async (component_id, data) => {
  return await axios.patch(
    `${API_BASE_URL}/api/components/update-component/?component_id=${component_id}`,
    data
  );
};

// Delete a component
export const deleteComponent = async (component_id) => {
  return await axios.delete(
    `${API_BASE_URL}/api/components/delete-component/?component_id=${component_id}`
  );
};
