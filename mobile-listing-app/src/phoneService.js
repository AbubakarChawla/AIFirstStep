import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/phones'; // Change to your backend API URL

// Get all phones
export const getPhones = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching phones:', error);
  }
};

// Add a new phone
export const addPhone = async (formData) => {
  try {
    const response = await fetch('http://localhost:5000/api/phones', {
      method: 'POST',
      body: formData, // Send form data including the image file
    });
    if (!response.ok) {
      throw new Error('Failed to add phone');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Update a phone
export const updatePhone = async (id, phone) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, phone);
    return response.data;
  } catch (error) {
    console.error('Error updating phone:', error);
  }
};

// Delete a phone
export const deletePhone = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting phone:', error);
  }
};
