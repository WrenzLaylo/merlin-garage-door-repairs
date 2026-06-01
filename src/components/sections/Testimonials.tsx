import { useState, useRef, useEffect, useCallback } from "react";
import {
  ExternalLink,
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";
import type { NetworkConfig } from "../../hooks/useNetworkConfig";
import ScrollReveal from "../ui/ScrollReveal";

const WOMO_URL = "https://www.wordofmouth.com.au/reviews/agg-doors-hallam";

function StarRow({ count, size = 14 }: { count: number; size?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < count ? "currentColor" : "none"}
          className={i < count ? "text-flame" : "text-slate-600"}
        />
      ))}
    </div>
  );
}

function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-14 shrink-0 text-slate-400">{label}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-line">
        <div
          className="h-full rounded-full bg-flame"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
      <span className="w-8 font-semibold text-slate-300">{value}/5</span>
    </div>
  );
}

type BuiltReview = NetworkConfig["testimonials"][number] & { initials: string };

function buildReview(r: NetworkConfig["testimonials"][number]): BuiltReview {
  const parts = r.name.trim().split(/\s+/);
  const initials =
    parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : r.name.slice(0, 2).toUpperCase();
  return { ...r, initials };
}

function ReviewCard({ review }: { review: BuiltReview }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 140;

  return (
    <div className="card flex h-full flex-col hover:-translate-y-1 hover:bg-ink-soft">
      <div className="mb-3 flex items-start gap-2">
        <Quote
          size={18}
          className="mt-0.5 shrink-0 text-teal/40"
          aria-hidden="true"
        />
        {review.reviewTitle && (
          <p className="text-sm font-bold text-white">{review.reviewTitle}</p>
        )}
      </div>

      <div className="mb-4 flex-1">
        <p className="text-sm leading-relaxed text-slate-300">
          &ldquo;
          {isLong && !expanded ? review.text.slice(0, 140) + "…" : review.text}
          &rdquo;
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-1.5 text-xs font-semibold text-teal-light transition-colors hover:text-white"
            aria-expanded={expanded}
          >
            {expanded ? "Show less ↑" : "Read more ↓"}
          </button>
        )}
      </div>

      <div className="mb-4 space-y-2 border-y border-ink-line py-3">
        <RatingBar label="Quality" value={5} />
        <RatingBar label="Service" value={5} />
        <RatingBar label="Value" value={5} />
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-teal/10 text-sm font-bold text-teal-light">
            {review.initials}
          </span>
          <div>
            <p className="text-sm font-semibold text-white">{review.name}</p>
            <p className="text-xs text-slate-500">
              {review.suburb}
              {review.date ? ` · ${review.date}` : ""}
            </p>
          </div>
        </div>
        <StarRow count={review.rating} />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        {review.serviceType && (
          <span className="inline-flex items-center rounded-full bg-teal/10 px-2.5 py-0.5 text-[11px] font-medium text-teal-light">
            {review.serviceType}
          </span>
        )}
        {review.sourceUrl && (
          <a
            href={review.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 transition-colors hover:text-teal-light"
          >
            <ExternalLink size={10} aria-hidden="true" />
            Verified
          </a>
        )}
      </div>
    </div>
  );
}



// How many cards visible at a given breakpoint (we handle this in JS too)
const VISIBLE = 3; // desktop shows 3, we CSS-hide extras on mobile

