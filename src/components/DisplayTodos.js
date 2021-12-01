import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  setInitial,
  addTodos,
  completeTodos,
  removeTodos,
  updateTodos,
} from "../redux/reducer";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";

const mapStateToProps = (state) => {
  return {
    todos: state.items,
    active:state.active
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInitial: (obj) => dispatch(setInitial(obj)),
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodo: (id) => dispatch(removeTodos(id)),
    updateTodo: (obj) => dispatch(updateTodos(obj)),
    completeTodo: (id) => dispatch(completeTodos(id)),
  };
};


const getLocalData = () =>{
  let lists=localStorage.getItem("mytodolist");
  let active=localStorage.getItem("active");


  if(lists===null || lists===undefined) lists = "[]"; 
  if(active===null || active===undefined) active = "0"; 

  return {active:parseInt(active) ,items:JSON.parse(lists)};
  
}

const DisplayTodos = (props) => {
  useEffect(() => {
    props.setInitial(getLocalData());
  },[]);

  const [sort, setSort] = useState("active");

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(props.todos));
    localStorage.setItem("active", props.active);
  }, [props.todos]);



  return (
    <div className="displaytodos">
      <div className="buttons">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("active")}
          className={`${(sort==="active")?'active':'not_active'}`}
        >
          In Progress
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("completed")}
          className={`${(sort==="completed")?'active':'not_active'}`}
        >
          Completed
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("archived")}
          className={`${(sort==="archived")?'active':'not_active'}`}
        >
          Archived
        </motion.button>
      </div>
      <ul>
        <AnimatePresence>
          {props.todos!==undefined && props.todos.length > 0 && sort === "active"
            ?
              props.todos.map((item,index) => {
                return (
                  item.completed === false && item.archived===false && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      index={index}
                      removeTodo={props.removeTodo}
                      updateTodo={props.updateTodo}
                      completeTodo={props.completeTodo}
                    />
                  )
                );
              })
            
            : null}
          {/* for completed items */}
          {props.todos!==undefined &&props.todos.length > 0 && sort === "completed"
            ? props.todos.map((item,index) => {
                return (
                  item.completed === true && item.archived === false && (
                    <TodoItem
                      key={index}
                      index={index}
                      item={item}
                      removeTodo={props.removeTodo}
                      updateTodo={props.updateTodo}
                      completeTodo={props.completeTodo}
                    />
                  )
                );
              })
            : null}
          {/* for archived items */}
          {props.todos!==undefined && props.todos.length > 0 && sort === "archived"
            ? props.todos.map((item,index) => {
                return (
                  item.archived === true &&
                  (
                    <TodoItem
                    key={index}
                    item={item}
                    index={index}
                    removeTodo={props.removeTodo}
                    updateTodo={props.updateTodo}
                    completeTodo={props.completeTodo}
                  />
                  )
                );
              })
            : null}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);
