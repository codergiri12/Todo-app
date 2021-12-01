import { motion } from "framer-motion";
import React from "react";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";

const TodoItem = (props) => {
  const { item, index, updateTodo, removeTodo, completeTodo } = props;


  const update = (mInd,subInd) => {
    updateTodo({ mInd,subInd});
  };
  return (
    <motion.li
      initial={{ x: "150vh", transition: { type: "spring", duration: 2 } }}
      animate={{ x: 0, transition: { type: "spring", duration: 2,delay:0.011 } }}
      whileHover={{
        scale: 0.9,
        transition: { type: "spring", duration: 0.1 },
      }}
      exit={{
        x: "-60vh",
        scale: [1, 0],
        transition: { duration: 0.5 },
        backgroundColor: "rgba(255,0,0,1)",
      }}
      key={item.id}
      className="card"
    >
      <ul className="flex flex-col" >
       <p className="p-2" >  {item.item.title} </p>
        {item.item.subtasks !== undefined &&
          item.item.subtasks.map((obj,id) => (
            <li className="p-2" key={id} >
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={(e)=>{update(index,id)}}
                  disabled={item.completed || item.archived}
                  checked={obj.checked}
                />
                <span className="ml-2">{obj.title}</span>
                <br />
              </label>
            </li>
          ))}
      </ul>
      <p>{item.title} </p>
      <div className="btns">
        {item.completed === false && (
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: "green" }}
            onClick={() => completeTodo(index)}
          >
            <IoCheckmarkDoneSharp />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: "red" }}
          onClick={() => removeTodo({ index: index, id: item.id })}
        >
          {" "}
          <IoClose />
        </motion.button>{" "}
      </div>
      {item.completed && <span className="completed">done</span>}
    </motion.li>
  );
};

export default TodoItem;
