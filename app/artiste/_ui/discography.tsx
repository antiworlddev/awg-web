import Section from "@/app/ui/section";
import Carousel from "./carousel";
import { ProjectProps } from "@/helpers/types";

export default function Discography({
  font,
  projects,
}: {
  font: string;
  projects: ProjectProps[];
}) {
  return (
    <Section label="Discography" id="discography" font={font ?? ""}>
      <Carousel projects={projects} />
    </Section>
  );
}
