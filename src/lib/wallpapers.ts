export type Wallpaper = {
  slug: string;
  title: string;
  series: "Rooms" | "Space";
  file: string;
};

/** Icon plate of each room, exported at 3840×2160. */
export const wallpapers: Wallpaper[] = [
  { slug: "tin-roof", title: "Tin Roof", series: "Rooms", file: "tin-roof.jpg" },
  { slug: "jazz-club", title: "The Jazz Club", series: "Rooms", file: "jazz-club.jpg" },
  { slug: "cupola", title: "The Cupola", series: "Space", file: "cupola.jpg" },
  { slug: "europa", title: "Europa", series: "Space", file: "europa.jpg" },
  { slug: "mars", title: "Mars", series: "Space", file: "mars.jpg" },
  { slug: "mission-control", title: "Mission Control", series: "Space", file: "mission-control.jpg" },
  { slug: "moon", title: "The Moon", series: "Space", file: "moon.jpg" },
  { slug: "saturn", title: "Saturn", series: "Space", file: "saturn.jpg" },
  { slug: "the-sun", title: "The Sun", series: "Space", file: "the-sun.jpg" },
  { slug: "the-void", title: "The Void", series: "Space", file: "the-void.jpg" },
  { slug: "voyager", title: "Voyager", series: "Space", file: "voyager.jpg" },
];
