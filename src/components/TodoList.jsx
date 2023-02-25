import React, { useState, useRef, useEffect } from "react";
import {
  FiPlusSquare,
  FiCheck,
  FiRefreshCcw,
  FiEdit,
  FiX,
  FiSettings,
  FiPlus,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleCompleted, updateTodo } from "../ToDoSlice";

const TodoList = () => {
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString("en-US", { weekday: "long" });
  const month = today.toLocaleDateString("en-US", { month: "long" });
  const date = today.toLocaleDateString("en-US", { day: "numeric" });
  const [isInputFocus, setIsInputFocus] = useState(false);
  const ref = useRef();

  const todoList = useSelector((state) => state.todo.todoList);
  const [showInput, setShowInput] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [taskId, setTaskId] = useState(null);
  const [inputEditValue, setInputValue] = useState("");
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
        id: new Date(),
        task: newTask,
      })
    );
    toggleInput();
  };

  return (
    <div className="flex-1 p-8 bg-gray-100">
      <p className="text-xl font-thin">My Day</p>
      <p className="text-gray-600 text-sm">{`${dayOfWeek}, ${month} ${date}`}</p>
      <div className="py-8">
        <div className="shadow-sm" ref={ref}>
          <div className="bg-white rounded border-1 px-4 py-2 flex space-x-2 items-center">
            {isInputFocus ? (
              <input className="w-4 h-4" type="checkbox" />
            ) : (
              <FiPlus className="text-blue-600 text-xl" />
            )}
            <input
              type="text"
              className={isInputFocus ? "text-black" : "text-blue-600"}
              value="Add a task"
              onFocus={() => setIsInputFocus(true)}
            />
          </div>
          <div
            className={`bg-gray-50 rounded border-1 flex space-x-2 items-center transition-all ${
              isInputFocus ? "h-8" : "h-0"
            }`}
          >
            <div className={`${isInputFocus ? "block px-4 py-2" : "hidden"}`}>
              task 1
            </div>
          </div>
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
