<template>
    <div class="todo-item">
      <input type="checkbox" v-model="todo.completed" @change="toggleComplete(todo)" />
      <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
      <button @click="deleteTodo(todo.id)">Delete</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['todo'],
    methods: {
      toggleComplete(todo) {
        this.$emit('toggle-complete', todo);
      },
      deleteTodo(id) {
        this.$emit('delete-todo', id);
      },
    },
  };
  </script>
  
  <style>
  .completed {
    text-decoration: line-through;
  }
  </style>
  