// src/actions/getContainers.ts

import axios from 'axios';

export const getContainers = async () => {
  try {
    const response = await axios.get('/api/containers'); // Adjust the URL based on your API
    return response.data;
  } catch (error) {
    console.error('Error fetching containers:', error);
    throw error;
  }
};
