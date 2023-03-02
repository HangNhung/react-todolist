import React, { useState, useRef, useEffect, useMemo } from "react";
import { FiPlus, FiCalendar } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, setTodoList } from "../ToDoSlice";
import { create_UUID } from "../utils/uuid";
import Checkbox from "./Checkbox";
import DatePicker from "./DatePicker";
import Modal from "./Modal";
import Task from "./Task";

const TodoList = () => {
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString("en-US", { weekday: "long" });
  const month = today.toLocaleDateString("en-US", { month: "long" });
  const date = today.toLocaleDateString("en-US", { day: "numeric" });
  const [isInputFocus, setIsInputFocus] = useState(false);
  const ref = useRef();
  const currentTaskRef = useRef();

  const [iconButton, setIconButton] = useState("");
  // Date
  const [showCalendar, setShowCalendar] = useState(false);
  const [selected, setSelected] = useState();

  const [showCompletedList, setShowCompletedList] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const showDeleteModal = () => setOpenDeleteModal(true);
  const closeDeleteModal = () => setOpenDeleteModal(false);

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

  const numberCompletedList = useMemo(() => {
    return todoList.filter((task) => task.completed).length;
  }, [todoList]);

  const deleteTask = () => {
    let newTodoList = [...todoList].filter(
      (task) => task.id !== currentTaskRef.current?.id
    );
    dispatch(setTodoList(newTodoList));
    // close modal and clear ref
    closeDeleteModal();
    currentTaskRef.current = {};
  };

  return (
    <div className="flex-1 bg-gray-100 flex flex-col overflow-hidden relative">
      <Modal
        open={openDeleteModal}
        close={closeDeleteModal}
        task={currentTaskRef.current?.task}
        onConfirm={deleteTask}
      />
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
          {[...todoList]
            .filter((task) => !task.completed)
            .sort((a, b) => b.important - a.important)
            .map((props) => (
              <Task
                key={props.id}
                {...props}
                onDelete={() => {
                  currentTaskRef.current = props;
                  showDeleteModal();
                }}
              />
            ))}
          <div
            className={`${
              Boolean(numberCompletedList) ? "block" : "hidden"
            } mx-8 h-12 px-4 py-2 flex space-x-4 items-center mb-4`}
          >
            <button
              type="button"
              className={`${
                showCompletedList ? "rotate-90" : "rotate-0"
              } transition-all`}
              onClick={() => setShowCompletedList(!showCompletedList)}
            >
              <IoIosArrowForward />
            </button>
            <div className="flex space-x-2">
              <p className="text-sm font-bold">Completed</p>
              <p className="text-sm text-gray-700">{numberCompletedList}</p>
            </div>
          </div>
          {showCompletedList &&
            [...todoList]
              .filter((task) => task.completed)
              .sort((a, b) => b.important - a.important)
              .map((props) => (
                <Task
                  key={props.id}
                  {...props}
                  onDelete={() => {
                    currentTaskRef.current = props;
                    showDeleteModal();
                  }}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
