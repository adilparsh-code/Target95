"use client";

import { useCallback, useState } from "react";
import useFirestore from "./useFirestore";

export default function useMockTests() {
  const { loading, error, getCollection, getDocument, queryDocuments, addDocument, updateDocument, deleteDocument, subscribeToCollection } = useFirestore();
  const [mockTests, setMockTests] = useState([]);
  const [currentTest, setCurrentTest] = useState(null);
  const [testHistory, setTestHistory] = useState([]);

  // Fetch all mock tests
  const fetchAllMockTests = useCallback(async () => {
    try {
      const data = await getCollection("mockTests");
      setMockTests(data);
      return data;
    } catch (err) {
      console.error("Error fetching mock tests:", err);
      throw err;
    }
  }, [getCollection]);

  // Fetch active mock tests
  const fetchActiveMockTests = useCallback(async () => {
    try {
      const data = await queryDocuments("mockTests", [
        { field: "isActive", operator: "==", value: true }
      ]);
      setMockTests(data);
      return data;
    } catch (err) {
      console.error("Error fetching active mock tests:", err);
      throw err;
    }
  }, [queryDocuments]);

  // Fetch a single mock test by ID
  const fetchMockTestById = useCallback(async (testId) => {
    try {
      const data = await getDocument("mockTests", testId);
      setCurrentTest(data);
      return data;
    } catch (err) {
      console.error("Error fetching mock test:", err);
      throw err;
    }
  }, [getDocument]);

  // Add a new mock test
  const addMockTest = useCallback(async (testData) => {
    try {
      const newTest = await addDocument("mockTests", {
        ...testData,
        isActive: true,
        createdAt: new Date().toISOString()
      });
      setMockTests(prev => [...prev, newTest]);
      return newTest;
    } catch (err) {
      console.error("Error adding mock test:", err);
      throw err;
    }
  }, [addDocument]);

  // Update a mock test
  const updateMockTest = useCallback(async (testId, testData) => {
    try {
      const updatedTest = await updateDocument("mockTests", testId, testData);
      setMockTests(prev => prev.map(t => t.id === testId ? { ...t, ...testData } : t));
      return updatedTest;
    } catch (err) {
      console.error("Error updating mock test:", err);
      throw err;
    }
  }, [updateDocument]);

  // Delete a mock test
  const deleteMockTest = useCallback(async (testId) => {
    try {
      await deleteDocument("mockTests", testId);
      setMockTests(prev => prev.filter(t => t.id !== testId));
      return true;
    } catch (err) {
      console.error("Error deleting mock test:", err);
      throw err;
    }
  }, [deleteDocument]);

  // Save test result
  const saveTestResult = useCallback(async (resultData) => {
    try {
      const result = await addDocument("mockTestResults", {
        ...resultData,
        completedAt: new Date().toISOString()
      });
      setTestHistory(prev => [result, ...prev].slice(0, 10));
      return result;
    } catch (err) {
      console.error("Error saving test result:", err);
      throw err;
    }
  }, [addDocument]);

  // Fetch user's test history
  const fetchUserTestHistory = useCallback(async (userId) => {
    try {
      const data = await queryDocuments("mockTestResults", [
        { field: "userId", operator: "==", value: userId }
      ]);
      setTestHistory(data.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt)));
      return data;
    } catch (err) {
      console.error("Error fetching test history:", err);
      throw err;
    }
  }, [queryDocuments]);

  // Subscribe to realtime updates for mock tests
  const subscribeToMockTests = useCallback((callback) => {
    try {
      return subscribeToCollection("mockTests", (data) => {
        setMockTests(data);
        if (callback) callback(data);
      });
    } catch (err) {
      console.error("Error subscribing to mock tests:", err);
      throw err;
    }
  }, [subscribeToCollection]);

  return {
    loading,
    error,
    mockTests,
    currentTest,
    testHistory,
    fetchAllMockTests,
    fetchActiveMockTests,
    fetchMockTestById,
    addMockTest,
    updateMockTest,
    deleteMockTest,
    saveTestResult,
    fetchUserTestHistory,
    subscribeToMockTests
  };
}