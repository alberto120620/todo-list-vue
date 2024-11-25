import { createStore } from 'vuex';

// Define interfaces
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface State {
  todos: Todo[];
}

// Create initial state
const state: State = {
  todos: []
};

export default createStore({
  state,
  mutations: {
    ADD_TODO(state: State, todo: Todo) {
      state.todos.push(todo);
    },
    TOGGLE_TODO(state: State, index: number) {
      if (state.todos[index]) {
        state.todos[index].completed = !state.todos[index].completed;
      }
    },
    REMOVE_TODO(state: State, index: number) {
      state.todos.splice(index, 1);
    }
  },
  actions: {
    addTodo({ commit }, todo: Todo) {
      commit('ADD_TODO', todo);
    },
    toggleTodo({ commit }, index: number) {
      commit('TOGGLE_TODO', index);
    },
    removeTodo({ commit }, index: number) {
      commit('REMOVE_TODO', index);
    }
  },
  getters: {
    allTodos: (state: State): Todo[] => state.todos,
    completedTodos: (state: State): Todo[] =>
        state.todos.filter((todo: Todo) => todo.completed),
    pendingTodos: (state: State): Todo[] =>
        state.todos.filter((todo: Todo) => !todo.completed)
  }
});