export default function Testimonials({ config }: { config: NetworkConfig }) {
  const allReviews = config.testimonials.map(buildReview);
  const [startIdx, setStartIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [animDir, setAnimDir] = useState<"left" | "right">("left");
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = allReviews.length;

  // Normalise index
  const safeStart = ((startIdx % total) + total) % total;

  // Visible indices (wrapping)
  const visibleIndices = Array.from(
    { length: VISIBLE },
    (_, i) => (safeStart + i) % total,
  );

  const slide = useCallback(
    (dir: "prev" | "next") => {
      if (animating || total <= VISIBLE) return;
      setAnimDir(dir === "next" ? "left" : "right");
      setAnimating(true);
      setTimeout(() => {
        setStartIdx((i) =>
          dir === "next" ? (i + 1) % total : (i - 1 + total) % total,
        );
        setAnimating(false);
      }, 320);
    },
    [animating, total],
  );



  const stopAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
  }, []);

  const startAuto = useCallback(() => {
    stopAuto();
    if (total <= 1) return;
    autoRef.current = setInterval(() => slide("next"), 5000);
  }, [slide, stopAuto, total]);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  return (
    <>
      <style>{`
        @keyframes carouselLeft {
          from { opacity: 0; transform: translateX(48px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes carouselRight {
          from { opacity: 0; transform: translateX(-48px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .carousel-enter-left  { animation: carouselLeft  0.32s cubic-bezier(0.4,0,0.2,1) both; }
        .carousel-enter-right { animation: carouselRight 0.32s cubic-bezier(0.4,0,0.2,1) both; }
        .carousel-exit { opacity: 0; transition: opacity 0.18s ease; }
      `}</style>

      <section id="testimonials" className="section bg-ink-soft/35">
        <div className="container-x">
          {/* ── Header ── */}
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow mb-4">Real Reviews</span>
            <h2 className="h-section">Trusted by Melbourne homeowners.</h2>
            <p className="mt-3 text-slate-400">
              Every review below is real and verified. All{" "}
              <span className="font-semibold text-white">
                {config.stats.reviews}+
              </span>{" "}
              reviews are 5-star.
            </p>

            {/* ── Platform badges ── */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {/* Word of Mouth — uses real wordmark SVG */}
              <a
                href={WOMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-2xl border border-ink-line bg-ink-soft px-4 py-2.5 transition hover:border-[#ff4800]/40 hover:bg-ink"
                aria-label="View AGG Doors reviews on Word of Mouth"
              >
                {/* Wrap SVG in a pill so the horizontal wordmark has a contained bg */}
                <span className="flex h-8 w-auto items-center rounded-lg bg-white px-2 py-1">
                  <img
                    src="/review-avatar-wordofmouth.svg"
                    alt="Word of Mouth"
                    className="h-4 w-auto"
                    style={{ minWidth: 80 }}
                  />
                </span>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <StarRow count={5} size={11} />
                    <span className="text-[11px] font-bold text-white">
                      4.9
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    {config.stats.reviews}+ reviews
                  </p>
                </div>
                <ExternalLink size={12} className="text-slate-600" />
              </a>

              {/* ProductReview */}
              <a
                href="https://www.productreview.com.au/listings/agg-doors"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-2xl border border-ink-line bg-ink-soft px-4 py-2.5 transition hover:border-[#003087]/50 hover:bg-ink"
                aria-label="View AGG Doors reviews on ProductReview.com.au"
              >
                <img
                  src="/review-avatar-productreview.svg"
                  alt="ProductReview.com.au"
                  className="h-9 w-9 rounded-xl shrink-0"
                />
                <div className="text-left">
                  <p className="text-[11px] font-semibold text-white">
                    ProductReview
                  </p>
                  <div className="flex items-center gap-1">
                    <StarRow count={5} size={11} />
                    <span className="text-[11px] text-slate-400">4.8</span>
                  </div>
                </div>
                <ExternalLink size={12} className="text-slate-600" />
              </a>
            </div>
          </ScrollReveal>



          {/* ── Carousel ── */}
          {allReviews.length === 0 ? (
            <p className="mt-12 text-center text-slate-500">
              No reviews in this category yet.
            </p>
          ) : (
            <div
              className="relative mt-8"
              onMouseEnter={stopAuto}
              onMouseLeave={startAuto}
            >
              {/* Prev arrow */}
              {total > VISIBLE && (
                <>
                  <button
                    onClick={() => {
                      stopAuto();
                      slide("prev");
                    }}
                    className="absolute -left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-ink-line bg-ink-soft text-slate-400 shadow-lg transition hover:border-teal/50 hover:bg-ink hover:text-white md:-left-6"
                    aria-label="Previous reviews"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => {
                      stopAuto();
                      slide("next");
                    }}
                    className="absolute -right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-ink-line bg-ink-soft text-slate-400 shadow-lg transition hover:border-teal/50 hover:bg-ink hover:text-white md:-right-6"
                    aria-label="Next reviews"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Cards grid — always shows VISIBLE cards, animates as a group */}
              <div className="grid gap-5 md:grid-cols-3">
                {visibleIndices.map((reviewIdx, slot) => {
                  const review = allReviews[reviewIdx];
                  return (
                    <div
                      key={`${safeStart}-${slot}`}
                      className={`${slot > 0 ? "hidden md:block" : ""} ${
                        animating
                          ? "carousel-exit"
                          : animDir === "left"
                            ? "carousel-enter-left"
                            : "carousel-enter-right"
                      }`}
                      style={{
                        animationDelay: animating ? "0ms" : `${slot * 60}ms`,
                      }}
                    >
                      <ReviewCard review={review} />
                    </div>
                  );
                })}
              </div>

              {/* Dot indicators */}
              {total > VISIBLE && (
                <div
                  className="mt-6 flex justify-center gap-1.5"
                  role="tablist"
                  aria-label="Review navigation"
                >
                  {Array.from({ length: total }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        stopAuto();
                        const dir = idx > safeStart ? "left" : "right";
                        setAnimDir(dir);
                        setAnimating(true);
                        setTimeout(() => {
                          setStartIdx(idx);
                          setAnimating(false);
                        }, 280);
                      }}
                      role="tab"
                      aria-selected={idx === safeStart}
                      aria-label={`Go to review ${idx + 1}`}
                      className={`rounded-full transition-all duration-300 ${
                        idx === safeStart
                          ? "h-2 w-6 bg-teal"
                          : "h-2 w-2 bg-ink-line hover:bg-slate-500"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Footer platform links ── */}
          <ScrollReveal className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href={WOMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary gap-2 text-sm"
            >
              <span className="flex h-4 items-center rounded bg-white px-1.5">
                <img
                  src="/review-avatar-wordofmouth.svg"
                  alt=""
                  className="h-3 w-auto"
                  aria-hidden="true"
                />
              </span>
              Word of Mouth
              <ExternalLink size={13} aria-hidden="true" />
            </a>
            <a
              href="https://www.productreview.com.au/listings/agg-doors"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary gap-2 text-sm"
            >
              <img
                src="/review-avatar-productreview.svg"
                alt=""
                className="h-4 w-4 rounded"
                aria-hidden="true"
              />
              ProductReview
              <ExternalLink size={13} aria-hidden="true" />
            </a>

          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
