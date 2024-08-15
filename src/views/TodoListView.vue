<template>
    <div class="todo-container">
      <!-- Add Todo Form -->
      <TodoForm @submit-todo="addTodo" />
  
      <!-- List of Todos -->
      <div v-for="todo in todos" :key="todo.id" class="todo-item">
        <div v-if="editingTodo && editingTodo.id === todo.id" class="edit-form">
          <!-- Edit Form -->
          <input v-model="editingTodo.title" placeholder="Edit todo title" />
          <button @click="saveEdit" class="save-button">Save</button>
          <button @click="cancelEdit" class="cancel-button">Cancel</button>
        </div>
        <div v-else>
          <!-- Display Todo Item -->
          <input 
            type="checkbox" 
            :checked="todo.completed" 
            @change="toggleComplete(todo.id)" 
            class="checkbox"
          />
          <span class="todo-title">{{ todo.title }}</span>
          <button @click="startEdit(todo)" class="edit-button">Edit</button>
          <button @click="deleteTodo(todo.id)" class="delete-button">Delete</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  import TodoForm from '../components/TodoForm.vue';
  
  export default {
    components: { TodoForm },
    data() {
      return {
        editingTodo: null, // Track the todo being edited
      };
    },
    computed: {
      ...mapGetters(['getTodos']),
      todos() {
        return this.getTodos;
      },
    },
    methods: {
      ...mapActions(['fetchTodos', 'toggleComplete', 'deleteTodo', 'addTodo', 'updateTodo']),
      
      startEdit(todo) {
        this.editingTodo = { ...todo }; // Copy the todo to be edited
      },
  
      async saveEdit() {
        if (this.editingTodo) {
          await this.updateTodo(this.editingTodo);
          this.editingTodo = null; // Clear the editing state
        }
      },
  
      cancelEdit() {
        this.editingTodo = null; // Clear the editing state
      },
    },
    created() {
      this.fetchTodos();
    },
  };
  </script>
  
  <style scoped>
  .todo-container {
    background-color: #1e1e2f; /* Dark background */
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    max-width: 600px;
    margin: auto;
  }
  
  .todo-item {
    background-color: #2c2c3e; /* Slightly lighter dark background */
    padding: 1rem;
    border-radius: 5px;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
  }
  
  .checkbox {
    margin-right: 1rem;
    cursor: pointer;
  }
  
  .todo-title {
    color: #ffffff; /* Light text color */
    flex-grow: 1;
  }
  
  button {
    margin-left: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }
  
  .edit-button {
    background-color: #007bff;
    color: white;
  }
  
  .edit-button:hover {
    background-color: #0056b3;
  }
  
  .delete-button {
    background-color: #dc3545;
    color: white;
  }
  
  .delete-button:hover {
    background-color: #b02a37;
  }
  
  .edit-form {
    display: flex;
    align-items: center;
  }
  
  .edit-form input {
    margin-right: 0.5rem;
    padding: 0.5rem;
    border: 1px solid #4c4c6b; /* Darker border color */
    border-radius: 5px;
    background-color: #3a3a50; /* Dark background for input fields */
    color: #ffffff; /* Light text color */
    flex-grow: 1;
  }
  
  .save-button {
    background-color: #28a745;
    color: white;
  }
  
  .save-button:hover {
    background-color: #218838;
  }
  
  .cancel-button {
    background-color: #6c757d;
    color: white;
  }
  
  .cancel-button:hover {
    background-color: #5a6268;
  }
  </style>
  