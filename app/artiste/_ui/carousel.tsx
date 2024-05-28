"use client";

/* eslint-disable */
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
/* eslint-enable */
import "@splidejs/react-splide/css";
import ProjectCard from "./project-card";
import { ProjectProps } from "@/helpers/types";
import useWindowSize from "@/hooks/useWindowSize";

// Helper function to chunk array into groups
const chunkArray = (array: ProjectProps[], size: number) => {
  const result = [];
  for (let i = 0; i < array?.length; i += size) {
    result.push(array?.slice(i, i + size));
  }
  return result;
};

export default function Carousel({ projects }: { projects: ProjectProps[] }) {
  // Group projects into chunks of 4
  let { height, width } = useWindowSize();

  const chunkSize = width && width <= 768 ? 2 : 4;

  // Group projects into chunks
  const projectGroups = chunkArray(projects, chunkSize);

  return (
    <div className="mt-6 w-screen px-16">
      <Splide
        aria-label="My Favorite Images"
        className="flex justify-center items-center"
        options={{
          rewind: true,
          perPage: 1, // Show one group per slide
          breakpoints: {
            1000: {
              perPage: 1,
            },
            640: {
              perPage: 1,
            },
          },
          drag: "free",
        }}
      >
        {projectGroups.map((group, i) => (
          <SplideSlide key={i} className="flex items-center justify-center">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
              {group.map((p, j) => (
                <ProjectCard
                  key={j}
                  art={p.art}
                  artist={p.artist}
                  project={p.project}
                  title={p.title}
                  link={p.link}
                />
              ))}
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
