import React from "react";

interface GoldDividerProps {
  /** Layout utilities (margins / width). Defaults to the common section rule. */
  className?: string;
}

/** Thin gold rule used between a section title and its body copy. */
export const GoldDivider: React.FC<GoldDividerProps> = ({
  className = "my-7 w-14",
}) => <div className={`h-px bg-[#d4af37]/40 ${className}`} />;
