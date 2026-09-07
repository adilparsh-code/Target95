"use client";

import { useEffect } from "react";

const getLevel = (lux) => {
  if (!Number.isFinite(lux)) return "unknown";
  if (lux < 15) return "low";
  if (lux > 500) return "bright";
  return "normal";
};

export default function AdaptiveLight() {
  useEffect(() => {
    let sensor;
    let disposed = false;

    const apply = (lux) => {
      if (disposed) return;
      document.documentElement.dataset.ambientLight = getLevel(lux);
    };

    const cleanup = () => {
      sensor?.removeEventListener?.("reading", handleReading);
      sensor?.stop?.();
      sensor = undefined;
    };

    const handleReading = () => apply(sensor?.illuminance);

    const start = async () => {
      if (typeof window === "undefined" || !("AmbientLightSensor" in window)) return;

      try {
        sensor = new window.AmbientLightSensor({ frequency: 1 });
        sensor.addEventListener("reading", handleReading);
        sensor.addEventListener("error", cleanup, { once: true });
        sensor.start();
      } catch {
        cleanup();
      }
    };

    start();
    return () => {
      disposed = true;
      cleanup();
      delete document.documentElement.dataset.ambientLight;
    };
  }, []);

  return null;
}
