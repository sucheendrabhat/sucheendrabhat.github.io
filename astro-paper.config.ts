import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://sucheendrabhat.github.io/",
    title: "sucheeLogs",
    description: "Personal dev journal and continuous learning log by Sucheendra.",
    author: "Sucheendra",
    profile: "https://github.com/such3",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "UTC",
    dir: "ltr",
  },
  posts: {
    perPage: 10,
    perIndex: 10,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: false,
    showArchives: false,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "github",   url: "https://github.com/such3" },
    { name: "linkedin", url: "https://www.linkedin.com/in/sucheendra" },
    { name: "mail",     url: "mailto:sucheendra3@gmail.com" },
  ],
  shareLinks: [
    { name: "linkedin", url: "https://www.linkedin.com/sharing/share-offsite/?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20log&body=" },
  ],
});