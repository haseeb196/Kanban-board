import type { Label} from "@/types/categories";
import { Close } from "@mui/icons-material";
import { Dialog, DialogTitle } from "@mui/material";
import React, {
  type SetStateAction,
  type Dispatch,
  type FC,
  useState,
  useEffect,
  useRef,
} from "react";
interface props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const TaskDialog: FC<props> = ({ open, setOpen }) => {
  const [selectedLabelColor, setSelectedLabelColor] = useState<string>("green");
  const [label, setLabel] = useState<string>("");

  const [severity, setSeverity] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [labelError, setLabelError] = useState<string>("");
  const [allLabels, setAllLabels] = useState<Label[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleClick = () => {
      setLabelError("");
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("click", handleClick);
      inputElement.addEventListener("input", handleClick);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("click", handleClick);
        inputElement.removeEventListener("input", handleClick);
      }
    };
  }, [setLabelError, label]);
  const handleTask = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
  };
  const LabelcolorVariant = {
    blue: "bg-blue-300 border-blue-500 text-blue-900",
    purple: "bg-purple-300 border-purple-500 text-purple-900",
    green: "bg-green-300 border-green-500 text-green-900",
  };
  const handleLabels = () => {
    if (label !== "") {
      if (label.length >= 15) {
        setLabelError("Label character limit: 15");
      } else {
        if (allLabels.find((x) => x.name !== label)) {
          setAllLabels((prev) => [
            ...prev,
            { name: label, color: selectedLabelColor },
          ]);
        } else {
          setLabelError("Label Already Exists");
        }
        setLabel("");
      }
    }
  };
  const handleRemveLabel = (LabelName: string) => {
    const filteredlabels = allLabels.filter((x) => x.name !== LabelName);
    setAllLabels(filteredlabels);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create Task</DialogTitle>
      <form
        className="flex w-[450px] flex-col gap-2 px-4 pb-4"
        onSubmit={handleTask}
      >
        <label htmlFor="title">
          Title<span className="text-red-600">*</span>:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
          className="rounded-sm border-[1px] border-gray-300 px-2 py-1 outline-none"
        />
        <label htmlFor="description">
          Description<span className="text-red-600">*</span>:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          cols={50}
          rows={4}
          className="resize-none rounded-sm border-[1px] border-gray-300 px-2 py-1 outline-none"
        />
        <div className="space-y-2">
          <div className="space-y-2">
            {" "}
            <p>Severity:</p>
            <div className="flex gap-3">
              <p
                onClick={() => setSeverity("low")}
                className={`rounded-md px-2 py-1 transition-colors hover:bg-yellow-600 ${severity === "low" ? "bg-yellow-600" : "bg-yellow-300"}`}
              >
                low
              </p>
              <p
                onClick={() => setSeverity("medium")}
                className={`rounded-md transition-colors hover:bg-orange-500 ${severity === "medium" ? "bg-orange-500" : "bg-orange-400"} px-2 py-1`}
              >
                medium
              </p>
              <p
                onClick={() => setSeverity("high")}
                className={`rounded-md transition-colors hover:bg-red-500 ${severity === "high" ? "bg-red-500" : "bg-red-300"} px-2 py-1`}
              >
                high
              </p>
              <p
                onClick={() => setSeverity("critical")}
                className={`rounded-md transition-colors hover:bg-red-600 ${severity === "critical" ? "bg-red-600" : "bg-red-400"} px-2 py-1`}
              >
                critical
              </p>
            </div>
          </div>
          <div>
            <div className="space-y-2">
              <div className="space-y-1">
                <div className="space-y-1">
                  <p>Add Labels:</p>
                  <div className="space-x-1">
                    <input
                      ref={inputRef}
                      type="text"
                      onChange={(e) => setLabel(e.target.value)}
                      placeholder="Enter label"
                      value={label}
                      className="rounded-sm border-[1px] border-gray-300 px-2 outline-none"
                    />

                    <button
                      className="rounded-sm bg-sky-500 px-2"
                      onClick={handleLabels}
                    >
                      Insert
                    </button>
                  </div>{" "}
                  {labelError !== "" && (
                    <div className="text-red-500">{labelError}</div>
                  )}
                </div>
                <div className="space-y-1">
                  <p>Select Label Color:</p>
                  <div className="flex items-center space-x-1">
                    <div
                      onClick={() => setSelectedLabelColor("green")}
                      className={`h-6 w-6 rounded-full bg-green-500 transition-colors ${selectedLabelColor === "green" && "border-[2px] border-black"}`}
                    />
                    <div
                      onClick={() => setSelectedLabelColor("purple")}
                      className={`h-6 w-6 rounded-full bg-purple-500  transition-colors ${selectedLabelColor === "purple" && "border-[2px] border-black"}`}
                    />
                    <div
                      onClick={() => setSelectedLabelColor("blue")}
                      className={`h-6 w-6 rounded-full bg-blue-500  transition-colors ${selectedLabelColor === "blue" && "border-[2px] border-black"}`}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-x-2 overflow-x-auto px-1">
                {allLabels.length !== 0 &&
                  allLabels.map((x) => (
                    <p
                      key={x.name}
                      className={`group flex items-center rounded-full border-[1px]  ${LabelcolorVariant[x.color as keyof typeof LabelcolorVariant]} px-3`}
                      onClick={() => handleRemveLabel(x.name)}
                    >
                      <span className="group-hover:hidden">{x.name}</span>
                      <span className="hidden group-hover:block">
                        <Close fontSize="small" />
                      </span>
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <button
          className="self-end rounded-lg bg-sky-400 px-2 py-1"
          type="submit"
        >
          Create
        </button>
      </form>
    </Dialog>
  );
};

export default TaskDialog;
