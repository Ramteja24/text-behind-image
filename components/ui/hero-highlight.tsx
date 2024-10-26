"use client";
import { cn } from "@/lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React from "react";

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div
      className={cn(
        "relative h-[12rem] flex items-center bg-gradient-to-r from-gray-100 via-white to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 justify-center w-full group shadow-lg rounded-lg overflow-hidden",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800 pointer-events-none" />
      <motion.div
        className="pointer-events-none bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 absolute inset-0 opacity-0 transition duration-500 ease-in-out group-hover:opacity-100 rounded-lg shadow-2xl"
        style={{
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />
      <div className={cn("relative z-20", className)}>{children}</div>
    </div>
  );
};

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 1.8,
        ease: "easeInOut",
        delay: 0.3,
      }}
      style={{
        backgroundImage: "linear-gradient(to right, #6366f1, #ec4899)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline-block",
      }}
      className={cn(
        `relative inline-block pb-1 px-2 rounded-md bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900 shadow-md`,
        className
      )}
    >
      {children}
    </motion.span>
  );
};
