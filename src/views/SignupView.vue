<template>
    <div class="signup-container">
      <div class="signup-box">
        <h2>Signup</h2>
        <form @submit.prevent="signupUser">
          <input v-model="email" placeholder="Email" required />
          <input v-model="firstName" placeholder="First Name" required />
          <input v-model="lastName" placeholder="Last Name" required />
          <input type="password" v-model="password" placeholder="Password" required />
          <button class="signup-button" type="submit">Signup</button>
        </form>
        <button class="login-link" @click="goToLogin">Already have an account? Login</button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
      };
    },
    methods: {
      ...mapActions(['signup']),
      async signupUser() {
        try {
          await this.signup({
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            password: this.password,
          });
          this.$router.push('/todo'); // Redirect to Todo page after signup
        } catch (error) {
          console.error('Signup failed:', error);
        }
      },
      goToLogin() {
        this.$router.push('/login'); // Redirect to Login view
      },
    },
  };
  </script>
  
  <style scoped>
  .signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #1e1e2f; /* Dark background color */
  }
  
  .signup-box {
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
  
  .signup-button:hover {
    background-color: #0056b3;
  }
  
  .login-link {
    background: none;
    color: #58a6ff; /* Light blue text color */
    margin-top: 15px;
    text-decoration: underline;
    cursor: pointer;
    border: none;
  }
  
  .login-link:hover {
    color: #1f6feb; /* Darker blue on hover */
  }
  
  h2 {
    margin-bottom: 1.5rem;
    color: #ffffff; /* Light color for the heading */
  }
  </style>
  