<template>
  <div class="home">
    <TodoList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TodoList from '@/components/TodoList.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    TodoList
  }
});
</script>
