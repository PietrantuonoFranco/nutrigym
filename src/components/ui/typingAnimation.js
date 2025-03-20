"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

export function TypingAnimation({
  children,
  className,
  duration = 100,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  ...props
}) {
  const MotionComponent = motion.create(Component); // Uso de motion.create() en lugar de motion()

  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef(null);
  const observerRef = useRef(null);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const startTyping = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setStarted(true);
    }, delay);
  }, [delay]);

  useEffect(() => {
    if (!startOnView) {
      startTyping();
      return () => clearTimeout(timeoutRef.current);
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTyping();
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
      clearTimeout(timeoutRef.current);
    };
  }, [delay, startOnView, startTyping]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    intervalRef.current = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(prev => children.substring(0, prev.length + 1));
        i++;
      } else {
        clearInterval(intervalRef.current);
      }
    }, duration);

    return () => clearInterval(intervalRef.current);
  }, [children, duration, started]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn(
        "text-4xl font-bold leading-[5rem] tracking-[-0.02em]",
        className
      )}
      {...props}
    >
      {displayedText}
    </MotionComponent>
  );
}
