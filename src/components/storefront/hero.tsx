import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[80vh] min-h-150 flex items-center justify-center overflow-hidden bg-linear-to-br from-background via-surface to-background">
      <Image
        src="/hero.png"
        alt="Tattoo art prints"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/75" />
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h1
          className="font-heading text-5xl md:text-7xl font-thin tracking-tight mb-6"
          style={{ animation: "breathe 5s ease-in-out infinite, flicker 3s step-end infinite" }}
        >
          Art That Lives
          <br />
          <span className="text-accent">Beyond the Skin</span>
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-xl mx-auto">
          Original tattoo art prints — designed by hand, made for your walls.
        </p>
        <a
          href="#collection"
          className="inline-flex px-8 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-all duration-300 text-lg hero-glow-btn"
        >
          Shop the Collection
        </a>
      </div>
    </section>
  );
}
