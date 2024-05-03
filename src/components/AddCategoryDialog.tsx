import { type Category } from "@/types/categories";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import type { Dispatch, FC, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  setValue: Dispatch<SetStateAction<Category>>;
  onClick: () => void;
}
const AddCategoryDialog: FC<Props> = ({
  open,
  setOpen,
  value,
  setValue,
  onClick,
}) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent>
        <div className="flex flex-col gap-2">
          <label htmlFor="category-name">Category Name:</label>
          <input
            type="text"
            id="category-name"
            className="rounded-md border-[1px] border-gray-400 px-1 outline-none"
            placeholder="Enter Name"
            value={value}
            onChange={(e) => setValue({ name: e.target.value })}
          />
        </div>
        <DialogActions>
          <button className="rounded-md bg-sky-400 px-2 py-1" onClick={onClick}>
            Done
          </button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
