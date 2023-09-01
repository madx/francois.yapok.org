// keystatic.config.ts
import { config, fields, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  singletons: {
    hero: singleton({
      label: "Hero",
      path: "src/content/hero",
      schema: {
        catchphrase: fields.text({ label: "Catchprase" }),
        position: fields.text({ label: "Position" }),
        companyLogo: fields.image({
          label: "Company Logo",
          directory: "public/images/logos/",
          publicPath: "/images/logos/",
        }),
        companyName: fields.text({ label: "Company" }),
        companyUrl: fields.text({ label: "Company website" }),
        blurb: fields.document({
          label: "Blurb",
          formatting: true,
          links: true,
        }),
      },
    }),
  },
  collections: {},
});
