<script>
    import axios from 'axios';
    
    export default {
        emits: ['loggedIn'],
        data() {
            return {
                email: '',
                password: '',
                isLogin: true,
                hasError: false
            }
        },
        methods: {
            handleSubmit() {
                const apiUrl = this.isLogin ? '/users/login' : '/users/register';
                axios.post(`${import.meta.env.VITE_APIURL + apiUrl}`, {email: this.email, password: this.password}, { withCredentials: true })
                .then(response => {
                    this.$emit('loggedIn', response.data.email);
                })
                .catch(() => {
                    this.hasError = true;
                });
            },
            changeForm() {
                this.isLogin = !this.isLogin;
            }
        }
    }
</script>

<template>
    <form class="login-form" @submit.prevent="handleSubmit">
        <h1>{{ isLogin ? 'Login Form' : 'Registration Form' }}</h1>
        <input placeholder="Email" type="email" v-model="email"/>
        <input placeholder="Password" type="password" v-model="password"/>
        <button class="simple-btn">Submit</button>
    </form>
    <button @click="changeForm" class="simple-btn">{{ isLogin ? 'Change to register form' : 'Change to login form' }}</button>
    <p class="error-message" v-if="hasError">Error with {{ isLogin ? 'login' : 'registration' }}</p>
</template>

<style>
    .login-form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .login-form h1 {
        font-size: 2.5rem;
        padding-bottom: 0.5em;
    }

    .login-form input {
        font-size: 1rem;
        margin-bottom: 0.5em;
    }

    .simple-btn {
        background-color: #bdbdbd;
        border: none;
        font-size: 1rem;
        padding: 0.5em 2em;
        margin-bottom: 0.5em;
        cursor: pointer;
    }
</style>