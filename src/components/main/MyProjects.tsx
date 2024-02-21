import { myProjects } from "@/libs/constants/myProjects";
import { HeroParallax } from "../ui/hero-parallax";

const MyProjects = () => {
  return <HeroParallax products={myProjects} />;
};
export default MyProjects;
