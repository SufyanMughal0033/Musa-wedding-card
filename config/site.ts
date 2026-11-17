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
   {
    id: "mehndi",
    title: "Mehndi",
    label: "MEHNDI",
    date: "Wednesday, 30 December 2026",
    iso: "2026-12-30T00:00:00",
    video: "/videos/mehndi.mp4",
    venue: "Mehndi Venue - Ghalib City Faisalabad",
    mapLink: "https://www.google.com/maps/search/?api=1&query=31.4208164215,73.1467590332",
    mapEmbed: ""
  },
   {
    id: "baraat",
    title: "The Baraat",
    label: "BARAAT",
    date: "Thursday, 31 December 2026",
    iso: "2026-12-31T00:00:00",
    video: "/videos/baraat.mp4",
    venue: "Baraat Venue - Zoom Executive Marquee Canal Road",
    mapLink: "https://www.google.com/maps/place/Zoom+Executive+Marquee/@31.4369885,73.1244404,17z/data=!4m14!1m7!3m6!1s0x3922685a45dc56af:0xd6887825f65b15be!2sZoom+Executive+Marquee!8m2!3d31.4369839!4d73.1270153!16s%2Fg%2F11b6lgvm82!3m5!1s0x3922685a45dc56af:0xd6887825f65b15be!8m2!3d31.4369839!4d73.1270153!16s%2Fg%2F11b6lgvm82?authuser=0&entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D",
    mapEmbed: ""
  },
  {
    id: "walima",
    title: "The Walima",
    label: "WALIMA",
    date: "Saturday, 02 January 2027",
    iso: "2027-01-02T00:00:00",
    video: "/videos/walima.mp4",
    venue: "Walima Venue - Victoria Marquee Canal Road",
    mapLink: "https://www.google.com/maps/place/Victoria+Marquee/@31.4396328,73.1291276,17z/data=!3m1!4b1!4m6!3m5!1s0x3922685778fb100f:0x2868137dbf4780a2!8m2!3d31.4396282!4d73.1317025!16s%2Fg%2F11cjj6qcp6?authuser=0&entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D",
    mapEmbed: ""
  }
];
