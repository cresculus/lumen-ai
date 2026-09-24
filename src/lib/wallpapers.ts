export type Wallpaper = {
  slug: string;
  title: string;
  series: "Rooms" | "Space" | "With Iselin";
  file: string;
  youtubeId: string;
  wide?: boolean;
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
  { slug: "iselin-jazz-club", title: "Iselin in the Jazz Club", series: "With Iselin", file: "iselin-jazz-club.jpg", youtubeId: "IJzY06n2h-w" },
  { slug: "iselin-tin-roof", title: "Iselin in Tin Roof", series: "With Iselin", file: "iselin-tin-roof.jpg", youtubeId: "bzK2-48Fc24" },
  { slug: "iselin-cupola", title: "Iselin in the Cupola", series: "With Iselin", file: "iselin-cupola.jpg", youtubeId: "fwxR7-EAPik" },
  { slug: "iselin-phone-jazz-club", title: "Iselin in the Jazz Club — phone", series: "With Iselin", file: "iselin-phone-jazz-club.jpg", youtubeId: "IJzY06n2h-w", wide: false },
  { slug: "iselin-phone-tin-roof", title: "Iselin in Tin Roof — phone", series: "With Iselin", file: "iselin-phone-tin-roof.jpg", youtubeId: "bzK2-48Fc24", wide: false },
  { slug: "iselin-phone-cupola", title: "Iselin in the Cupola — phone", series: "With Iselin", file: "iselin-phone-cupola.jpg", youtubeId: "fwxR7-EAPik", wide: false },
  { slug: "iselin-phone-kyoto", title: "Iselin in Kyoto — phone", series: "With Iselin", file: "iselin-phone-kyoto.jpg", youtubeId: "ZDuVU8HhPeE", wide: false },
  { slug: "iselin-phone-voyager", title: "Iselin in Voyager — phone", series: "With Iselin", file: "iselin-phone-voyager.jpg", youtubeId: "ZBwEgis2ExM", wide: false },
];
