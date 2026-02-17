import { getProjetsHome, getHomeTools } from "@/lib/data";
import HomeClient from "@/components/HomeClient";

export default function HomePage() {
  const projects = getProjetsHome();
  const tools = getHomeTools();
  
  return <HomeClient projects={projects} tools={tools} />;
}