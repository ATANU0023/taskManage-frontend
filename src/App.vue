<template>
  <div id="app">
    <!-- Conditionally render the Navbar only if the user is authenticated -->
    <Navbar v-if="isAuthenticated" />

    <!-- Router view for displaying the main content -->
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  created() {
    // Check if the user is already authenticated (e.g., by checking if a token is present)
    const token = localStorage.getItem('token');
    if (token) {
      this.$store.dispatch('fetchUser');
      this.$router.push('/todo'); // Redirect to Todos if already logged in
    } else {
      this.$router.push('/login'); // Redirect to login if not authenticated
    }
  },
};
</script>

<style>

</style>
