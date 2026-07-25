"use client";

import { useCallback, useEffect, useState } from "react";
import { sampleNotifications } from "../components/notifications/NotificationData";

const NOTIFICATION_KEY = "target95-notifications";

function readNotifications() {
  try {
    const data = localStorage.getItem(NOTIFICATION_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    return sampleNotifications;
  } catch {
    return sampleNotifications;
  }
}

function saveNotifications(notifications) {
  try {
    localStorage.setItem(NOTIFICATION_KEY, JSON.stringify(notifications));
  } catch {
    // silently fail
  }
}

export default function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setNotifications(readNotifications());
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback((id) => {
    setNotifications((prev) => {
      const next = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      saveNotifications(next);
      return next;
    });
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => {
      const next = prev.map((n) => ({ ...n, read: true }));
      saveNotifications(next);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
    saveNotifications([]);
  }, []);

  return {
    notifications,
    unreadCount,
    isOpen,
    setIsOpen,
    markAsRead,
    markAllAsRead,
    clearAll,
  };
}