import { colors } from "@/src/utils/theme";

type ContrastPair = {
  name: string;
  foreground: string;
  background: string;
  minRatio: number;
};

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((ch) => `${ch}${ch}`)
          .join("")
      : normalized;
  const intVal = Number.parseInt(expanded, 16);
  return [(intVal >> 16) & 255, (intVal >> 8) & 255, intVal & 255];
}

function linearizeChannel(channel: number): number {
  const srgb = channel / 255;
  return srgb <= 0.03928
    ? srgb / 12.92
    : ((srgb + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return (
    0.2126 * linearizeChannel(r) +
    0.7152 * linearizeChannel(g) +
    0.0722 * linearizeChannel(b)
  );
}

function contrastRatio(foreground: string, background: string): number {
  const l1 = relativeLuminance(foreground);
  const l2 = relativeLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe("WCAG contrast checks for Home, Tasks, and Calendar", () => {
  const pairs: ContrastPair[] = [
    {
      name: "primary text on surface",
      foreground: colors.textPrimary,
      background: colors.surface,
      minRatio: 4.5,
    },
    {
      name: "secondary text on surface",
      foreground: colors.textSecondary,
      background: colors.surface,
      minRatio: 4.5,
    },
    {
      name: "calendar muted text on surface",
      foreground: "#5F6775",
      background: colors.surface,
      minRatio: 4.5,
    },
    {
      name: "high-priority chip text",
      foreground: "#C12C2C",
      background: "#FDECEC",
      minRatio: 4.5,
    },
    {
      name: "medium-priority chip text",
      foreground: "#2F5DA8",
      background: "#E6F0FF",
      minRatio: 4.5,
    },
    {
      name: "on-primary text",
      foreground: colors.onPrimary,
      background: colors.primary,
      minRatio: 4.5,
    },
  ];

  it.each(pairs)("meets contrast target for $name", ({ foreground, background, minRatio }) => {
    const ratio = contrastRatio(foreground, background);
    expect(ratio).toBeGreaterThanOrEqual(minRatio);
  });
});

