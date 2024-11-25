<template>
  <div class="todo-container">
    <h1>{{ title }}</h1>

    <div class="add-todo">
      <input
          v-model="newTodo"
          @keyup.enter="addTodo"
          placeholder="Agregar nueva tarea"
          class="todo-input"
      >
      <button @click="addTodo" class="add-button">Agregar</button>
    </div>

    <ul class="todo-list">
      <li v-for="(todo, index) in todos"
          :key="todo.id"
          :class="{ completed: todo.completed }"
          class="todo-item">
        <input
            type="checkbox"
            v-model="todo.completed"
            class="todo-checkbox"
        >
        <span class="todo-text">{{ todo.text }}</span>
        <button
            @click="removeTodo(index)"
            class="delete-button"
        >
          Eliminar
        </button>
      </li>
    </ul>

    <div class="todo-stats">
      <p>Total de tareas: {{ todos.length }}</p>
      <p>Completadas: {{ completedTodos.length }}</p>
      <p>Pendientes: {{ pendingTodos.length }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default defineComponent({
  name: 'TodoList',
  setup() {
    const store = useStore();
    const title = ref('Mi Lista de Tareas');
    const newTodo = ref('');

    const todos = computed(() => store.getters.allTodos);
    const completedTodos = computed(() => store.getters.completedTodos);
    const pendingTodos = computed(() => store.getters.pendingTodos);

    const addTodo = () => {
      if (newTodo.value.trim()) {
        const todo: Todo = {
          id: Date.now(),
          text: newTodo.value,
          completed: false
        };
        store.dispatch('addTodo', todo);
        newTodo.value = '';
      }
    };

    const removeTodo = (index: number) => {
      store.dispatch('removeTodo', index);
    };

    return {
      title,
      newTodo,
      todos,
      completedTodos,
      pendingTodos,
      addTodo,
      removeTodo
    };
  }
});
</script>

<style scoped lang="scss">
.todo-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    text-align: center;
    color: #2c3e50;
  }
}

.add-todo {
  display: flex;
  margin-bottom: 20px;

  .todo-input {
    flex: 1;
    padding: 8px;
    margin-right: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .add-button {
    padding: 8px 16px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #3aa876;
    }
  }
}

.todo-list {
  list-style: none;
  padding: 0;

  .todo-item {
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 8px;
    background-color: #f8f9fa;
    border-radius: 4px;

    &.completed .todo-text {
      text-decoration: line-through;
      color: #6c757d;
    }

    .todo-checkbox {
      margin-right: 10px;
    }

    .todo-text {
      flex: 1;
    }

    .delete-button {
      padding: 4px 8px;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #c82333;
      }
    }
  }
}

.todo-stats {
  margin-top: 20px;
  padding: 15px;
  background-color: #e9ecef;
  border-radius: 4px;

  p {
    margin: 5px 0;
    color: #495057;
  }
}
</style>