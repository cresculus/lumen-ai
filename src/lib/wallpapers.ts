export type Wallpaper = {
  slug: string;
  title: string;
  series: "Rooms" | "Space";
  file: string;
  youtubeId: string;
};

/** Icon plate of each room, exported at 3840×2160. */
export const wallpapers: Wallpaper[] = [
  { slug: "tin-roof", title: "Tin Roof", series: "Rooms", file: "tin-roof.jpg", youtubeId: "dkGIe9hW5TA" },
  { slug: "jazz-club", title: "The Jazz Club", series: "Rooms", file: "jazz-club.jpg", youtubeId: "Bb9Cghtntog" },
  { slug: "cupola", title: "The Cupola", series: "Space", file: "cupola.jpg", youtubeId: "NVNXA8gG6jA" },
  { slug: "europa", title: "Europa", series: "Space", file: "europa.jpg", youtubeId: "KLjgcyj3Nzw" },
  { slug: "mars", title: "Mars", series: "Space", file: "mars.jpg", youtubeId: "ZpNVQh-da0M" },
  { slug: "mission-control", title: "Mission Control", series: "Space", file: "mission-control.jpg", youtubeId: "qzQd_lgV4xw" },
  { slug: "moon", title: "The Moon", series: "Space", file: "moon.jpg", youtubeId: "JGIbcV_Avwg" },
  { slug: "saturn", title: "Saturn", series: "Space", file: "saturn.jpg", youtubeId: "ckPLN1yqcAA" },
  { slug: "the-sun", title: "The Sun", series: "Space", file: "the-sun.jpg", youtubeId: "6Ys05gkE7MU" },
  { slug: "the-void", title: "The Void", series: "Space", file: "the-void.jpg", youtubeId: "618_5ICuaEU" },
  { slug: "voyager", title: "Voyager", series: "Space", file: "voyager.jpg", youtubeId: "ijGfb_rB2vg" },
];
