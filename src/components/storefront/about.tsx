import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-surface py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
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

        {/* Text */}
        <div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
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
        </div>
      </div>
    </section>
  );
}
