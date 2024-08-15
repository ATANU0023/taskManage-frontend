<template>
    <!-- Show this nav bar if the user is authenticated -->
    <nav v-if="isAuthenticated" class="navbar">
      <router-link to="/todo" class="nav-link">Todos</router-link>
      <router-link to="/profile" class="nav-link">Profile</router-link>
      <span class="welcome-text">Welcome, {{ userEmail }}!</span>
      <button @click="handleLogout" class="logout-button">Logout</button>
    </nav>
  
    <!-- Show this nav bar if the user is not authenticated -->
    <nav v-else class="navbar">
      <router-link to="/login" class="nav-link">Login</router-link>
      <router-link to="/signup" class="nav-link">Signup</router-link>
    </nav>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['isAuthenticated', 'getUser']),
      userEmail() {
        return this.getUser ? this.getUser.email : ''; // Display user email if available
      }
    },
    methods: {
      ...mapActions(['logout']),
      async handleLogout() {
        try {
          await this.logout();
          localStorage.removeItem('token');
          this.$store.commit('logout');
          this.$router.push('/login'); // Redirect to the login page after logout
        } catch (error) {
          console.log('Logout failed', error);
          alert('Logout failed. Please try again.');
        }
      }
    },
    created() {
      if (this.isAuthenticated) {
        this.$store.dispatch('fetchUser'); // Fetch user details if authenticated
      }
    }
  };
  </script>
  
  <style scoped>
  /* Dark theme styling for navbar */
  .navbar {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: #1e1e2f; /* Dark background color */
    border-bottom: 1px solid #4c4c6b; /* Slightly lighter border color */
  }
  
  .nav-link {
    margin: 0 0.5rem;
    text-decoration: none;
    color: #ffffff; /* Light text color */
    font-weight: bold;
    transition: color 0.3s ease-in-out;
  }
  
  .nav-link:hover {
    color: #007bff; /* Highlight color on hover */
  }
  
  .logout-button {
    background-color: #dc3545; /* Red background for the logout button */
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }
  
  .logout-button:hover {
    background-color: #b02a37; /* Darker red on hover */
  }
  
  .welcome-text {
    margin-left: auto;
    margin-right: 1rem;
    color: #ffffff; /* Light text color */
    font-weight: bold;
  }
  </style>
  