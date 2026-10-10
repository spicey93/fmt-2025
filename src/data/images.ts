import aboutUs from "../assets/services/about-us.jpeg";
import alloygatorWheelProtection from "../assets/services/alloygator-wheel-protection.webp";
import emergencyMobileTyreFitting from "../assets/services/emergency-mobile-tyre-fitting.webp";
import freewayMobileTyres from "../assets/services/freeway-mobile-tyres.webp";
import lockingWheelNutRemoval from "../assets/services/locking-wheel-nut-removal.webp";
import mobileBrakeFitting from "../assets/services/mobile-brake-fitting.webp";
import mobileCarBatteryReplacement from "../assets/services/mobile-car-battery-replacement.webp";
import mobileCaravanTyreFitting from "../assets/services/mobile-caravan-tyre-fitting.webp";
import mobileTyreFitting from "../assets/services/mobile-tyre-fitting.webp";
import punctureRepair from "../assets/services/puncture-repair.webp";
import tyrePressureMonitoringSystem from "../assets/services/tyre-pressure-monitoring-system.webp";

export const heroImages = {
  "about-us": aboutUs,
  "alloygator-wheel-protection": alloygatorWheelProtection,
  "emergency-mobile-tyre-fitting": emergencyMobileTyreFitting,
  "freeway-mobile-tyres": freewayMobileTyres,
  "locking-wheel-nut-removal": lockingWheelNutRemoval,
  "mobile-brake-fitting": mobileBrakeFitting,
  "mobile-car-battery-replacement": mobileCarBatteryReplacement,
  "mobile-caravan-tyre-fitting": mobileCaravanTyreFitting,
  "mobile-tyre-fitting": mobileTyreFitting,
  "puncture-repair": punctureRepair,
  "tyre-pressure-monitoring-system": tyrePressureMonitoringSystem,
} as const;

export type HeroImageKey = keyof typeof heroImages;
