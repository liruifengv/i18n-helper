import launch  from 'launch-editor'
import type { AstroIntegration } from "astro";

export type Locale = {
  label: string;
  lang: string;
}

export type IntegrationOptions = {
  defaultLocale: string;
  locales: Locale[];
}

export default function i18nHelperIntegration(): AstroIntegration {
  console.log("i18nHelperIntegration was initialized!");
  return {
    name: "i18nHelper",
    hooks: {
      "astro:config:setup": ({ addDevToolbarApp }) => {
        addDevToolbarApp("i18n-helper/i18n-helper-app.ts");
      },
      "astro:server:setup": ({ server }) => {
        server.ws.on("astro-dev-toolbar:i18n-helper:initialized", () => {
          console.log("Astro i18n-helper was initialized!");
        });
        server.ws.on("astro-dev-toolbar:i18n-helper:toggled", (data) => {
          console.log(`Astro i18n-helper is now ${data.state ? "enabled" : "disabled"}!`);
        });
        server.ws.on("i18n-helper:open-file", (data) => {
          launch(
            data.fileName,
            'code',
            (fileName, errorMsg) => {
              console.log(`open file ${fileName} failed: ${errorMsg}`)
            }
          )
        });
      },
    }
  }
};
