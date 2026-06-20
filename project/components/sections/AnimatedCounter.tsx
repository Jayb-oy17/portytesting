'use client';

import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  value: string;
  label: string;
  delay?: number;
}

export function AnimatedCounter({ value, label, delay = 0 }: CounterProps) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const numericValue = parseInt(value.replace(/\D/g, ''), 10);
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      let start = 0;
      const step = Math.ceil(numericValue / 60);
      const interval = setInterval(() => {
        start += step;
        if (start >= numericValue) {
          setCount(numericValue);
          clearInterval(interval);
        } else {
          setCount(start);
        }
      }, 20);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [visible, numericValue, delay]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold gradient-text mb-1">
        {count}{suffix}
      </div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
    </div>
  );
}
