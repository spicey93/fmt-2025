export interface NavPage {
  title: string;
  slug: string;
}

export interface NavGroup {
  title: string;
  slug: string;
  subPages: NavPage[];
}

export const tyreDropdown: NavGroup = {
  title: "Mobile Tyres",
  slug: "mobile-tyres",
  subPages: [
    { title: "Mobile Tyre Fitting", slug: "mobile-tyre-fitting" },
    { title: "Emergency Mobile Tyre Fitting", slug: "emergency-mobile-tyre-fitting" },
    { title: "Mobile Caravan Tyre Fitting", slug: "mobile-caravan-tyre-fitting" },
    { title: "Puncture Repair", slug: "puncture-repair" },
  ],
};

export const servicesDropdown: NavGroup = {
  title: "Services",
  slug: "services",
  subPages: [
    { title: "Locking Wheel Nut Removal", slug: "locking-wheel-nut-removal" },
    { title: "Tyre Pressure Monitoring System", slug: "tyre-pressure-monitoring-system" },
    { title: "Mobile Car Battery Replacement", slug: "mobile-car-battery-replacement" },
    { title: "Mobile Brake Fitting", slug: "mobile-brake-fitting" },
    { title: "AlloyGator Wheel Protection", slug: "alloygator-wheel-protection" },
    { title: "Alloy Wheel Repair", slug: "alloy-wheel-repair" },
  ],
};

export const coverageDropdown: NavGroup = {
  title: "Coverage",
  slug: "coverage",
  subPages: [
    { title: "Blandford Forum", slug: "blandford-forum" },
    { title: "Bournemouth", slug: "bournemouth" },
    { title: "Christchurch", slug: "christchurch" },
    { title: "Dorchester", slug: "dorchester" },
    { title: "Ferndown", slug: "ferndown" },
    { title: "Gillingham", slug: "gillingham" },
    { title: "Poole", slug: "poole" },
    { title: "Ringwood", slug: "ringwood" },
    { title: "Shaftesbury", slug: "shaftesbury" },
    { title: "Sturminster Newton", slug: "sturminster-newton" },
    { title: "Swanage", slug: "swanage" },
    { title: "Verwood", slug: "verwood" },
    { title: "Wareham", slug: "wareham" },
    { title: "Weymouth", slug: "weymouth" },
    { title: "Wimborne", slug: "wimborne" },
  ],
};

export const navGroups: NavGroup[] = [tyreDropdown, servicesDropdown, coverageDropdown];
