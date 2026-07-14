export type Service = {
  id: string;
  slug: string;
  name: string;
  logo: string;
  description: string;
  problems: string[];
};


// Deterministic (seeded by slug) so server and client render the same array.
export function demoReportData(seed: string, points = 40): number[] {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) | 0;
  const rand = () => {
    h = (h * 1103515245 + 12345) | 0;
    return ((h >>> 16) & 0x7fff) / 0x7fff;
  };
  const hasOutage = rand() < 0.4;
  return Array.from({ length: points }, (_, i) => {
    const baseline = 2 + rand() * 6;
    const spiking = hasOutage && i >= points - 5;
    return Math.round(spiking ? baseline + 40 + rand() * 60 : baseline);
  });
}

export type ReportPoint = {
  time: string;
  reports: number;
  baseline: number;
};

// Half-hourly points for the last 24 hours, seeded like demoReportData.
export function demoHourlyReportData(
  seed: string,
  now = Date.now(),
): ReportPoint[] {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) | 0;
  const rand = () => {
    h = (h * 1103515245 + 12345) | 0;
    return ((h >>> 16) & 0x7fff) / 0x7fff;
  };
  const points = 48;
  const dayMs = 24 * 60 * 60 * 1000;
  const start = now - dayMs;
  let baseline = 60 + rand() * 80;
  return Array.from({ length: points }, (_, i) => {
    const date = new Date(start + (i / points) * dayMs);
    baseline = Math.min(180, Math.max(50, baseline + (rand() - 0.45) * 15));
    const spike = rand() < 0.05 ? 60 + rand() * 120 : 0;
    const reports = baseline + (rand() - 0.5) * 60 + spike;
    return {
      time: date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true }),
      reports: Math.round(Math.max(5, reports)),
      baseline: Math.round(baseline),
    };
  });
}

export type Comment = {
  name: string;
  hoursAgo: number;
  text: string;
};

const commenterNames = [
  "CJ",
  "Emery Hayward",
  "Brandy Peace",
  "Marcus T",
  "Elena Ruiz",
  "Sam K",
  "Dana Whitfield",
  "Priya N",
  "Jordan Lee",
];

const commentTexts = [
  "Down due to an external power outage on Barna in Titusville FL. Says restore by 330am.",
  "My router keeps going offline non stop in Hernando county FL area",
  "Out due to a storm in the Rome ga area this is Tv/Internet and phone",
  "Anyone else getting constant disconnects since this morning?",
  "Been down for 2 hours in the Austin area. No ETA from support.",
  "Works again for me after restarting the router twice.",
  "Still down in Phoenix, support line is completely jammed.",
  "Intermittent outages all evening in the Denver metro.",
  "App says all good but nothing loads on my end.",
];

// Deterministic (seeded by slug) demo comments, oldest last.
export function demoComments(seed: string, count = 9): Comment[] {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) | 0;
  const rand = () => {
    h = (h * 1103515245 + 12345) | 0;
    return ((h >>> 16) & 0x7fff) / 0x7fff;
  };
  let hoursAgo = 1 + Math.floor(rand() * 4);
  return Array.from({ length: count }, (_, i) => {
    hoursAgo += Math.floor(rand() * 5);
    return {
      name: commenterNames[(i + Math.floor(rand() * 3)) % commenterNames.length],
      hoursAgo,
      text: commentTexts[Math.floor(rand() * commentTexts.length)],
    };
  });
}

