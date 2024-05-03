import { Add, Circle, MoreHoriz } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Tasks from "./Tasks";
import { useEffect, useState } from "react";
import TaskDialog from "./TaskDialog";
import type { Category, Task } from "@/types/categories";
import { useDispatch } from "react-redux";
import { EditCategory, deleteCategory } from "./Store/store";
import AddCategoryDialog from "./AddCategoryDialog";
interface props {
  name: string;
  tasks: Task[] | undefined;
  checkSortDate: boolean;
  checkSortSeverity: string;
}
const Categories: React.FC<props> = ({
  checkSortSeverity,
  name,
  tasks,
  checkSortDate,
}) => {
  const [menu, setMenu] = useState<boolean>(false);
  const Dispatch = useDispatch();
  const [allTask, setAllTask] = useState<Task[] | undefined>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [createtask, setCreatetask] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editCategory, setEditCategory] = useState<Category>({ name: name });
  useEffect(() => {
    return setAllTask(tasks);
  }, [tasks]);

  useEffect(() => {
    if (tasks?.length !== 0 && tasks) {
      if (checkSortDate) {
        const DatesortedTask = [...tasks]?.sort(
          (a, b) =>
            new Date(b.issue_date).getTime() - new Date(a.issue_date).getTime(),
        );
        setAllTask(DatesortedTask);
      } else {
        setAllTask(tasks);
      }
    }
  }, [checkSortDate, tasks]);
  useEffect(() => {
    if (tasks?.length !== 0 && tasks) {
      if (checkSortSeverity !== "All") {
        setAllTask(tasks.filter((x) => x.severity === checkSortSeverity));
      } else {
        setAllTask(tasks);
      }
    }
  }, [tasks, checkSortSeverity]);
  const handleEditCategory = () => {
    if (editCategory.name !== "") {
      Dispatch(EditCategory({ OldCategoryName: name, NewCategoryName: editCategory.name }));
      setOpenDialog(false);
    }
  };
  const handleDeleteCategory = () => {
    Dispatch(deleteCategory({ CategoryName: name }));
    setMenu(false);
  };
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
              <MenuItem
                className="!text-[12px]"
                onClick={() => setOpenDialog(true)}
              >
                Edit Category
              </MenuItem>
              <MenuItem className="!text-[12px]" onClick={handleDeleteCategory}>
                Remove Category
              </MenuItem>
            </Menu>
            <AddCategoryDialog
              open={openDialog}
              setOpen={setOpenDialog}
              onClick={handleEditCategory}
              value={editCategory?.name}
              setValue={setEditCategory}
            />
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
            categoryName={name}
            />
          ))}
      </div>
    </div>
  );
};

export default Categories;
