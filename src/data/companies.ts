export interface Company {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  image: string;
  websiteUrl?: string;
  highlights?: string[];
}

export const COMPANIES: Company[] = [
  {
    id: "brand-monk-consulting",
    name: "Brand Monk Consulting",
    category: "CONSULTING",
    location: "Coimbatore, India",
    description:
      "Brand Monk Consulting acts as the digital acquisition arm for our group and our clients. We combine advanced performance marketing with AI automation to engineer predictable, scalable business growth.",
    image: "/images/image copy 3.png",
    websiteUrl: "https://brandmonkconsulting.com/",
    highlights: ["Corporate Strategy", "Brand Engineering", "Market Expansion"],
  },
  {
    id: "brand-monk-academy",
    name: "Brand Monk Academy",
    category: "EDUCATION",
    location: "Coimbatore, India",
    description:
      "Brand Monk Academy is an agency-backed digital skills institute training professionals in AI-integrated marketing, design, and data analytics. We replace traditional theory with real-world execution to build employable talent.",
    image: "/images/DSC01858.JPG",
    websiteUrl: "https://brandmonkacademy.com/",
    highlights: ["50,000+ Alumni", "Corporate Placement", "AI Residencies"],
  },
  {
    id: "zika-designs",
    name: "Zika Designs",
    category: "DESIGN",
    location: "Coimbatore, India",
    description:
      "Zika Designs executes the physical manifestation of a brand, building high-end interiors for commercial, hospitality, and residential spaces. We combine smart space planning with premium aesthetics to create environments that perform as well as they look.",
    image: "/images/image copy 4.png",
    websiteUrl: "https://zikadesigns.com/",
    highlights: ["Luxury Branding", "UI/UX Architecture", "Spatial Design"],
  },
  {
    id: "creamy-crush",
    name: "Creamy Crush",
    category: "FOOD & BEVERAGES",
    location: "Coimbatore, India",
    description:
      "Creamy Crush is our dedicated dessert brand bringing premium softy ice creams, faloodas, and signature sundaes to every neighborhood. We combine rich ingredients and fun creations to make life a little sweeter, one scoop at a time.",
    image: "/images/image copy.png",
    websiteUrl: "https://creamycrush.com/",
    highlights: ["Artisanal FMCG", "Cloud Kitchen Ops", "Franchise Scale"],
  },
  {
    id: "pickmyaiagent",
    name: "PickMyAIAgent",
    category: "ARTIFICIAL INTELLIGENCE",
    location: "Coimbatore, India",
    description:
      "PickMyAIAgent serves as a curated marketplace for specialized AI agents, SaaS tools, and business automation software. We give growing companies instant access to plug-and-play AI solutions designed to streamline every area of operations.",
    image: "/images/Modern Workspace with AI Agent iMac copy.png",
    websiteUrl: "https://pickmyaiagent.com/",
    highlights: ["Multi-Agent AI", "Autonomous Ops", "Enterprise LLMs"],
  },
  {
    id: "restaurant-consulting",
    name: "Restaurant Consulting",
    category: "CONSULTING",
    location: "Hyderabad, India",
    description:
      "Restaurant Consulting delivers end-to-end operational blueprints for food brands, cafés, and cloud kitchens. From kitchen workflows to menu engineering, we install the exact systems needed to run a profitable food business.",
    image: "/images/image copy 6.png",
    websiteUrl: "https://restaurantconsulting.in/",
    highlights: ["Culinary R&D", "Franchise Architecture", "Yield Mgmt"],
  },
  {
    id: "bocs-pizza",
    name: "BOCS Pizza",
    category: "FOOD & BEVERAGES",
    location: "Chennai, India",
    description:
      "BOCS Pizza is our flagship food franchise offering a high-value, square-pizza menu built for local palates. It operates on a zero-friction, highly efficient retail model that guarantees consistent quality and high margins.",
    image: "/images/image copy 2.png",
    websiteUrl: "https://bocspizza.com/",
    highlights: ["Artisanal Craft", "High-Tech Kitchens", "Rapid Logistics"],
  },
  {
    id: "digital-learners-hub",
    name: "Digital Learners Hub",
    category: "EDUCATION",
    location: "Global Online",
    description:
      "Digital Learners Hub democratizes high-income skills by providing expert-led digital training in regional languages. We equip ambitious individuals with actionable knowledge across technical, creative, and commercial fields to create new revenue streams.",
    image: "/images/Digital Learners Hub Workspace.png",
    websiteUrl: "https://www.digitallearnershub.com/",
    highlights: ["Executive Certifications", "Adaptive Learning", "Global Access"],
  },
];
