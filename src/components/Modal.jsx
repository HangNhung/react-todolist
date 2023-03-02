const noop = () => {};

const Modal = ({
  open = false,
  close = noop,
  onConfirm = noop,
  task = "",
  textConfirmButton = "Delete Task",
}) => {
  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } absolute w-full h-full bg-gray-900 bg-opacity-50`}
    >
      <div className="w-auto h-auto rounded shadow-ld bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 flex flex-col space-y-2">
        <p className="text-md font-bold">{`"${task}" will be permanently deleted.`}</p>
        <p className="text-md text-gray-500">
          You won't be able to do undo this action
        </p>
        <div className="flex justify-end space-x-2 items-center py-6">
          <button
            type="button"
            className="text-sm bg-gray-300 p-2 rounded"
            onClick={close}
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-sm bg-red-600 text-white p-2 rounded"
            onClick={onConfirm}
          >
            {textConfirmButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
