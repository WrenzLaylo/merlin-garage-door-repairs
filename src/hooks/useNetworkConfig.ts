import { useEffect, useState } from "react";
import type { TestimonialItem } from "../constants";

export interface NetworkConfig {
  contact: {
    business: { number: string; tel: string };
    emergency: { number: string; tel: string };
  };
  stats: {
    years: number;
    reviews: number;
    rating: number;
    warrantyMonths: number;
  };
  serviceAreas: {
    regions: string[];
    suburbs: string[];
  };
  testimonials: TestimonialItem[];
}

export const DEFAULTS: NetworkConfig = {
  contact: {
    business: { number: "(03) 8789 9375", tel: "+61387899375" },
    emergency: { number: "(03) 8789 9376", tel: "+61387899376" },
  },
  stats: {
    years: 20,
    reviews: 781,
    rating: 4.9,
    warrantyMonths: 12,
  },
  serviceAreas: {
    regions: [
      "Eastern Suburbs",
      "South-Eastern Suburbs",
      "Northern Suburbs",
      "Western Suburbs",
      "Melbourne CBD",
    ],
    suburbs: [
      "Hallam",
      "Dandenong",
      "Berwick",
      "Narre Warren",
      "Cranbourne",
      "Frankston",
      "Glen Waverley",
      "Ringwood",
      "Bayswater",
      "Pakenham",
      "Moorabbin",
      "Melbourne",
    ],
  },
  testimonials: [
    {
      name: "Deborah H.",
      suburb: "Melbourne",
      rating: 5,
      reviewTitle: "Garage door working wonderfully",
      text: "AGG provide great service and are well priced thank you.",
      date: "26 May 2026",
      avatar: "/review-avatar-wordofmouth.svg",
      sourceLabel: "Word of Mouth",
      sourceUrl: "https://www.wordofmouth.com.au/reviews/agg-doors-hallam",
      serviceType: "Garage door repair",
    },
    {
      name: "Richard H.",
      suburb: "Melbourne",
      rating: 5,
      reviewTitle: "Improved roller door function",
      text: "Techs were on time and efficient. Door much quieter after being serviced.",
      date: "23 May 2026",
      avatar: "/review-avatar-wordofmouth.svg",
      sourceLabel: "Word of Mouth",
      sourceUrl: "https://www.wordofmouth.com.au/reviews/agg-doors-hallam",
      serviceType: "Roller door service",
    },
    {
      name: "Cathy W.",
      suburb: "Melbourne",
      rating: 5,
      reviewTitle: "Excellent, surpassing expectations",
      text: "Quick turnaround and installation, excellent product exactly as promised, friendly and efficient. Highly recommended.",
      date: "20 May 2026",
      avatar: "/review-avatar-wordofmouth.svg",
      sourceLabel: "Word of Mouth",
      sourceUrl: "https://www.wordofmouth.com.au/reviews/agg-doors-hallam",
      serviceType: "Roller door install",
    },
    {
      name: "Bill M.",
      suburb: "Melbourne",
      rating: 5,
      text: "Excellent from initial contact through to finished job. Prompt, courteous, helpful and highly recommended.",
      date: "15 May 2026",
      avatar: "/review-avatar-wordofmouth.svg",
      sourceLabel: "Word of Mouth",
      sourceUrl: "https://www.wordofmouth.com.au/reviews/agg-doors-hallam",
      serviceType: "Roller door install",
    },
    {
      name: "June B.",
      suburb: "Sassafras VIC",
      rating: 5,
      text: "We recently updated our old roller door to one with remote control. Our door was custom made very quickly, the installers arrived on time and were very polite and professional. We would very happily recommend AGG. Thank you for an excellent service experience. June & David",
      date: "14 May 2026",
      avatar: "/review-avatar-wordofmouth.svg",
      sourceLabel: "Word of Mouth",
      sourceUrl: "https://www.wordofmouth.com.au/reviews/agg-doors-hallam",
      serviceType: "Roller door install",
    },
    {
      name: "Mary C.",
      suburb: "Bittern",
      rating: 5,
      text: "We had Paul come to our house to repair our jammed garage door. Excellent job — it now slides better than ever. Highly recommend AGG Doors for excellent technicians and office staff.",
      date: "Oct 2025",
      avatar: "/review-avatar-wordofmouth.svg",
      sourceLabel: "Word of Mouth",
      sourceUrl: "https://www.wordofmouth.com.au/reviews/agg-doors-hallam",
      serviceType: "Garage door repair",
    },
    {
      name: "Hugh O.",
      suburb: "Melbourne",
      rating: 5,
      text: "A very professional group from the time they took my call — committing to turning up on time and most importantly doing a very thorough and professional job to get me out of trouble. Very impressed, and this is the second time I've used them.",
      date: "Sep 2025",
      avatar: "/review-avatar-wordofmouth.svg",
      sourceLabel: "Word of Mouth",
      sourceUrl: "https://www.wordofmouth.com.au/reviews/agg-doors-hallam",
    },
    {
      name: "Bron B.",
      suburb: "Melbourne",
      rating: 5,
      text: "The staff who fixed our garage door were really nice, polite and did a great job. Very happy with the service received.",
      date: "Aug 2025",
      avatar: "/review-avatar-wordofmouth.svg",
      sourceLabel: "Word of Mouth",
      sourceUrl: "https://www.wordofmouth.com.au/reviews/agg-doors-hallam",
    },
    {
      name: "Bradley Y.",
      suburb: "Melbourne",
      rating: 5,
      text: "The tradesman who came was brilliant and fixed my garage door. Couldn't be happier with the result.",
      date: "Jul 2025",
      avatar: "/review-avatar-wordofmouth.svg",
      sourceLabel: "Word of Mouth",
      sourceUrl: "https://www.wordofmouth.com.au/reviews/agg-doors-hallam",
    },
    {
      name: "Nick S.",
      suburb: "Hallam",
      rating: 5,
      text: "Nick was polite, articulate and friendly. Garage door is working perfectly. I have used AGG for many years and always been pleased with the quality of the service — technicians are always on time and helpful.",
      date: "2025",
      avatar: "/review-avatar-wordofmouth.svg",
      sourceLabel: "Word of Mouth",
      sourceUrl: "https://www.wordofmouth.com.au/reviews/agg-doors-hallam",
    },
    {
      name: "Nathan's Customer",
      suburb: "Melbourne",
      rating: 5,
      text: "It was so easy and comfortable dealing with AGG Doors. Nathan was polite and explained what I needed to know without the sales pitch. Will definitely go to them again.",
      date: "2025",
      avatar: "/review-avatar-wordofmouth.svg",
      sourceLabel: "Word of Mouth",
      sourceUrl: "https://www.wordofmouth.com.au/reviews/agg-doors-hallam",
    },
  ],
};

