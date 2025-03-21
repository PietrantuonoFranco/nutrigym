"use client";;
import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState("TOP");

  const rotateDirection = currentDirection => {
    const directions = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap = {
    TOP: "radial-gradient(30% 70% at 50% 0%, rgb(249, 115, 22) 0%, rgba(249, 115, 22, 0) 100%)",
    LEFT: "radial-gradient(25% 60% at 0% 50%, rgb(249, 115, 22) 0%, rgba(249, 115, 22, 0) 100%)",
    BOTTOM: "radial-gradient(30% 70% at 50% 100%, rgb(249, 115, 22) 0%, rgba(249, 115, 22, 0) 100%)",
    RIGHT: "radial-gradient(25% 60% at 100% 50%, rgb(249, 115, 22) 0%, rgba(249, 115, 22, 0) 100%)",
  };

  const highlight =
    "radial-gradient(100% 200% at 50% 50%, rgb(249, 115, 22) 0%, rgba(249, 115, 22, 0.8) 100%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered]);
  return (
    (<Tag
      onMouseEnter={(event) => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border  content-center bg-white hover:bg-neutral-100 transition duration-500 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit",
        containerClassName
      )}
      {...props}>
      <div
        className={cn("w-auto text-black z-10 bg-white px-4 py-2 rounded-[inherit]", className)}>
        {children}
      </div>
      <motion.div
        className={cn("flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]")}
        style={{
          filter: "blur(4px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }} />
      <div className="bg-white absolute z-1 flex-none inset-[2px] rounded-[100px]" />
    </Tag>)
  );
}
