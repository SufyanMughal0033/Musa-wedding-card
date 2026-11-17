// EDIT HERE: assets, map links and embeds are replaceable without touching components.
export const assets = {
  music: "/audio/music.mpeg", // drop a licensed file here
  bismillah: "/images/bismillah-calligraphy.svg",
  curtainLeftDesktop: "/images/curtain-left-desktop.webp",
  curtainRightDesktop: "/images/curtain-right-desktop.webp",
  curtainLeftMobile: "/images/curtain-left-mobile.webp",
  curtainRightMobile: "/images/curtain-right-mobile.webp",
};
export type EventItem = { id:string; title:string; label:string; date:string; iso:string; video:string; venue:string; mapLink:string; mapEmbed:string };
export const events: EventItem[] = [
  { id:"mehndi", title:"Mehndi", label:"MEHNDI", date:"31 December 2026", iso:"2026-12-31T00:00:00", video:"/videos/mehndi.mp4", venue:"Mehndi Venue", mapLink:"", mapEmbed:"" },
  { id:"baraat", title:"The Baraat", label:"BARAAT", date:"01 January 2027", iso:"2027-01-01T00:00:00", video:"/videos/baraat.mp4", venue:"Baraat Venue", mapLink:"", mapEmbed:"" },
  { id:"walima", title:"The Walima", label:"WALIMA", date:"02 January 2027", iso:"2027-01-02T00:00:00", video:"/videos/walima.mp4", venue:"Walima Venue", mapLink:"", mapEmbed:"" },
];
