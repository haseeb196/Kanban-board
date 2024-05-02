import type { Task } from "@/types/categories";
import { Circle, Stars, Verified } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { LabelcolorVariant } from "./TaskDialog";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Tooltip } from "@mui/material";
const Tasks: React.FC<Task> = (task) => {
  const [labelColor, setLabelColor] = useState("");

  useEffect(() => {
    switch (task.severity) {
      case "low":
        setLabelColor("border-yellow-500 bg-yellow-500");
        break;
      case "medium":
        setLabelColor("border-orange-500 bg-orange-500");
        break;
      case "high":
        setLabelColor("border-red-500 bg-red-500");
        break;
      case "critical":
        setLabelColor("border-red-600 bg-red-600");
        break;
    }
  }, [task.severity]);

  return (
    <div className="rounded-lg border-[1px] border-gray-200 px-2 py-2 font-medium shadow-sm">
      <div className="flex items-center justify-between text-[12px] text-gray-400">
        <div className="flex items-center gap-[6px]">
          <p>#{task.issue_number}</p>
          <Circle className="!h-1 !w-1" />
          <span>{task.issue_date}</span>
        </div>
        <Stars className="!h-5 !w-5 text-black" />
      </div>
      <div className="mb-2 truncate text-[15px]">
        <p>{task.issue_title}</p>
      </div>
      <div className="flex items-center justify-between text-[12px]">
        <div className="flex  items-center gap-x-1">
          <p className={`${labelColor} rounded-full  border-[1px]  px-2`}>
            {task.severity}
          </p>

          <Swiper
            freeMode={true}
            slidesPerView={3}
            spaceBetween={5}
            className="flex !max-w-[190px] gap-x-1"
          >
            {task.label.length !== 0 &&
              task.label.map((x) => (
                <SwiperSlide
                  key={x.name}
                  className={`!min-w-max !whitespace-nowrap rounded-full border-[1px] px-2 text-center ${LabelcolorVariant[x.color as keyof typeof LabelcolorVariant]}`}
                >
                  {x.name}
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <Tooltip title="Verified by me">
          <Verified
            className={`!h-[18px] !w-[18px] ${task.verified ? "!text-blue-600" : "!text-gray-400"}`}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default Tasks;
