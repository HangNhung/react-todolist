import { format } from "date-fns";
import React, { useState, useRef, useEffect } from "react";
import { FiPlus, FiCalendar } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleCompleted, updateTodo } from "../ToDoSlice";
import { create_UUID } from "../utils/uuid";
import Checkbox from "./Checkbox";
import DatePicker from "./DatePicker";
import Task from "./Task";

const TodoList = () => {
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString("en-US", { weekday: "long" });
  const month = today.toLocaleDateString("en-US", { month: "long" });
  const date = today.toLocaleDateString("en-US", { day: "numeric" });
  const [isInputFocus, setIsInputFocus] = useState(false);
  const ref = useRef();

  const [iconButton, setIconButton] = useState("");
  // Date
  const [showCalendar, setShowCalendar] = useState(false);
  const [selected, setSelected] = useState();

  const todoList = useSelector((state) => state.todo.todoList);
  const [showInput, setShowInput] = useState(false);
  const [newTask, setNewTask] = useState("");

  // const [taskId, setTaskId] = useState(null);
  // const [inputEditValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsInputFocus(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const handleChange = (e) => {
    const value = e.target.value;
    setNewTask(value);
  };

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addTodo({
        id: create_UUID(),
        task: newTask,
        date: selected,
      })
    );
    setNewTask("");
    toggleInput();
  };

  const onDateChange = (selectedDate) => {
    setSelected(selectedDate);
    setShowCalendar(false);
  };

  return (
    <div className="flex-1 bg-gray-100 flex flex-col overflow-hidden">
      <div className="p-8">
        <p className="text-xl font-thin">My Day</p>
        <p className="text-gray-600 text-sm">{`${dayOfWeek}, ${month} ${date}`}</p>
      </div>
      <div className="flex-1 flex flex-col space-y-2 overflow-hidden">
        <form className="shadow-sm mx-8" ref={ref} onSubmit={onSubmit}>
          <div className="h-12 bg-white rounded border-1 px-4 py-2 flex space-x-4 items-center">
            {isInputFocus ? (
              <button
                type="button"
                onMouseEnter={() => setIconButton("hover")}
                onMouseLeave={() => setIconButton("")}
              >
                <Checkbox status={iconButton} />
              </button>
            ) : (
              <FiPlus className="text-blue-600 text-xl" />
            )}
            <input
              type="text"
              className={
                isInputFocus
                  ? "text-black"
                  : "text-blue-600 placeholder-blue-600"
              }
              value={newTask}
              placeholder="Add a task"
              onFocus={() => {
                // console.log("focus");
                setIsInputFocus(true);
              }}
              onChange={handleChange}
            />
          </div>
          <div
            className={`bg-gray-50 rounded border-1 transition-all ${
              isInputFocus ? "h-12" : "h-0"
            }`}
          >
            <div
              className={isInputFocus ? "block relative px-4 py-2" : "hidden"}
            >
              <div className="flex justify-between items-center w-full">
                <button
                  type="button"
                  className={`flex space-x-2 items-center ${
                    Boolean(selected) ? "border border-gray-400" : ""
                  }   rounded-md px-1} cursor-pointer`}
                  onClick={() => {
                    console.log("show calendar");
                    setShowCalendar(!showCalendar);
                  }}
                >
                  <FiCalendar className="relative" />

                  {Boolean(selected) && <p className="text-sm">{selected}</p>}
                </button>
                <div
                  className={`${
                    showCalendar ? "visible opacity-1" : "invisible opacity-0"
                  } absolute top-10 bg-white rounded shadow-sm transition-all`}
                >
                  <DatePicker onSave={onDateChange} />
                </div>
                <button
                  type="submit"
                  className="border px-2 py-1 text-sm disabled:bg-white disabled:text-gray-200"
                  disabled={!newTask}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="flex-1 overflow-auto">
          {todoList.map((props) => (
            <Task key={props.id} {...props} />
          ))}
        </div>
      </div>

      {/* {showInput && (
        <form className="flex" onSubmit={onSubmit}>
          <input
            type="text"
            className="h-10 p-2 border-2 border-yellow-300 rounded bg-transparent "
            value={newTask}
            onChange={handleChange}
          />
          <div class="flex space-x-2 ml-2">
            <button
              type="submit"
              class="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add
            </button>
            <button
              class="w-1/2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded truncate"
              onClick={toggleInput}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <div className="flex items-center space-x-2">
        <FiPlusSquare
          className="text-lg cursor-pointer"
          onClick={toggleInput}
        />
        <span>Add Task</span>
      </div>
      {todoList.map(({ id, task, completed }, index) => (
        <ul key={id}>
          <li className="flex items-center space-x-1">
            {taskId && taskId === id ? (
              <input
                className="border-2 border-black p-1 "
                type="text"
                value={inputEditValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            ) : (
              <span className={completed ? "line-through" : ""}>
                {index + 1}.{task}
              </span>
            )}

            {completed ? (
              <FiRefreshCcw
                className="cursor-pointer"
                onClick={() => {
                  dispatch(toggleCompleted(id));
                }}
              />
            ) : (
              <div className="flex space-x-1">
                {taskId ? (
                  <>
                    <FiCheck
                      className="cursor-pointer text-green-800 font-bold"
                      onClick={() => {
                        dispatch(
                          updateTodo({
                            id,
                            task: inputEditValue,
                          })
                        );
                        setTaskId(null);
                      }}
                    />
                    <FiX
                      className="cursor-pointer text-yellow-400 font-bold"
                      onClick={() => setTaskId(null)}
                    />
                  </>
                ) : (
                  <>
                    <FiCheck
                      className="cursor-pointer text-green-800 font-bold"
                      onClick={() => {
                        dispatch(toggleCompleted(id));
                      }}
                    />
                    <FiEdit
                      className="cursor-pointer text-yellow-400 font-bold"
                      onClick={() => {
                        setTaskId(id);
                        setInputValue(task);
                      }}
                    />
                  </>
                )}
              </div>
            )}
          </li>
        </ul>
      ))} */}
    </div>
  );
};

export default TodoList;
