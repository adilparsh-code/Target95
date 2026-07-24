"use client";

import { useState, useEffect, useCallback } from "react";
import { collection, query, where, orderBy } from "firebase/firestore";
import { db, MockTestService, ResultService } from "@/lib/firestore/database";
import { COLLECTIONS } from "@/lib/firestore/collections";
import { useFirestoreQuery } from "./useFirestore";

export function useActiveMockTests() {
  const testsRef = collection(db, COLLECTIONS.MOCK_TESTS);
  const q = query(testsRef, where("isActive", "==", true), orderBy("scheduledDate", "asc"));

  const { data, loading, error, refresh } = useFirestoreQuery(q);

  return { mockTests: data, loading, error, refresh };
}

export function useUserMockTests(userId) {
  const resultsRef = collection(db, COLLECTIONS.RESULTS);
  const q = query(resultsRef, where("userId", "==", userId), orderBy("completedAt", "desc"));

  const { data, loading, error, refresh } = useFirestoreQuery(q);

  return { results: data, loading, error, refresh };
}

export const getUpcomingMockTests = async () => {
  try {
    const now = new Date();
    const q = query(
      collection(db, COLLECTIONS.MOCK_TESTS),
      where("isActive", "==", true),
      where("scheduledDate", ">=", now),
      orderBy("scheduledDate", "asc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching upcoming mock tests:", error);
    throw error;
  }
};

export const submitMockTestResult = async (resultData) => {
  try {
    const result = await ResultService.create({
      ...resultData,
      completedAt: serverTimestamp(),
    });
    return result;
  } catch (error) {
    console.error("Error submitting mock test result:", error);
    throw error;
  }
};