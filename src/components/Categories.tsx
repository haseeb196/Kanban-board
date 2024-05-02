import { Add, Circle, MoreHoriz } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Tasks from "./Tasks";
import { useState } from "react";
import TaskDialog from "./TaskDialog";
import { Task } from "@/types/categories";
interface props {
  name: string;
  tasks: Task[];
}
const Categories: React.FC<props> = ({ name, tasks }) => {
  const [menu, setMenu] = useState<boolean>(false);
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
  return (
    <div className="!min-w-[270px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[5px] text-lg">
          <Circle className="!h-2 !w-2 !text-green-600" />
          <h3 className="font-semibold">{name}</h3>
          <p className="font-medium text-gray-500">2</p>
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
          <TaskDialog open={createtask} setOpen={setCreatetask} />
        </div>
      </div>
      <div className="space-y-2">
      {tasks.map((x) => <Tasks key={x.name} />)}
      </div>
    </div>
  );
};

export default Categories;