export const services: Service[] = [
  {
    id: "776f18a7-4f8b-4183-8f70-59c21f861616",
    slug: "linkedin",
    name: "LinkedIn",
    logo: "/logos/linkedin.svg",
    description: "Professional networking and job search platform.",
    problems: [
      "Feed not loading",
      "Can't send messages",
      "Login issues",
      "Job search broken",
    ],
  },
  {
    id: "513fbf5d-7113-480d-8027-a9cdaf4f0de5",
    slug: "linktree",
    name: "Linktree",
    logo: "/logos/linktree.png",
    description: "Link-in-bio landing page tool for creators.",
    problems: [
      "Page not loading",
      "Links redirect incorrectly",
      "Editor not saving",
    ],
  },
  {
    id: "ce53f987-ff35-4bde-872e-7c11a2c5934f",
    slug: "blink-charging",
    name: "Blink Charging",
    logo: "/logos/blink-charging.png",
    description: "Electric vehicle charging network and equipment.",
    problems: [
      "Charger offline",
      "App can't start session",
      "Payment declined",
    ],
  },
  {
    id: "7c1a8e65-9a80-41f2-bdd7-94a2c35318f0",
    slug: "spotify",
    name: "Spotify",
    logo: "/logos/spotify.svg",
    description: "Music and podcast streaming service.",
    problems: [
      "Songs won't play",
      "App keeps crashing",
      "Search not working",
      "Offline downloads missing",
    ],
  },
  {
    id: "113becea-c489-4774-952e-57037eb14096",
    slug: "youtube",
    name: "YouTube",
    logo: "/logos/youtube.png",
    description: "Video sharing and streaming platform.",
    problems: [
      "Videos buffering",
      "Comments not loading",
      "Upload stuck",
      "Playback error",
    ],
  },
  {
    id: "bb57ceb3-e405-4ef7-979c-e480b9613ca1",
    slug: "call-of-duty",
    name: "Call of Duty",
    logo: "/logos/call-of-duty.png",
    description: "Online multiplayer first-person shooter franchise.",
    problems: [
      "Can't connect to servers",
      "Matchmaking stuck",
      "High ping / lag",
      "Game crashes on launch",
    ],
  },
  {
    id: "3c7f15b7-43f0-4ec1-93cd-89718c723b07",
    slug: "x-twitter",
    name: "X (Twitter)",
    logo: "/logos/x-twitter.svg",
    description: "Social media platform for short posts and news.",
    problems: [
      "Timeline not refreshing",
      "Can't post",
      "DMs not sending",
      "Media won't load",
    ],
  },
  {
    id: "47cefbc6-6edd-4be3-b557-4c3b3b2b1b0d",
    slug: "claude-ai",
    name: "Claude AI",
    logo: "/logos/claude-ai.png",
    description: "AI assistant by Anthropic for chat and coding.",
    problems: [
      "Responses not loading",
      "Capacity constraints",
      "Login issues",
      "API errors",
    ],
  },
  {
    id: "2960fe3c-67af-4f4a-a509-e123804f5bd0",
    slug: "optimum-cablevision",
    name: "Optimum / Cablevision",
    logo: "/logos/optimum-cablevision.png",
    description: "Cable TV, internet, and phone provider.",
    problems: [
      "Internet outage",
      "Slow speeds",
      "TV signal lost",
      "Router not connecting",
    ],
  },
  {
    id: "d2a82784-d37d-4bc3-aa31-8420c00def97",
    slug: "usps",
    name: "USPS",
    logo: "/logos/usps.png",
    description: "United States Postal Service mail and package delivery.",
    problems: [
      "Tracking not updating",
      "Website down",
      "Package delayed",
      "Can't schedule pickup",
    ],
  },
  {
    id: "eb1e98d7-7f56-459f-9f24-495d3d369af7",
    slug: "samsung",
    name: "Samsung",
    logo: "/logos/samsung.png",
    description: "Electronics maker: phones, TVs, and appliances.",
    problems: [
      "SmartThings not responding",
      "Account login issues",
      "Software update failing",
    ],
  },
  {
    id: "0c0bc7f7-32f3-4820-ad7b-c94713c3f2c2",
    slug: "steam",
    name: "Steam",
    logo: "/logos/steam.png",
    description: "PC gaming store, library, and community.",
    problems: [
      "Store not loading",
      "Downloads stuck",
      "Friends list offline",
      "Can't launch games",
    ],
  },
  {
    id: "acdf04c2-dc81-43d6-81cf-5960e2deeecc",
    slug: "discord",
    name: "Discord",
    logo: "/logos/discord.png",
    description: "Voice, video, and text chat for communities.",
    problems: [
      "Messages not sending",
      "Voice chat cutting out",
      "Can't connect",
      "Server outage",
    ],
  },
  {
    id: "5676993f-bffd-4b9f-a237-9509bed1e377",
    slug: "netflix",
    name: "Netflix",
    logo: "/logos/netflix.svg",
    description: "Subscription video streaming service.",
    problems: [
      "Playback error",
      "App won't open",
      "Buffering constantly",
      "Login issues",
    ],
  },
  {
    id: "46305af1-d3ac-4250-9d2a-022e1ad345cb",
    slug: "instagram",
    name: "Instagram",
    logo: "/logos/instagram.png",
    description: "Photo and video sharing social network.",
    problems: [
      "Feed not loading",
      "Stories won't post",
      "DMs broken",
      "Account locked out",
    ],
  },
  {
    id: "1f789024-55cd-4444-9c17-b7bde47f58c2",
    slug: "facebook",
    name: "Facebook",
    logo: "/logos/facebook.png",
    description: "Social networking platform by Meta.",
    problems: [
      "News feed blank",
      "Can't log in",
      "Messenger not connecting",
      "Pages not loading",
    ],
  },
  {
    id: "e7c09635-2b47-4d7e-b2e0-0b1c9da835a1",
    slug: "whatsapp",
    name: "WhatsApp",
    logo: "/logos/whatsapp.svg",
    description: "Encrypted messaging and calling app.",
    problems: [
      "Messages not delivering",
      "Calls dropping",
      "Stuck on connecting",
      "Backup failing",
    ],
  },
  {
    id: "22ea7574-685c-46ac-bbf1-9bdfea6f0f14",
    slug: "gmail",
    name: "Gmail",
    logo: "/logos/gmail.svg",
    description: "Google's email service.",
    problems: [
      "Emails not arriving",
      "Can't send mail",
      "Attachment errors",
      "Login loop",
    ],
  },
  {
    id: "3546e35d-3135-48d7-996d-6f8e408f6ce8",
    slug: "google",
    name: "Google",
    logo: "/logos/google.png",
    description: "Search engine and web services.",
    problems: [
      "Search not loading",
      "Drive unavailable",
      "Maps not responding",
      "Account sign-in issues",
    ],
  },
  {
    id: "56b5a8d3-de12-4cd0-b605-bcfbffc79133",
    slug: "amazon",
    name: "Amazon",
    logo: "/logos/amazon.svg",
    description: "Online retail and cloud services giant.",
    problems: [
      "Website down",
      "Checkout failing",
      "Orders not updating",
      "Prime Video buffering",
    ],
  },
  {
    id: "bc803c20-f690-42c3-969e-f8d344372453",
    slug: "paypal",
    name: "PayPal",
    logo: "/logos/paypal.png",
    description: "Online payments and money transfers.",
    problems: [
      "Payment not going through",
      "Can't log in",
      "Transfer delayed",
      "App error",
    ],
  },
  {
    id: "3436313e-0fc4-43b7-9ae2-0aea3989b18b",
    slug: "reddit",
    name: "Reddit",
    logo: "/logos/reddit.png",
    description: "Community forums and discussion boards.",
    problems: [
      "Feed won't load",
      "Comments missing",
      "Can't post",
      "App crashing",
    ],
  },
  {
    id: "604042e4-3f73-4774-8c27-bb737f6b3ddf",
    slug: "tiktok",
    name: "TikTok",
    logo: "/logos/tiktok.png",
    description: "Short-form video sharing platform.",
    problems: [
      "Videos not loading",
      "Upload stuck",
      "For You page frozen",
      "Login issues",
    ],
  },
  {
    id: "1331015e-9508-4d0b-b292-570734c0f5d6",
    slug: "twitch",
    name: "Twitch",
    logo: "/logos/twitch.png",
    description: "Live streaming platform for gaming and more.",
    problems: [
      "Streams buffering",
      "Chat not connecting",
      "Can't go live",
      "VODs unavailable",
    ],
  },
  {
    id: "47688b3d-2f88-4c5a-97a5-0b0d2782b870",
    slug: "zoom",
    name: "Zoom",
    logo: "/logos/zoom.png",
    description: "Video conferencing and online meetings.",
    problems: [
      "Can't join meeting",
      "Audio cutting out",
      "Video freezing",
      "Login errors",
    ],
  },
  {
    id: "05808715-cffc-4ccd-8e68-51b4d201f679",
    slug: "github",
    name: "GitHub",
    logo: "/logos/github.png",
    description: "Code hosting and collaboration platform.",
    problems: [
      "Git push failing",
      "Actions not running",
      "Pages down",
      "API errors",
    ],
  },
  {
    id: "3c76f759-6225-4541-a94c-57c77a670d51",
    slug: "cloudflare",
    name: "Cloudflare",
    logo: "/logos/cloudflare.png",
    description: "CDN, DNS, and web security provider.",
    problems: [
      "522 connection timed out",
      "DNS not resolving",
      "Dashboard down",
      "Widespread site outages",
    ],
  },
  {
    id: "93d487dc-c3b8-4a43-9028-6b8f66b2d62b",
    slug: "verizon",
    name: "Verizon",
    logo: "/logos/verizon.svg",
    description: "Mobile carrier and internet provider.",
    problems: [
      "No signal",
      "Mobile data not working",
      "Calls dropping",
      "SOS mode stuck",
    ],
  },
  {
    id: "e281295b-2581-44ed-8930-2c3c6787af65",
    slug: "att",
    name: "AT&T",
    logo: "/logos/att.svg",
    description: "Telecommunications and wireless carrier.",
    problems: [
      "Network outage",
      "Slow data speeds",
      "Text messages failing",
      "Fiber internet down",
    ],
  },
  {
    id: "a7667dda-f874-4d58-8f5d-d49e6ec335f0",
    slug: "roblox",
    name: "Roblox",
    logo: "/logos/roblox.png",
    description: "Online game platform and creation system.",
    problems: [
      "Can't join games",
      "Error code 277",
      "Avatar not loading",
      "Purchases failing",
    ],
  },
];

const trendingSlugs = ["spotify", "optimum-cablevision", "usps", "x-twitter"];

export const trending = trendingSlugs
  .map((slug) => services.find((s) => s.slug === slug))
  .filter((s) => s !== undefined);
