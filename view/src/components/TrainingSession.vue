<script>
    export default {
        emits: ['markCompleted', 'addToPlan', 'remove'],
        props: ['id', 'title', 'description', 'isCompleted', 'type']
    }
</script>

<template>
    <div class="training-session">
        <i class="fa-solid fa-bars drag-button"></i>
        <div class="training-session-details">
            <p>{{title}}</p>
            <p>{{description}}</p>
        </div>
        <i :class="`fa-solid fa-circle-check action-button${isCompleted ? ' active' : ''}`" @click="() => this.$emit('markCompleted', {id, updatedIsCompleted: !isCompleted})" v-if="type === 'plan'"></i>
        <i class="fa-solid fa-circle-plus action-button" @click="() => this.$emit('addToPlan', {id})" v-else></i>
        <i class="fa-solid fa-trash action-button" @click="() => this.$emit('remove', {id})"></i>
    </div>
</template>

<style>
    .training-session {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0.5em 0.3em;
        background-color: #bdbdbd;
    }

    .training-session-details {
        flex: 1;
    }

    .training-session-details p {
        color: #2c3e50;
    }

    .training-session-details p:first-child {
        font-weight: bold;
    }

    .drag-button {
        font-size: 2rem;
        margin: 0.3em;
        cursor: move;
    }

    .action-button {
        font-size: 1.5rem;
        margin-right: 0.3em;
        cursor: pointer;
    }

    .action-button.active {
        color: green;
    }
</style>