const CACHE_KEY = "merlin-network-config";
const CACHE_MS = 24 * 60 * 60 * 1000;

interface CachePayload {
  timestamp: number;
  config: NetworkConfig;
}

function isNetworkConfig(value: unknown): value is NetworkConfig {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<NetworkConfig>;
  return Boolean(candidate.contact && candidate.stats && candidate.serviceAreas);
}

export function useNetworkConfig() {
  const [config, setConfig] = useState<NetworkConfig>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadConfig() {
      try {
        const cached = window.localStorage.getItem(CACHE_KEY);

        if (cached) {
          const payload = JSON.parse(cached) as CachePayload;
          if (Date.now() - payload.timestamp < CACHE_MS && isNetworkConfig(payload.config)) {
            setConfig(payload.config);
            setLoading(false);
            return;
          }
        }

        const response = await fetch("/network-config.json", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("network-config unavailable");
        }

        const remote = (await response.json()) as unknown;
        if (!isNetworkConfig(remote)) {
          throw new Error("network-config invalid");
        }

        if (!cancelled) {
          setConfig(remote);
          window.localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ timestamp: Date.now(), config: remote }),
          );
        }
      } catch {
        if (!cancelled) {
          setConfig(DEFAULTS);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadConfig();

    return () => {
      cancelled = true;
    };
  }, []);

  return { config, loading };
}
