import "./css/main.css";
import DisplayTodos from "./components/DisplayTodos";
import Todos from "./components/Todos";
import { motion } from "framer-motion";

// -----------------FEATURES INCLUDED IN THIS APP---------------------//
// 1) User can able to create tasks and can add subtasks in it.
// 2) Tasks lists contains 3 types: In Progress, Completed , Archived
// 3) if all subtasks of any particular tasks have been completed then that task will be moved to completed section..
// 4) If completed section contains more than 10 tasks then old tasks start moving to archived section.
// 5) All data is getting stored in localStorage.
// 6) Used Tailwind CSS for styling and framer motion for animation.
// 7) hosted on firebase...
function App() {
  return (
    <div className="App">
      <motion.h1
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        Todo App
      </motion.h1>
      <motion.div
        initial={{ x: 1000 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <Todos />
        <DisplayTodos />
      </motion.div>
    </div>
  );
}

export default App;
