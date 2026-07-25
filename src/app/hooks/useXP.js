"use client";

import { useCallback, useEffect, useState } from "react";
import { xpLevels } from "../data/dashboardData";

const XP_KEY = "target95-xp";

function readXP() {
  try {
    const data = JSON.parse(localStorage.getItem(XP_KEY) || "{}");
    return {
      xp: Math.max(0, Number(data.xp) || 0),
      coins: Math.max(0, Number(data.coins) || 0),
    };
  } catch {
    return { xp: 0, coins: 0 };
  }
}

function saveXP(xp, coins) {
  try {
    localStorage.setItem(XP_KEY, JSON.stringify({ xp, coins }));
  } catch {
    // silently fail
  }
}

export default function useXP() {
  const [xp, setXP] = useState(0);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    const { xp: savedXP, coins: savedCoins } = readXP();
    setXP(savedXP);
    setCoins(savedCoins);
  }, []);

  const getLevel = useCallback(() => {
    let currentLevel = xpLevels[0];
    for (const level of xpLevels) {
      if (xp >= level.xpRequired) {
        currentLevel = level;
      }
    }
    return currentLevel;
  }, [xp]);

  const getNextLevel = useCallback(() => {
    const current = getLevel();
    const nextIndex = xpLevels.findIndex((l) => l.level === current.level) + 1;
    return nextIndex < xpLevels.length ? xpLevels[nextIndex] : null;
  }, [getLevel]);

  const getLevelProgress = useCallback(() => {
    const current = getLevel();
    const next = getNextLevel();
    if (!next) return 100;
    const range = next.xpRequired - current.xpRequired;
    const progress = xp - current.xpRequired;
    return Math.min(Math.round((progress / range) * 100), 100);
  }, [xp, getLevel, getNextLevel]);

  const addXP = useCallback((amount) => {
    const safeAmount = Math.max(0, Number(amount) || 0);
    setXP((prev) => {
      const newXP = prev + safeAmount;
      const { coins: currentCoins } = readXP();
      const newCoins = currentCoins + Math.floor(safeAmount / 10);
      saveXP(newXP, newCoins);
      setCoins(newCoins);
      return newXP;
    });
  }, []);

  const spendCoins = useCallback((amount) => {
    const safeAmount = Math.max(0, Number(amount) || 0);
    setCoins((prev) => {
      if (prev < safeAmount) return prev;
      const newCoins = prev - safeAmount;
      const { xp: currentXP } = readXP();
      saveXP(currentXP, newCoins);
      return newCoins;
    });
  }, []);

  return {
    xp,
    coins,
    level: getLevel(),
    nextLevel: getNextLevel(),
    levelProgress: getLevelProgress(),
    addXP,
    spendCoins,
  };
}