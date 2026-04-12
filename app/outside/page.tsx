"use client";

import { useAppContext } from "@/helpers/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "../ui/header";
import Calendar from "./_ui/calendar";
import { useQuery } from "@tanstack/react-query";
import { getCalendar } from "@/helpers/api-controller";
import { Blocks } from "react-loader-spinner";

export default function Outside() {
  const context = useAppContext();
  const router = useRouter();

  const {
    data: calendarData,
    isError: calendarError,
    refetch: refetchCalendar,
    isLoading: isCalendarLoading,
  } = useQuery({
    queryKey: ["calendar"],
    queryFn: () => getCalendar(),
  });

  const { cart } = context;
  return (
    <main className="flex flex-col lg:items-start items-center w-full md:px-10 px-6">
      <Header itemsCount={cart?.items?.length} />
      <div className="w-full mt-9">
        {/* Performance Banner */}
        <div className="md:w-full md:h-[70vh] w-full h-[30vh] relative">
          <Image
            fill={true}
            src="/gang/gang11.JPEG"
            alt="Performance shot wide"
            className="object-cover"
          />
        </div>
        <div>
          {isCalendarLoading ? (
            <div className="flex flex-col items-center w-full">
              <Blocks />
            </div>
          ) : (
            <Calendar events={calendarData?.calendar} />
          )}
        </div>
      </div>
    </main>
  );
}
