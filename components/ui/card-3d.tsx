"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  title: string;
  description?: string;
  link?: string | null;
}

export function Card3D({ className, imageUrl, title, link, ...props }: Card3DProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [style, setStyle] = React.useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = ((y - height / 2) / (height / 2)) * -18;
    const rotateY = ((x - width / 2) / (width / 2)) * 18;
    setStyle({
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: "transform 0.08s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s ease-in-out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={cn(
        "relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)]",
        className
      )}
      {...props}
    >
      <img
        src={imageUrl || "https://placehold.co/800x600/0A0A0F/ffffff?text=No+Image"}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transform: "scale(1.08)" }}
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <div
        className="absolute inset-0 p-5 flex flex-col justify-end"
        style={{ transform: "translateZ(50px)" }}
      >
        <h3 className="text-lg font-bold text-white tracking-tight leading-tight">{title}</h3>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#a89dff] hover:text-white transition-colors"
          >
            View →
          </a>
        )}
      </div>
    </div>
  );
}
