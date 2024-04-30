import { Dialog, DialogTitle } from "@mui/material";
import type { SetStateAction, Dispatch, FC } from "react";
interface props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const TaskDialog: FC<props> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create Task</DialogTitle>
      <form className="flex flex-col gap-2 px-4 pb-4">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Enter Title"
          className="border-[1px] border-gray-300 px-2 py-1 outline-none"
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          placeholder="Enter description"
          cols={50}
          rows={4}
          className="resize-none border-[1px] border-gray-300 px-2 py-1 outline-none"
        />
        <div className="space-y-2">
          <div className="space-y-2">
            {" "}
            <p>Severity:</p>
            <div className="flex gap-3">
              <p className="rounded-md bg-yellow-400 px-2 py-1">low</p>
              <p className="rounded-md bg-orange-400 px-2 py-1">medium</p>
              <p className="rounded-md bg-red-500 px-2 py-1">high</p>
              <p className="rounded-md bg-red-600 px-2 py-1">critical</p>
            </div>
          </div>
          <div>
            <p>Other labels:</p>
            <div>
                
            </div>
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default TaskDialog;
