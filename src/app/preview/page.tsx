"use client";

import { OrbitCarousel } from "@/components/eval-previews/OrbitCarousel";
import { ShowreelPreview } from "@/components/eval-previews/ShowreelPreview";
import { DreamyGallery } from "@/components/eval-previews/DreamyGallery";
import "@/components/eval-previews/eval-previews.css";

const PRODUCT_IMAGES = Array.from({ length: 8 }, (_, i) => ({
  title: `Product ${i + 1}`,
  src: `https://picsum.photos/seed/sneaker${i + 1}/400/400`,
}));

const SHOWREEL_VIDEOS = [
  { title: "Video 30", src: "/media/showreel/01-video-30.mp4" },
  { title: "1020", src: "/media/showreel/03-1020-1-.mp4" },
  { title: "Adidas Enhanced", src: "/media/showreel/04-adidas-enhanced.mp4" },
  { title: "Breakfast With Big Cats", src: "/media/showreel/Breakfast_with_Big_Cats_1.mp4" },
  { title: "Puma Enhanced", src: "/media/showreel/06-puma-enhanced.mp4" },
  { title: "Video 10", src: "/media/showreel/07-video-10-kopie.mp4" },
];

const DREAMY_PHOTOS = Array.from({ length: 5 }, (_, i) => ({
  title: `Photo ${i + 1}`,
  src: `https://picsum.photos/seed/dreamy${i + 1}/600/800`,
}));

export default function PreviewPage() {
  return (
    <main style={{ background: "#090909", minHeight: "100vh" }}>
      <div style={{ padding: "2rem", textAlign: "center", borderBottom: "1px solid #2a2a2a" }}>
        <h1 style={{ color: "#f0f0f0", fontSize: "1.6rem", margin: 0 }}>
          Orbit Carousel — Skill Eval Preview
        </h1>
        <p style={{ color: "#888", fontSize: "0.8rem", marginTop: "0.5rem" }}>
          3 test cases rendered live. Drag to interact.
        </p>
      </div>

      <div className="preview-grid">
        <section className="preview-section">
          <h2>Eval 0: Product Images Orbit</h2>
          <p>8 images, auto-rotation, drag to spin</p>
          <OrbitCarousel items={PRODUCT_IMAGES} />
        </section>

        <section className="preview-section">
          <h2>Eval 1: Dreamy Drag-Only</h2>
          <p>5 photos, no auto-rotation, loose spring</p>
          <DreamyGallery items={DREAMY_PHOTOS} />
        </section>

        <section className="preview-section preview-section--full">
          <h2>Eval 2: Video Showreel + Focus</h2>
          <p>6 videos, click to select, focus player below</p>
          <ShowreelPreview items={SHOWREEL_VIDEOS} />
        </section>
      </div>
    </main>
  );
}
