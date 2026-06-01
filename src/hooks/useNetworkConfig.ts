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
    reviews: 600,
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
      name: "Rebecca T.",
      suburb: "Berwick",
      rating: 5,
      text: "Resolved the problem with great efficiency at a very reasonable cost.",
      date: "2026",
      avatar: "/review-avatar-productreview.svg",
      sourceLabel: "ProductReview",
      sourceUrl: "https://www.productreview.com.au/listings/agg-doors",
    },
    {
      name: "Sam K.",
      suburb: "Dandenong",
      rating: 5,
      text: "Techs were on time and efficient. Door much quieter after being serviced.",
      date: "2026",
      avatar: "/review-avatar-wordofmouth.svg",
      sourceLabel: "Word of Mouth",
      sourceUrl: "https://www.wordofmouth.com.au/reviews/agg-doors-hallam",
    },
    {
      name: "Michelle L.",
      suburb: "Frankston",
      rating: 5,
      text: "Excellent service from AGG Doors, with good, solid advice from Shaun.",
      date: "2026",
      avatar: "/review-avatar-trustindex.svg",
      sourceLabel: "Trustindex",
      sourceUrl: "https://www.trustindex.io/reviews/www.garagedoorrepair.net.au/lang/en",
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
