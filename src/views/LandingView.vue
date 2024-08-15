
<template>
    <div>
      <h1>Welcome to the Todo App</h1>
      <p>Please log in or sign up to continue.</p>
      <div>
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Signup</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LandingView',
  };
  </script>
  
  <style scoped>
  /* Basic styling for the landing page */
  div {
    text-align: center;
    margin-top: 2rem;
  }
  
  a {
    margin: 0 1rem;
    text-decoration: none;
    color: #007bff;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  