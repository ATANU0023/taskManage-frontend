<template>
    <div class="login-container">
      <div class="login-box">
        <h2>Login</h2>
        <form @submit.prevent="loginUser">
          <input v-model="email" placeholder="Email" required />
          <input type="password" v-model="password" placeholder="Password" required />
          <button class="login-button" type="submit">Login</button>
        </form>
        <button class="signup-link" @click="goToSignup">Don't have an account? Sign up</button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      ...mapActions(['login']),
      async loginUser() {
        try {
          await this.login({ email: this.email, password: this.password });
          this.$router.push('/todo'); // Redirect to Todo page after login
        } catch (error) {
          console.log('Login failed', error);
        }
      },
      goToSignup() {
        this.$router.push('/signup'); // Redirect to Signup view
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #1e1e2f; /* Dark background color */
  }
  
  .login-box {
    background-color: #2c2c3e; /* Slightly lighter dark background for the box */
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    width: 100%;
    max-width: 400px;
    text-align: center;
  }
  
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  input {
    margin-bottom: 15px;
    padding: 12px;
    font-size: 1rem;
    border: 1px solid #4c4c6b; /* Darker border color */
    border-radius: 5px;
    background-color: #3a3a50; /* Dark background for input fields */
    color: #ffffff; /* Light text color */
    box-sizing: border-box;
    transition: border-color 0.3s ease-in-out;
  }
  
  input::placeholder {
    color: #a8a8b3; /* Lighter placeholder text color */
  }
  
  input:focus {
    border-color: #007bff;
    outline: none;
  }
  
  button {
    padding: 12px;
    font-size: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease-in-out;
  }
  
  .login-button:hover {
    background-color: #0056b3;
  }
  
  .signup-link {
    background: none;
    color: #58a6ff; /* Light blue text color */
    margin-top: 15px;
    text-decoration: underline;
    cursor: pointer;
    border: none;
  }
  
  .signup-link:hover {
    color: #1f6feb; /* Darker blue on hover */
  }
  
  h2 {
    margin-bottom: 1.5rem;
    color: #ffffff; /* Light color for the heading */
  }
  </style>
  