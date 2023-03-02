import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { HiOutlineStar, HiStar } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { toggleCompleted, toggleImportant } from "../ToDoSlice";
import Checkbox from "./Checkbox";

const Task = ({ id, task, date, completed, important }) => {
  const dispatch = useDispatch();
  const [iconButton, setIconButton] = useState("");

  useEffect(() => {
    setIconButton(completed ? "completed" : "");
  }, [completed]);

  return (
    <div className="animate-slide-fade-down mx-8 h-12 bg-white rounded border-1 px-4 py-2 flex justify-between space-x-4 items-center mb-4">
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
      <div className="flex space-x-2 items-center">
        <FiEdit className="text-blue-400" />
        <FiTrash2 className="text-gray-600" />
        <button
          type="button"
          onClick={() => {
            dispatch(toggleImportant(id));
          }}
        >
          {important ? (
            <HiStar size="1.25rem" className="text-yellow-300" />
          ) : (
            <HiOutlineStar
              size="1.25rem"
              className="text-yellow-300 active:scale-50"
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default Task;
