import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodos } from "../redux/reducer";
import { GoPlus } from "react-icons/go";
import { motion } from "framer-motion";
import Modal from "./Modal";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
  };
};

const Todos = (props) => {
  const [addTodoModal, setaddTodoModal] = useState(false);

  return (
    <div className="addTodos">
      {addTodoModal&& <Modal set={setaddTodoModal} addTodo={props.addTodo} />}
      <input
        type="text"
        placeholder="Add Todo..."
        onClick={()=>{setaddTodoModal(true);}}
        className="todo-input cursor-pointer"
        value={""}
        readOnly
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="add-btn"
        onClick={()=>{setaddTodoModal(true);}}
      >
        <GoPlus />
      </motion.button>
      <br />
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
