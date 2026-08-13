"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TattooCarouselProps {
  images: string[];
}

export default function TattooCarousel({ images }: TattooCarouselProps) {
  const [offset, setOffset] = useState(0);
  const maxVisible = Math.min(3, images.length);
  const maxOffset = Math.max(0, images.length - maxVisible);

  const next = useCallback(() => {
    setOffset((o) => (o >= maxOffset ? 0 : o + 1));
  }, [maxOffset]);

  const prev = useCallback(() => {
    setOffset((o) => (o <= 0 ? maxOffset : o - 1));
  }, [maxOffset]);


  if (images.length === 0) return null;

  const visibleImages = images.slice(offset, offset + maxVisible);
  // If we wrap around near the end, pad with images from the start
  if (visibleImages.length < maxVisible) {
    visibleImages.push(...images.slice(0, maxVisible - visibleImages.length));
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginTop: "2rem",
      }}
    >
      {images.length > maxVisible && (
        <button
          onClick={prev}
          className="text-muted hover:text-foreground transition-colors cursor-pointer"
          aria-label="Previous"
          style={{ flexShrink: 0 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          overflow: "hidden",
        }}
      >
        {visibleImages.map((src, i) => (
          <div
            key={`${src}-${i}`}
            style={{
              width: "10rem",
              height: "10rem",
              borderRadius: "0.75rem",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src={src}
              alt="Tattoo work"
              width={112}
              height={112}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>

      {images.length > maxVisible && (
        <button
          onClick={next}
          className="text-muted hover:text-foreground transition-colors cursor-pointer"
          aria-label="Next"
          style={{ flexShrink: 0 }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
