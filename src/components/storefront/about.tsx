import Image from "next/image";
import fs from "fs";
import path from "path";
import TattooCarousel from "./tattoo-carousel";

function getTattooWorks(): string[] {
  const dir = path.join(process.cwd(), "public", "tatoo-works");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort()
    .map((f) => `/tatoo-works/${f}`);
}

function pickRandom(arr: string[], count: number): string[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function About() {
  const tattooWorks = getTattooWorks();
  const bgImages = pickRandom(tattooWorks, 3);

  return (
    <section
      id="about"
      className="scroll-mt-20 py-20 px-4 sm:px-6 lg:px-8"
      style={{ position: "relative", overflow: "hidden", background: "var(--surface)" }}
    >
      {/* Background collage */}
      {bgImages.length > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            opacity: 0.06,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          {bgImages.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ))}
        </div>
      )}

      <div style={{ position: "relative" }} className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Artist photo */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-background">
          <Image
            src="/portrait.jpg"
            alt="The artist"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Text + tattoo work carousel */}
        <div>
          <h2 className="font-heading text-3xl md:text-4xl  mb-6">
            About the Artist
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              With years of experience in the tattoo industry, every design starts as a
              hand-drawn piece of art. Each print captures the raw energy and detail of
              original tattoo artwork.
            </p>
            <p>
              These prints bring tattoo art off the skin and onto your walls — bold lines,
              intricate details, and designs that tell a story.
            </p>
            <p>
              Every piece is printed on premium archival paper to ensure lasting quality
              and vivid detail.
            </p>
          </div>

          <TattooCarousel images={tattooWorks} />
        </div>
      </div>
    </section>
  );
}
