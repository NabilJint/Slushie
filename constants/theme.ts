/**
 * Slush Design System Tokens
 *
 * A sticker-book-inspired design language: pastel paper canvas, inflated 3D ribbons,
 * vivid sticker accents, and black-outlined components.
 *
 * Font Substitutions (for the Duolingo clone):
 *   Lateral (display) → Poppins Bold
 *   Aeonik Pro (body) → Poppins Medium / Bold
 */

export const colors = {
  carbon: "#000000",
  paperWhite: "#ffffff",
  skyWash: "#dceeff",
  concreteGray: "#cccccc",
  softMist: "#e9e9e9",
  electricBlue: "#4da2ff",
  mintPop: "#55db9c",
  lavender: "#e9ccff",
  ember: "#fb4903",
  sunburst: "#ffd731",
  voltageViolet: "#5c4ade",
} as const;

export type AppColor = keyof typeof colors;

export const typography = {
  fontFamily: {
    regular: "Poppins-Regular",
    medium: "Poppins-Medium",
    semiBold: "Poppins-SemiBold",
    bold: "Poppins-Bold",
  },
  fontWeight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
  fontSize: {
    caption: 12,
    body: 14,
    bodyLg: 15,
    subheading: 24,
    headingSm: 30,
    heading: 64,
  },
  lineHeight: {
    caption: 1.56,
    body: 1.4,
    bodyLg: 1.39,
    subheading: 1.2,
    headingSm: 1.1,
    heading: 1,
  },
  letterSpacing: {
    tight: -0.01,
    normal: 0,
    wide: 0.03,
  },
} as const;

export const spacing = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  20: 20,
  24: 24,
  28: 28,
  32: 32,
  40: 40,
  44: 44,
  48: 48,
  60: 60,
  80: 80,
  128: 128,
  180: 180,
  224: 224,
} as const;

export const borderRadius = {
  nav: 1600,
  body: 30,
  cards: 20,
  pills: 1600,
  buttons: 1600,
  walletIcon: 16,
  cardsElevated: 40,
} as const;

export const surfaces = {
  skyWash: colors.skyWash,
  paperWhite: colors.paperWhite,
  concreteGray: colors.concreteGray,
  stickerSurfaces: colors.lavender,
} as const;
