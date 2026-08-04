"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function AnimatedCounter({ end, suffix = "", duration = 2000, startOnView = true }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  const animate = useCallback((targetEnd) => {
    if (hasAnimated) return;
    setHasAnimated(true);

    let startTime;
    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // Use easeOutQuart for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * targetEnd));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(targetEnd);
      }
    };
    requestAnimationFrame(step);
  }, [duration, hasAnimated]);

  useEffect(() => {
    // If startOnView is false, animate immediately
    if (!startOnView) {
      animate(end);
      return;
    }

    // Use IntersectionObserver with ref for reliable detection
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(end);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [end, startOnView, animate, duration]);

  // Fallback: ensure counter reaches target value even if observer never fires
  useEffect(() => {
    if (!startOnView && !hasAnimated) {
      const fallback = setTimeout(() => {
        if (!hasAnimated) {
          setCount(end);
          setHasAnimated(true);
        }
      }, duration + 500);
      return () => clearTimeout(fallback);
    }
  }, [end, startOnView, hasAnimated, duration]);

  return (
    <span ref={elementRef} className="font-extrabold">
      {count.toLocaleString()}{suffix}
    </span>
  );
}
