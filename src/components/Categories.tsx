import { Add, Circle, MoreHoriz } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Tasks from "./Tasks";
import { useEffect, useState } from "react";
import TaskDialog from "./TaskDialog";
import type { Task } from "@/types/categories";
interface props {
  name: string;
  tasks: Task[] | undefined;
  checkSortDate: boolean;
}
const Categories: React.FC<props> = ({ name, tasks, checkSortDate }) => {
  const [menu, setMenu] = useState<boolean>(false);
  const [allTask, setAllTask] = useState();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [createtask, setCreatetask] = useState<boolean>(false);
  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenu(true);
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenu(false);
    setAnchorEl(null);
  };
  useEffect(() => {
    setAllTask(tasks);
  }, [tasks]);
  useEffect(() => {
    if (checkSortDate) {
      const DatesortedTask = allTask?.sort(
        (a, b) =>
          new Date(a.issue_date).getTime() - new Date(b.issue_date).getTime(),
      );
      setAllTask(DatesortedTask);
    }
  }, [allTask, checkSortDate]);
  console.log(allTask);
  return (
    <div className="!min-w-[270px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[5px] text-lg">
          <Circle className="!h-2 !w-2 !text-green-600" />
          <h3 className="font-semibold capitalize">{name}</h3>
          <p className="font-medium text-gray-500">
            {tasks !== undefined || null ? tasks?.length : 0}
          </p>
        </div>
        <div className="flex space-x-1">
          <div>
            <IconButton onClick={handleMenu}>
              <MoreHoriz fontSize="small" />
            </IconButton>
            <Menu open={menu} onClose={handleMenuClose} anchorEl={anchorEl}>
              <MenuItem className="!text-[12px]">Edit Category</MenuItem>
              <MenuItem className="!text-[12px]">Remove Category</MenuItem>
            </Menu>
          </div>
          <IconButton onClick={() => setCreatetask(true)}>
            <Add fontSize="small" />
          </IconButton>
          <TaskDialog
            open={createtask}
            setOpen={setCreatetask}
            CategoryName={name}
          />
        </div>
      </div>
      <div className="space-y-2">
        {allTask?.length !== 0 &&
          allTask?.map((x: Task) => (
            <Tasks
              key={x.issue_title}
              issue_date={x.issue_date}
              issue_number={x.issue_number}
              issue_title={x.issue_title}
              description={x.description}
              severity={x.severity}
              verified={x.verified}
              label={x.label}
            />
          ))}
      </div>
    </div>
  );
};

export default Categories;
