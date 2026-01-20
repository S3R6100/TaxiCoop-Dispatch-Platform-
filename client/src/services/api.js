import axios from "axios";
import { mockRides } from "../data/mockRides";
import { mockDrivers } from "../data/mockDrivers";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const apiClient = axios.create({
  baseURL: API_BASE, // API Gateway URL (Kong / Nginx)
  // In a real app, you'd configure headers for auth, etc.
});

// --- RIDES ---

// getRides supports optional client-side filters for the demo
export const getRides = async (opts = {}) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let results = [...mockRides];

  if (opts.status) {
    results = results.filter((r) => r.status === opts.status);
  }

  // date filtering can be added when mock data has dates
  // pagination (client-side)
  if (opts.page && opts.pageSize) {
    const start = (opts.page - 1) * opts.pageSize;
    results = results.slice(start, start + opts.pageSize);
  }

  return results;
};

export const getRideById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const ride = mockRides.find((r) => r.id === id);
  return ride;
};

// --- DRIVERS ---

// Simple in-memory driver list for demo purposes
export const getDrivers = async ({ page = 1, pageSize = 10 } = {}) => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const start = (page - 1) * pageSize;
  const results = mockDrivers.slice(start, start + pageSize);
  return { data: results, total: mockDrivers.length };
};

export const updateDriverStatus = async (driverId, status) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const idx = mockDrivers.findIndex((d) => d.id === driverId);
  if (idx === -1) throw new Error("Driver not found");
  mockDrivers[idx].status = status;
  return mockDrivers[idx];
};

export const createDriver = async (driver) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const id = `D${String(mockDrivers.length + 1).padStart(3, "0")}`;
  const newDriver = { id, ...driver };
  mockDrivers.push(newDriver);
  return newDriver;
};

export const deleteDriver = async (driverId) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const idx = mockDrivers.findIndex((d) => d.id === driverId);
  if (idx === -1) throw new Error("Driver not found");
  const removed = mockDrivers.splice(idx, 1)[0];
  return removed;
};

export default apiClient;
