<script>
  import axios from 'axios';
  import LoginForm from './components/LoginForm.vue';
  import LoggedInHeader from './components/LoggedInHeader.vue';
  import TrainingPlan from './components/TrainingPlan.vue';

  export default {
    components: {
      LoginForm,
      LoggedInHeader,
      TrainingPlan
    },
    methods: {
      logIn(email) {
        this.isLoggedIn = true;
        this.email = email;
      },
      logOut() {
        this.isLoggedIn = false;
        this.email = '';
      }
    },
    data() {
      return {
        isLoggedIn: false,
        email: ''
      }
    },
    mounted() {
      axios.get(`${import.meta.env.VITE_APIURL}/users/silentlogin`, { withCredentials: true })
      .then(response => {
        this.isLoggedIn = true
        this.email = response.data.email;
      })
      .catch(() => {});
    }
  }
</script>

<template>
  <LoginForm @loggedIn="logIn" v-if="!isLoggedIn" />
  <LoggedInHeader @loggedOut="logOut" :email="email" v-if="isLoggedIn" />
  <TrainingPlan v-if="isLoggedIn" />
</template>

<style>
  @import './assets/base.css';

  #app {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
  }
</style>
