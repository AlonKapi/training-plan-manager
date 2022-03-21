<script>
    import draggable from 'vuedraggable'
    import axios from 'axios';
    import TrainingSession from './TrainingSession.vue';

    export default {
        components: {
            TrainingSession,
            draggable
        },
        data() {
            return {
                title: '',
                description: '',
                trainingPlan: [],
                bankSessions: []
            }
        },
        methods: {
            async handleInsertNewPlan() {
                try {
                    const response = await axios.post(`${import.meta.env.VITE_APIURL}/training`, {title: this.title, description: this.description}, { withCredentials: true });
                    this.title = '';
                    this.description = '';
                    this.bankSessions.push(response.data);
                } catch (error) {
                    console.log(error)
                }
            },
            async handleClearTrainingPlan() {
                try {
                    const updatedBankSessions = this.bankSessions.filter(session => session);
                    this.trainingPlan.forEach(session => updatedBankSessions.push(session));

                    const response = await axios.put(`${import.meta.env.VITE_APIURL}/training`, {trainingPlan: [], bankSessions: updatedBankSessions}, { withCredentials: true });
                    this.bankSessions = response.data.bankSessions;
                    this.trainingPlan = response.data.trainingPlan;
                } catch (error) {
                    console.log(error);
                }
            },
            async handleMarkCompleted({id, updatedIsCompleted}) {
                try {
                    const response = await axios.put(`${import.meta.env.VITE_APIURL}/training/${id}`, {isCompleted: updatedIsCompleted}, { withCredentials: true });
                    this.trainingPlan = this.trainingPlan.map(session => {
                        if (session.id === response.data.id) {
                            session.isCompleted = response.data.isCompleted;
                        }

                        return session;
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            async handleAddToPlan({id}) {
                try {
                    const sessionInBank = this.bankSessions.find(session => session.id === id);
                    const updatedTrainingPlan = this.trainingPlan.map(session => session);
                    updatedTrainingPlan.push(sessionInBank);
                    const updatedBankSessions = this.bankSessions.filter(session => session.id !== id);

                    const response = await axios.put(`${import.meta.env.VITE_APIURL}/training`, {trainingPlan: updatedTrainingPlan, bankSessions: updatedBankSessions}, { withCredentials: true });
                    this.bankSessions = response.data.bankSessions;
                    this.trainingPlan = response.data.trainingPlan;
                } catch (error) {
                    console.log(error)
                }
            },
            async handleRemoveFromBank({id}) {
                try {
                    const response = await axios.delete(`${import.meta.env.VITE_APIURL}/training/${id}`, { withCredentials: true });
                    this.bankSessions = this.bankSessions.filter(session => session.id !== response.data.id);
                } catch (error) {
                    console.log(error)
                }
            },
            async handleRemoveFromPlan({id}) {
                try {
                    const sessionInPlan = this.trainingPlan.find(session => session.id === id);
                    const updatedBankSessions = this.bankSessions.map(session => session);
                    updatedBankSessions.push(sessionInPlan);
                    const updatedTrainingPlan = this.trainingPlan.filter(session => session.id !== id);

                    const response = await axios.put(`${import.meta.env.VITE_APIURL}/training`, {trainingPlan: updatedTrainingPlan, bankSessions: updatedBankSessions}, { withCredentials: true });
                    this.bankSessions = response.data.bankSessions;
                    this.trainingPlan = response.data.trainingPlan;
                } catch (error) {
                    console.log(error);
                }
            },
            async handleDragEvent(e) {
                if (e.removed || e.moved) {
                    try {
                        await axios.put(`${import.meta.env.VITE_APIURL}/training`, {trainingPlan: this.trainingPlan, bankSessions: this.bankSessions}, { withCredentials: true });
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        },
        mounted() {
            axios.get(`${import.meta.env.VITE_APIURL}/training`, { withCredentials: true })
            .then((response) => {
                this.trainingPlan = response.data.trainingPlan;
                this.bankSessions = response.data.bankSessions;
            })
        }
    }
</script>

<template>
    <main class="training-data-container">
        <form class="add-training-form" @submit.prevent="handleInsertNewPlan">
            <h3>Add a training session to the bank:</h3>
            <input placeholder="Title" type="text" v-model="title" required/>
            <textarea placeholder="Description" v-model="description" required></textarea>
            <button class="simple-btn">Add to the bank</button>
        </form>
        <div class="training-sessions-container">
            <div class="training-plan-container">
                <div class="training-plan-toolbar">
                    <h4>My training plan:</h4>
                    <button class="simple-btn" @click="handleClearTrainingPlan">Clear training plan</button>
                </div>
                <div class="sessions-list">
                    <draggable
                        class="draggable-list"
                        :list="trainingPlan"
                        itemKey="id"
                        group="sessions"
                        @change="handleDragEvent"
                    >
                        <template #item="{ element }">
                            <TrainingSession 
                                :id="element.id"
                                :title="element.title"
                                :description="element.description"
                                :isCompleted="element.isCompleted" 
                                :type="'plan'"
                                @markCompleted="handleMarkCompleted"
                                @remove="handleRemoveFromPlan"
                            />
                        </template>
                    </draggable>
                </div>
            </div>
            <div class="training-bank-container">
                <h4>Training session bank:</h4>
                <div class="sessions-list">
                    <draggable
                        class="draggable-list"
                        :list="bankSessions"
                        itemKey="id"
                        group="sessions"
                        @change="handleDragEvent"
                    >
                        <template #item="{ element }">
                            <TrainingSession 
                                :id="element.id"
                                :title="element.title"
                                :description="element.description"
                                :isCompleted="element.isCompleted" 
                                :type="'bank'"
                                @addToPlan="handleAddToPlan"
                                @remove="handleRemoveFromBank"
                            />
                        </template>
                    </draggable>
                </div>
            </div>
        </div>
    </main>
</template>

<style>
    .training-data-container {
        min-height: 95vh;
        min-width: 40vw;
        display: flex;
        flex-direction: column;
    }

    .add-training-form {
        display: flex;
        flex-direction: column;
        margin-top: 1em;
    }

    .add-training-form h3 {
        font-size: 1rem;
        margin-bottom: 0.5em;
    }

    .add-training-form input, .add-training-form textarea {
        font-family: sans-serif;
        font-size: 1rem;
        margin-bottom: 0.5em;
    }

    .add-training-form .simple-btn {
        margin: 0 auto;
    }

    .training-sessions-container {
        display: flex;
        margin-top: 1em;
    }

    .training-plan-container, .training-bank-container {
        display: flex;
        flex-direction: column;
        width: 50%;
    }

    .training-plan-toolbar {
        display: flex;
        align-content: center;
        justify-content: space-between;
    }

    .training-plan-toolbar .simple-btn {
        font-size: 0.8rem;
        padding: 0.2em;
        margin-bottom: 0;
    }

    .sessions-list {
        border: 2px solid black;
        min-height: 50px;
    }

    .training-bank-container h4 {
        align-self: center;
    }

    .sessions-list ul {
        list-style: none;
        padding: 0;
    }
</style>