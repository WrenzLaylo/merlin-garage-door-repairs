import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export default function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);

  // Use decimals prop — Math.round was forcing 4.9 → 5
  const rounded = useTransform(count, (latest) =>
    decimals > 0
      ? latest.toFixed(decimals)
      : Math.round(latest).toLocaleString()
  );

  const displayRef = useRef<HTMLSpanElement | null>(null);

  useEffect(
    () =>
      rounded.on("change", (v) => {
        if (displayRef.current) displayRef.current.textContent = v;
      }),
    [rounded]
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration: 1.2, ease: "easeOut" });
    return controls.stop;
  }, [count, inView, value]);

  return (
    <span ref={ref}>
      <span ref={displayRef}>0</span>
      {suffix}
    </span>
  );
}
