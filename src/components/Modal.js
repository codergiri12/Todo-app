import React, { useState } from "react";

const Modal = ({set,addTodo }) => {
  const [heading, setHeading] = useState("");
  const [subtasks, setSubTasks] = useState([]);
  const [task, setTask] = useState("");


  const add = () => {
    if (heading === "") {
      alert("Input is Empty");
    } else {
      addTodo({
        id: Math.floor(Math.random() * 10000),
        item: {
          title:heading,
          subtasks:subtasks
        } ,
        completed: false,
        archived:false,
      });
      setHeading("");
    }
  };
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center align-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-1 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start md:w-100">
              <div className="mt-3 text-center w-100">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900 underline"
                  id="modal-title"
                >
                  Create a Todo..
                </h3>
                <div className="mt-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 text-left mt-12"
                    htmlFor="username"
                  >
                    Title
                  </label>
                  <input
                    className=" appearance-none border border-3 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    value={heading}
                    onChange={(e) => {
                      setHeading(e.target.value);
                    }}
                    type="text"
                    placeholder="Title"
                  />
                  {heading !== "" &&
                    subtasks.map((item,sfs) => (
                      <p className="text-left leading-7 text-bold text-blue-400 px-2 py-2" key={sfs} >
                        {"->  "} {item.title}{" "}
                      </p>
                    ))}
                  {heading !== "" && (
                    <>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2 text-left mt-12"
                        htmlFor="username"
                      >
                        Add Sub Tasks/Lists.
                      </label>
                      <input
                        className="w-full md:w-3/5 appearance-none border border-3 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="xy"
                        value={task}
                        onChange={(e) => {
                          setTask(e.target.value);
                        }}
                        type="text"
                        placeholder="Title"
                      />
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-gray-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => {
                          setSubTasks([...subtasks, {title:task,checked:false}]);
                          setTask("");
                        }}
                      >
                        +Add subtask
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={() => {
                add();
                set(false);
              }}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-gray-700 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Create
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                
                set(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
