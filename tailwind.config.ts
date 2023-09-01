import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      sky: generateColorScale("sky"),
      bronze: generateColorScale("bronze"),
      white: generateAlphaScale("white"),
      black: generateAlphaScale("black"),
    },
    extend: {
      backgroundImage: {
        "radial-gradient-to-tr":
          "radial-gradient(100% 100% at 0 100%, var(--tw-gradient-stops))",
        "radial-gradient-to-b":
          "radial-gradient(100% 100% at 50% 0, var(--tw-gradient-stops))",
      },
      keyframes: {
        pulser: {
          "0%": { transform: "translateX(0)", opacity: "0" },
          "30%": { opacity: "1 " },
          "70%": { opacity: "1 " },
          "100%": { transform: "translateX(100cqw)", opacity: "0" },
        },
      },
      animation: {
        pulser: "pulser 7s cubic-bezier(0.215, 0.700, 0.740, 0.195) infinite",
      },
    },
  },
  plugins: [],
};

function generateColorScale(color: string) {
  const scale = Array.from({ length: 12 }, (_, i) => {
    const id = i + 1;
    return [
      [id, `var(--${color}-${id})`],
      ["background", `var(--${color}-1)`],
      ["surface", `var(--${color}-2)`],
      ["component1", `var(--${color}-3)`],
      ["component2", `var(--${color}-4)`],
      ["component3", `var(--${color}-5)`],
      ["border1", `var(--${color}-6)`],
      ["border2", `var(--${color}-7)`],
      ["border3", `var(--${color}-8)`],
      ["solid", `var(--${color}-9)`],
      ["solid-hover", `var(--${color}-10)`],
      ["text-low", `var(--${color}-11)`],
      ["text-high", `var(--${color}-12)`],
      [`a${id}`, `var(--${color}-a${id})`],
      ["alpha-background", `var(--${color}-a1)`],
      ["alpha-surface", `var(--${color}-a2)`],
      ["alpha-component1", `var(--${color}-a3)`],
      ["alpha-component2", `var(--${color}-a4)`],
      ["alpha-component3", `var(--${color}-a5)`],
      ["alpha-border1", `var(--${color}-a6)`],
      ["alpha-border2", `var(--${color}-a7)`],
      ["alpha-border3", `var(--${color}-a8)`],
      ["alpha-solid", `var(--${color}-a9)`],
      ["alpha-solid-hover", `var(--${color}-a10)`],
      ["alpha-text-low", `var(--${color}-a11)`],
      ["alpha-text-high", `var(--${color}-a12)`],
    ];
  }).flat();
  return Object.fromEntries(scale);
}

function generateAlphaScale(color: string) {
  const scale = Array.from({ length: 12 }, (_, i) => {
    const id = i + 1;
    return [[id, `var(--${color}-a${id})`]];
  }).flat();
  return Object.fromEntries([["DEFAULT", color], ...scale]);
}

export default config;
