import { ExternalLink, Star } from "lucide-react";
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
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {review.avatar ? (
                      <img
                        src={review.avatar}
                        alt=""
                        className="h-12 w-12 rounded-2xl object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal/10 text-sm font-bold text-teal-light">
                        {review.name.slice(0, 1)}
                      </span>
                    )}
                    <div>
                      <p className="font-semibold text-white">{review.name}</p>
                      <p className="text-sm text-slate-500">{review.suburb}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 text-flame" aria-label={`${review.rating} stars`}>
                    {Array.from({ length: review.rating }).map((_, starIndex) => (
                      <Star key={starIndex} size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="mt-5 text-sm text-slate-300">"{review.text}"</p>
                {review.sourceUrl ? (
                  <a
                    href={review.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-light transition hover:text-white"
                  >
                    Read on {review.sourceLabel ?? "review source"} <ExternalLink size={15} />
                  </a>
                ) : null}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
