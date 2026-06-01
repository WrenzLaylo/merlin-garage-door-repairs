import { Star } from "lucide-react";
import type { NetworkConfig } from "../../hooks/useNetworkConfig";
import ScrollReveal from "../ui/ScrollReveal";

export default function Testimonials({ config }: { config: NetworkConfig }) {
  return (
    <section id="testimonials" className="section bg-ink-soft/35">
      <div className="container-x">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">Reviews</span>
          <h2 className="h-section">Trusted by Melbourne homeowners.</h2>
          <p className="mt-3 text-slate-400">
            {config.stats.rating}/5 average rating from {config.stats.reviews}+ reviews.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {config.testimonials.map((review, index) => (
            <ScrollReveal key={`${review.name}-${review.suburb}`} delay={index * 0.05}>
              <article className="card h-full">
                <div className="flex gap-1 text-flame">
                  {Array.from({ length: review.rating }).map((_, starIndex) => (
                    <Star key={starIndex} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-5 text-sm text-slate-300">"{review.text}"</p>
                <div className="mt-6 text-sm">
                  <p className="font-semibold text-white">{review.name}</p>
                  <p className="text-slate-500">{review.suburb}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
