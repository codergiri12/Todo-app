import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: 0,
  items: [],
};

const addTodoReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setInitial: (state,action)=>{
      return {
        ...action.payload
      };
    },
    addTodos: (state, action) => {
      state.items.unshift(action.payload);
      return state;
    },
    //remove todos
    removeTodos: (state, action) => {
      let x = state.active;
      if (
        state.items[action.payload.index].completed === true &&
        state.items[action.payload.index].archived === false
      ) {
        x -= 1;
      }
      return {
        active: x,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    },
    //completed
    completeTodos: (state, action) => {
      state.items[action.payload].item.subtasks.map(it=>{it.checked = true;})

      state.items[action.payload].completed = true;
      state.items[action.payload].archived = false;

      state.active++;
      if (state.active > 10) {
        state.active--;
        for (let i = state.items.length - 1; i >= 0; i--) {
          if (
            state.items[i].completed === true &&
            state.items[i].archived === false
          ) {
            state.items[i].archived = true;
            break;
          }
        }
      }

      return state;
    },

    //update todos
    updateTodos: (state, action) => {
      const {mInd,subInd} = action.payload;
      state.items[mInd].item.subtasks[subInd].checked = !state.items[mInd].item.subtasks[subInd].checked;

      let l = state.items[mInd].item.subtasks.length , cnt=0;

      state.items[mInd].item.subtasks.map(it=>{cnt+=(it.checked);})
      if(l===cnt){
        state.items[mInd].completed = true;
        state.items[mInd].archived = false;

        state.active++;
        if (state.active > 10) {
          state.active--;
          for (let i = state.items.length - 1; i >= 0; i--) {
            if (
              state.items[i].completed === true &&
              state.items[i].archived === false
            ) {
              state.items[i].archived = true;
              break;
            }
          }
        }
      }
      return state;
    },
  },
});

export const { setInitial,addTodos, removeTodos, updateTodos, completeTodos } =
  addTodoReducer.actions;
export const reducer = addTodoReducer.reducer;
