export type PartnerRole = "distributor" | "ambassador" | "vendor" | "pa";

export interface Partner {
  id: string;
  name: string;
  phone: string[];
  momoPhone?: string;
  locations: string[];
  region: string;
  roles?: PartnerRole[];
  image?: string;
}

export interface Region {
  id: string;
  name: string;
  isCity?: boolean;
  parentRegion?: string;
}

export const regions: Region[] = [
  { id: "greater-accra", name: "Greater Accra Region" },
  { id: "tema", name: "Tema", isCity: true, parentRegion: "greater-accra" },
  { id: "central", name: "Central Region" },
  { id: "kasoa", name: "Kasoa", isCity: true, parentRegion: "central" },
  { id: "ashanti", name: "Ashanti Region" },
  { id: "bono-east", name: "Bono East Region" },
  { id: "bono", name: "Bono Region" },
  { id: "western-north", name: "Western North Region" },
  { id: "western", name: "Western Region" },
  { id: "eastern", name: "Eastern Region" },
  { id: "northern", name: "Northern Region" },
  { id: "volta", name: "Volta Region" },
  { id: "uk", name: "United Kingdom" },
];

export const WHATSAPP_NUMBER = "233554753634";

export const getPartnerApplicationWhatsAppLink = (formData: {
  name: string;
  phone: string;
  location: string;
  region: string;
}) => {
  const message = encodeURIComponent(
    `Hello NG Cosmetics! I'd like to become a partner.\n\n` +
    `Name: ${formData.name}\n` +
    `Phone: ${formData.phone}\n` +
    `Location: ${formData.location}\n` +
    `Region: ${formData.region}\n\n` +
    `Please contact me with more information about the partnership opportunity.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
};
