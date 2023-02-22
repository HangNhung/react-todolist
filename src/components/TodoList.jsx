import React, { useState } from "react";
import {
  FiPlusSquare,
  FiCheck,
  FiRefreshCcw,
  FiEdit,
  FiX,
  FiSettings,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleCompleted, updateTodo } from "../ToDoSlice";

const TodoList = () => {
  const todoList = useSelector((state) => state.todo.todoList);
  const [showInput, setShowInput] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [taskId, setTaskId] = useState(null);
  const [inputEditValue, setInputValue] = useState("");
  const dispatch = useDispatch();

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
    <div className="flex flex-col space-y-2 pt-8">
      {showInput && (
        <form className="flex" onSubmit={onSubmit}>
          <input
            type="text"
            className="h-10 p-2 border-2 border-yellow-300 rounded bg-transparent outline-none"
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
                className="border-2 border-black p-1 outline-none"
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
      ))}
    </div>
  );
};

export default TodoList;
