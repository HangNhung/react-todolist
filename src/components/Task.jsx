import React, { useEffect, useState } from "react";
import { FiEdit, FiStar, FiTrash2, FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toggleCompleted } from "../ToDoSlice";
import Checkbox from "./Checkbox";

const Task = ({ id, task, date, completed }) => {
  const dispatch = useDispatch();
  const [iconButton, setIconButton] = useState("");

  useEffect(() => {
    setIconButton(completed ? "completed" : "");
  }, [completed]);

  return (
    <div className="mx-8 h-12 bg-white rounded border-1 px-4 py-2 flex justify-between space-x-4 items-center mb-4">
      <div className="flex space-x-4">
        <button
          type="button"
          onMouseEnter={() => {
            if (!completed) {
              setIconButton("hover");
            }
          }}
          onMouseLeave={() => {
            setIconButton(completed ? "completed" : "");
          }}
        >
          <Checkbox
            status={iconButton}
            onClick={() => {
              dispatch(toggleCompleted(id));
            }}
          />
        </button>
        <p className={completed ? "line-through" : ""}>
          {date ? `${date} - ${task}` : task}
        </p>
      </div>
      <div className="flex space-x-2">
        <FiEdit className="text-blue-400" />
        <FiTrash2 className="text-gray-600" />
        <FiStar className="text-yellow-400" />
      </div>
    </div>
  );
};

export default Task;
