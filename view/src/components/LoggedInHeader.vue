<script>
    import axios from 'axios';
    
    export default {
        emits: ['loggedOut'],
        methods: {
            handleSignOut() {
                axios.get(`${import.meta.env.VITE_APIURL}/users/logout`, { withCredentials: true })
                .then(() => {
                    this.$emit('loggedOut', {});
                })
                .catch(() => {});
            }
        }
    }
</script>

<template>
    <header class="logged-in-header">
        <h1>NOVOS</h1>
        <div class="details">
            <p>Signed in as boris@gmail.com</p>
            <p>|</p>
            <p class="sign-out" @click="handleSignOut">Sign Out</p>
        </div>
    </header>
</template>

<style>
    .logged-in-header {
        background-color: #bdbdbd;
        height: 5vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .logged-in-header h1 {
        font-size: 1.3rem;
        margin-left: 1em;
    }

    .details {
        display: flex;
    }

    .details p {
        font-size: 1rem;
        padding: 0 0.5em;
    }

    .sign-out {
        margin-right: 1em;
        cursor: pointer;
    }
</style>