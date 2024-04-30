import { Circle, Stars, Verified } from "@mui/icons-material";

const Task = () => {
  return (
    <div className="rounded-lg border-[1px] border-gray-200 px-2 py-2 font-medium shadow-sm">
      <div className="flex items-center justify-between text-[12px] text-gray-400">
        <div className="flex items-center gap-[6px]">
          <p>#8793</p>
          <Circle className="!h-1 !w-1" />
          <span>3 Jan, 4:35 PM</span>
        </div>
        <Stars className="!h-5 !w-5 text-black" />
      </div>
      <div className="truncate text-[15px] mb-2">
        <p>.svn/entries Found</p>
      </div>
      <div className="flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-2">
          <p className="rounded-full  border-[1px] border-red-500 bg-red-500 px-2">
            Critical
          </p>
          <p className="rounded-full border-[1px] border-purple-400 bg-purple-200 px-2 text-purple-800">
            Hypejab
          </p>
        </div>
        <Verified className="!h-[18px] !w-[18px] text-blue-600" />
      </div>
    </div>
  );
};

export default Task;
