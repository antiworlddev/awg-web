"use client";

/* eslint-disable */
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
/* eslint-enable */
import "@splidejs/react-splide/css";
import ProjectCard from "./project-card";
import { ProjectProps } from "@/helpers/types";

export default function Carousel({ projects }: { projects: ProjectProps[] }) {
  return (
    <div className="mt-6 w-screen px-16">
      <Splide
        aria-label="My Favorite Images"
        className="flex justify-center items-center"
        options={{
          rewind: true,
          perPage: 3,
          breakpoints: {
            1000: {
              perPage: 2,
            },
            640: {
              perPage: 1,
            },
          },

          drag: "free",
        }}
      >
        {projects?.map((p, i) => (
          <SplideSlide key={i} className="flex items-center justify-center">
            <ProjectCard
              art={p.art}
              artist={p.artist}
              project={p.project}
              title={p.title}
              link={p.link}
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
