import { ExternalLink, Star } from "lucide-react";
import type { NetworkConfig } from "../../hooks/useNetworkConfig";
import ScrollReveal from "../ui/ScrollReveal";

const WOMO_URL = "https://www.wordofmouth.com.au/reviews/agg-doors-hallam";

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-flame" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill="currentColor" />
      ))}
    </div>
  );
}

export default function Testimonials({ config }: { config: NetworkConfig }) {
  return (
    <section id="testimonials" className="section bg-ink-soft/35">
      <div className="container-x">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">Real Reviews</span>
          <h2 className="h-section">Trusted by Melbourne homeowners.</h2>
          <p className="mt-3 text-slate-400">
            Every review below is real and verified. Read them all on Word of Mouth.
          </p>

          {/* WOMO badge — prominent, clickable */}
          <a
            href={WOMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-ink-line bg-ink-soft px-5 py-3 transition hover:border-teal/40 hover:bg-ink"
            aria-label={`View all ${config.stats.reviews} AGG Doors reviews on Word of Mouth`}
          >
            <img
              src="/review-avatar-wordofmouth.svg"
              alt="Word of Mouth"
              className="h-7 w-7 rounded-lg"
            />
            <div className="text-left">
              <div className="flex items-center gap-2">
                <StarRow count={5} />
                <span className="text-sm font-bold text-white">{config.stats.rating}/5</span>
              </div>
              <p className="text-xs text-slate-400">
                {config.stats.reviews}+ reviews on Word of Mouth
              </p>
            </div>
            <ExternalLink size={15} className="ml-1 text-slate-500" />
          </a>
        </ScrollReveal>

        {/* Review cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {config.testimonials.map((review, index) => (
            <ScrollReveal key={`${review.name}-${index}`} delay={index * 0.05}>
              <article className="card flex h-full flex-col">
                {/* Reviewer header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {review.avatar ? (
                      <img
                        src={review.avatar}
                        alt=""
                        className="h-10 w-10 rounded-xl object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal/10 text-sm font-bold text-teal-light">
                        {review.name.slice(0, 1)}
                      </span>
                    )}
                    <div>
                      <p className="font-semibold text-white">{review.name}</p>
                      <p className="text-xs text-slate-500">
                        {review.suburb}
                        {review.date ? ` · ${review.date}` : ""}
                      </p>
                    </div>
                  </div>
                  <StarRow count={review.rating} />
                </div>

                {/* Review text */}
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Verified source link */}
                {review.sourceUrl ? (
                  <a
                    href={review.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-light transition hover:text-white"
                    aria-label={`Read ${review.name}'s review on ${review.sourceLabel ?? "review source"}`}
                  >
                    <ExternalLink size={12} aria-hidden="true" />
                    Verified on {review.sourceLabel ?? "review source"}
                  </a>
                ) : null}
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Footer CTA */}
        <ScrollReveal className="mt-10 text-center">
          <a
            href={WOMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary gap-2"
          >
            View all {config.stats.reviews}+ reviews on Word of Mouth
            <ExternalLink size={15} aria-hidden="true" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
