import type { IconName } from "../components/Icon.astro";
import type { HeroImageKey } from "./images";

export interface ServiceCard {
  title: string;
  href: string;
  blurb: string;
  icon: IconName;
  image: HeroImageKey;
}

// Ordered by importance — the first entries are featured on service-page grids
export const services: ServiceCard[] = [
  {
    title: "Mobile Tyre Fitting",
    href: "/mobile-tyres/mobile-tyre-fitting",
    blurb: "New tyres fitted on your drive, at work or roadside — same day, no garage queues.",
    icon: "tyre",
    image: "mobile-tyre-fitting",
  },
  {
    title: "Emergency Tyre Fitting",
    href: "/mobile-tyres/emergency-mobile-tyre-fitting",
    blurb: "Stuck with a flat? Our average arrival time is under 60 minutes.",
    icon: "bolt",
    image: "emergency-mobile-tyre-fitting",
  },
  {
    title: "Puncture Repair",
    href: "/mobile-tyres/puncture-repair",
    blurb: "Quick, safe puncture repairs carried out wherever your car is parked.",
    icon: "wrench",
    image: "puncture-repair",
  },
  {
    title: "Caravan Tyre Fitting",
    href: "/mobile-tyres/mobile-caravan-tyre-fitting",
    blurb: "Caravan and trailer tyres fitted on site — no towing to a garage.",
    icon: "caravan",
    image: "mobile-caravan-tyre-fitting",
  },
  {
    title: "Locking Wheel Nut Removal",
    href: "/services/locking-wheel-nut-removal",
    blurb: "Lost or damaged key? We remove locking wheel nuts and get you sorted on the spot.",
    icon: "lock",
    image: "locking-wheel-nut-removal",
  },
  {
    title: "Car Battery Replacement",
    href: "/services/mobile-car-battery-replacement",
    blurb: "Flat battery? We test, supply and fit a new one where you are.",
    icon: "battery",
    image: "mobile-car-battery-replacement",
  },
  {
    title: "Mobile Brake Fitting",
    href: "/services/mobile-brake-fitting",
    blurb: "Quality brake pads and discs fitted at home, with a free safety check.",
    icon: "disc",
    image: "mobile-brake-fitting",
  },
  {
    title: "TPMS Sensors",
    href: "/services/tyre-pressure-monitoring-system",
    blurb: "Tyre pressure sensor diagnosis, replacement and programming.",
    icon: "gauge",
    image: "tyre-pressure-monitoring-system",
  },
  {
    title: "AlloyGator Protection",
    href: "/services/alloygator-wheel-protection",
    blurb: "Stylish rim protectors that guard your alloys against kerb damage.",
    icon: "shield",
    image: "alloygator-wheel-protection",
  },
  {
    title: "Alloy Wheel Repair",
    href: "/services/alloy-wheel-repair",
    blurb: "Cracked or buckled alloy? We can repair it and get you moving again.",
    icon: "wheel",
    image: "freeway-mobile-tyres",
  },
];
