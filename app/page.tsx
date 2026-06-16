import HomeClient from "@/app/HomeClient";
import { getHomeTools, getProjetsHome } from "@/lib/data";

export default function HomePage() {
  const projects = getProjetsHome();
  const tools = getHomeTools();

  return <HomeClient projects={projects} tools={tools} />;
}
