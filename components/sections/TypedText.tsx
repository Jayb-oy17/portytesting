'use client';

import { useEffect, useRef, useState } from 'react';

interface TypedTextProps {
  strings: string[];
  className?: string;
}

export default function TypedText({ strings, className = '' }: TypedTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const current = strings[index % strings.length];
    const speed = isDeleting ? 40 : 80;

    timerRef.current = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length === 0) {
          setIsDeleting(false);
          setIndex((i) => (i + 1) % strings.length);
        }
      }
    }, speed);

    return () => clearTimeout(timerRef.current);
  }, [displayed, isDeleting, index, strings]);

  return (
    <span className={className}>
      {displayed}
      <span className="typed-cursor" />
    </span>
  );
}
