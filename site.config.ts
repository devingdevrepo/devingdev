// Edit these to change the text and links on the page.
// Leave a link empty ("") to hide it.
export const site = {
  name: "Deving Dev",
  author: "Massin",
  url: "https://devingdev.com",
  youtube: "https://www.youtube.com/@Devingwithmassin",
  linkedin: "https://www.linkedin.com/in/massin-skendoul/",
};

// Buttons on the /links page, in order. Add, remove or reorder freely.
// icon: "youtube" | "linkedin" | "web" | "github" | "mail"
export const links: { label: string; href: string; icon: "youtube" | "linkedin" | "web" | "github" | "mail"; note?: string }[] = [
  { label: "YouTube", href: site.youtube, icon: "youtube", note: "New videos on AI and code" },
  { label: "LinkedIn", href: site.linkedin, icon: "linkedin", note: "Let's connect" },
  { label: "Website", href: "/", icon: "web", note: "devingdev.com" },
];
