<template>
    <form @submit.prevent="submitTodo">
      <input v-model="title" placeholder="Title" required />
      <textarea v-model="content" placeholder="Content" required></textarea>
      <button type="submit">{{ isEditing ? 'Update' : 'Add' }} Todo</button>
    </form>
  </template>
  
  <script>
  export default {
    props: ['initialTodo'],
    data() {
      return {
        title: this.initialTodo ? this.initialTodo.title : '',
        content: this.initialTodo ? this.initialTodo.content : '',
      };
    },
    computed: {
      isEditing() {
        return !!this.initialTodo;
      },
    },
    methods: {
      submitTodo() {
        this.$emit('submit-todo', {
          title: this.title,
          content: this.content,
        });
        this.title = '';
        this.content = '';
      },
    },
  };
  </script>
  