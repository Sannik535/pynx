"use client";

import { useEffect, useState } from "react";

function formatTime(totalSeconds: number) {
  const clamped = Math.max(totalSeconds, 0);
  const hours = Math.floor(clamped / 3600);
  const minutes = Math.floor((clamped % 3600) / 60);
  const seconds = clamped % 60;

  const pad = (value: number) => value.toString().padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function FlashDealsCountdown({
  endsInSeconds,
}: {
  endsInSeconds: number;
}) {
  const [secondsLeft, setSecondsLeft] = useState(endsInSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm font-medium text-rose-500">
      <ClockIcon />
      <span>Ends in: {formatTime(secondsLeft)}</span>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}