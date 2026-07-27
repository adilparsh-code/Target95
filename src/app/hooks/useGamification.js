"use client";

import { useEffect, useMemo, useState } from "react";
import useXP from "./useXP";
import usePersonalizedRoadmap from "./usePersonalizedRoadmap";
import { BADGES, XP_REWARDS, getDailyChallenge, getMotivationMessages, getNextChallengeCountdown } from "@/lib/gamification";

const CHALLENGE_KEY = "target95-daily-challenge";
const LOGIN_KEY = "target95-daily-login";

export default function useGamification() {
  const xpState = useXP();
  const roadmap = usePersonalizedRoadmap();
  const [challengeComplete, setChallengeComplete] = useState(false);
  const [countdown, setCountdown] = useState("");
  const challenge = useMemo(() => getDailyChallenge(), []);

  useEffect(() => {
    const saved = localStorage.getItem(CHALLENGE_KEY);
    setChallengeComplete(saved === challenge.id);
    const updateCountdown = () => setCountdown(getNextChallengeCountdown());
    updateCountdown();
    const timer = window.setInterval(updateCountdown, 60000);
    return () => window.clearInterval(timer);
  }, [challenge.id]);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    if (localStorage.getItem(LOGIN_KEY) !== today) {
      xpState.addXP(XP_REWARDS.dailyLogin);
      localStorage.setItem(LOGIN_KEY, today);
    }
  }, [xpState.addXP]);

  const completeChallenge = () => {
    if (challengeComplete) return;
    xpState.addXP(challenge.reward);
    localStorage.setItem(CHALLENGE_KEY, challenge.id);
    setChallengeComplete(true);
  };

  const completedChapters = roadmap.stats.completed;
  const badgeData = { solved: roadmap.stats.solved, completedChapters, streak: roadmap.stats.currentStreak, perfectMock: roadmap.mockTests.some((test) => test.percentage === 100), challengeComplete };
  const badges = BADGES.map((badge) => ({ ...badge, unlocked: badge.condition(badgeData) }));
  const questionsToNext = Math.max(0, 10 - (roadmap.stats.solved % 10 || 10));
  const motivation = getMotivationMessages({ xpToNext: xpState.nextLevel ? xpState.nextLevel.xpRequired - xpState.xp : 0, questionsToNext, challengeComplete, chapterRemaining: roadmap.currentChapter?.remaining || 0 });

  return { ...xpState, challenge, challengeComplete, countdown, completeChallenge, badges, motivation, stats: roadmap.stats, recentRewards: [{ id: "login", title: "Daily login", xp: XP_REWARDS.dailyLogin }, ...(challengeComplete ? [{ id: challenge.id, title: "Daily challenge", xp: challenge.reward }] : [])] };
}
