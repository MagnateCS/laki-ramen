import mkcert from "vite-plugin-mkcert";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2026-01-13",
  devtools: { enabled: false },
  modules: ["@storyblok/nuxt"],
  css: ["~/assets/css/tailwind.css"],

  storyblok: {
    accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
    apiOptions: {
      /** Set the correct region for your space. Learn more: https://www.storyblok.com/docs/packages/storyblok-js#example-region-parameter */
      region: process.env.STORYBLOK_REGION || "eu",
      /** The following code is only required when creating a Storyblok space directly via the Blueprints feature. */
      endpoint: process.env.STORYBLOK_API_BASE_URL
        ? `${new URL(process.env.STORYBLOK_API_BASE_URL).origin}/v2`
        : undefined,
    },
  },

  app: {
    head: {
      title: "Laki Ramen",
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap",
        },
      ],
    },
  },

  ssr: true,

  devServer: {
    https: true,
  },

  vite: {
    plugins: [tailwindcss(), mkcert()],
  },
});
