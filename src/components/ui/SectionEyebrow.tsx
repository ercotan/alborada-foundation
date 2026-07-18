import React from "react";

interface SectionEyebrowProps {
  className?: string;
  children: React.ReactNode;
}

/** Small gold uppercase label that sits above a section title. */
export const SectionEyebrow: React.FC<SectionEyebrowProps> = ({
  className,
  children,
}) => (
  <span
    className={`text-[10px] uppercase tracking-[0.42em] text-[#d4af37]${
      className ? ` ${className}` : ""
    }`}
  >
    {children}
  </span>
);
