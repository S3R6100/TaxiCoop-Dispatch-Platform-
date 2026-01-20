import axios from 'axios';
import { mockRides } from '../data/mockRides';

const apiClient = axios.create({
  baseURL: 'https://api.taxicoop.com', // This should be your API Gateway URL
  // In a real app, you'd configure headers for auth, etc.
});

// --- RIDES ---

export const getRides = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would be:
  // const response = await apiClient.get('/rides');
  // return response.data;

  // For now, return mock data
  return mockRides;
};

export const getRideById = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const ride = mockRides.find(r => r.id === id);
    return ride;
}


// --- DRIVERS ---
// Placeholder functions for drivers

export const getDrivers = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Replace with real API call
    return []; 
}

export const updateDriverStatus = async (driverId, status) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    // Replace with real API call:
    // const response = await apiClient.patch(`/drivers/${driverId}`, { status });
    // return response.data;
    console.log(`Driver ${driverId} status updated to ${status}`);
    return { id: driverId, status };
}

export default apiClient;
