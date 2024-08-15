<template>
    <div class="profile-container">
      <h2>User Profile</h2>
      <button @click="fetchUserProfile" class="profile-button">
        {{ user ? 'Refresh Profile' : 'Load Profile' }}
      </button>
      
      <div v-if="user" class="profile-details">
        <p><strong>First Name:</strong> {{ user.firstName }}</p>
        <p><strong>Last Name:</strong> {{ user.lastName }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <button @click="editMode = !editMode" class="edit-button">
          {{ editMode ? 'Cancel' : 'Edit Profile' }}
        </button>
    
        <div v-if="editMode" class="edit-form">
          <h3>Edit Profile</h3>
          <form @submit.prevent="updateUserDetails">
            <input v-model="firstName" placeholder="First Name" required class="input-field"/>
            <input v-model="lastName" placeholder="Last Name" required class="input-field"/>
            <input type="password" v-model="password" placeholder="New Password" class="input-field"/>
            <button type="submit" class="save-button">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        editMode: false,
        firstName: '',
        lastName: '',
        password: '', // Added password field
      };
    },
    computed: {
      ...mapGetters(['getUser']),
      user() {
        return this.getUser;
      },
    },
    methods: {
      ...mapActions(['fetchUser', 'updateUser']),
      fetchUserProfile() {
        this.fetchUser().then(() => {
          if (this.user) {
            this.firstName = this.user.firstName;
            this.lastName = this.user.lastName;
          }
        });
      },
      updateUserDetails() {
        const updateData = {
          firstName: this.firstName,
          lastName: this.lastName,
        };
  
        if (this.password) {
          updateData.password = this.password; // Include password only if it's not empty
        }
  
        this.updateUser(updateData);
        this.editMode = false;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Dark theme styling for the profile page */
  .profile-container {
    background-color: #1e1e2f; /* Dark background color */
    padding: 2rem;
    border-radius: 10px;
    color: #ffffff; /* Light text color */
    max-width: 500px;
    margin: 2rem auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  h2 {
    text-align: center;
    color: #ffffff;
  }
  
  .profile-button {
    display: block;
    margin: 1rem auto;
    background-color: #007bff;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }
  
  .profile-button:hover {
    background-color: #0056b3;
  }
  
  .profile-details {
    margin-top: 2rem;
  }
  
  .edit-button {
    display: block;
    margin: 1rem 0;
    background-color: #ffc107;
    color: #212529;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }
  
  .edit-button:hover {
    background-color: #e0a800;
  }
  
  .edit-form {
    background-color: #2c2c3e;
    padding: 1rem;
    border-radius: 5px;
    margin-top: 1rem;
  }
  
  .input-field {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    background-color: #33334a;
    color: #ffffff;
    border: 1px solid #4c4c6b;
    border-radius: 5px;
  }
  
  .save-button {
    width: 100%;
    padding: 0.75rem;
    background-color: #28a745;
    color: white;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }
  
  .save-button:hover {
    background-color: #218838;
  }
  </style>
  