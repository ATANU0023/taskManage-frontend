import { createStore } from 'vuex';
import axios from 'axios';
import api from '../api';

const store = createStore({
    state: {
        todos: [],
        user: null,
        accessToken: localStorage.getItem('access_token') || null
    },

    mutations: {
        setTodos(state, todos) {
            state.todos = todos;
        },

        setUser(state, user) {
            state.user = user;
        },
        setAccessToken(state, token) {
            state.accessToken = token;
            localStorage.setItem('access_token', token);
        },
        logout(state) {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.user = null;
            localStorage.removeItem('access_token');
        },
        updateTodoStatus(state, { id, completed }) {
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.completed = completed;
            }
        },
        updateTodo(state, updatedTodo) {
            const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
            if (index !== -1) {
                state.todos.splice(index, 1, updatedTodo); // Update the todo in the state
            }
        }
    },

    actions: {
        async fetchTodos({ commit }) {
            const response = await api.get('/todo');
            commit('setTodos', response.data);
        },

        async addTodo({ dispatch }, todoData) {
            await api.post('/todo', todoData);
            dispatch('fetchTodos');
        },

        async toggleComplete({ commit, dispatch }, todo) {
            const newCompletedStatus = !todo.completed;
            await api.patch(`/todo/${todo.id}`, { completed: newCompletedStatus });
            commit('updateTodoStatus', { id: todo.id, completed: newCompletedStatus });
            dispatch('fetchTodos'); // Refresh the todo list to reflect the change
        },

        async deleteTodo({ dispatch }, todoId) {
            await api.delete(`/todo/${todoId}`);
            dispatch('fetchTodos');
        },

        async fetchUser({ commit }) {
            const response = await api.get('/user/profile');
            console.log("user data fetched", response.data);
            commit('setUser', response.data);
        },

        async updateUser({ commit }, userData) {
            const response = await api.patch('/user/update', userData);
            commit('setUser', response.data);
        },

        async login({ commit, dispatch }, credentials) {
            try {
                const response = await api.post('/auth/login', credentials);
                commit('setAccessToken', response.data.access_token);
                await dispatch('fetchUser');
            } catch (error) {
                console.log("login failed", error);
            }
        },

        async signup({ commit }, userData) {
            try {
                const response = await api.post('/auth/signup', userData);
                commit('setAccessToken', response.data.access_token);
                console.log(response);
            } catch (error) {
                console.log('error during signup', error);
            }
        },

        async logout({ commit, state }) {
            try {
                await api.post('/auth/logout', {}, { headers: { Authorization: `Bearer ${state.accessToken}` } });
                commit('logout');
            } catch (error) {
                console.log('Logout failed', error);
            }
        },

        async updateTodo({ dispatch, commit }, updatedTodo) {
            try {
                const response = await api.patch(`/todo/${updatedTodo.id}`, updatedTodo);
                commit('updateTodo', response.data);
                dispatch('fetchTodos');
            } catch (error) {
                console.log("error updating todo:", error);
            }
        },

        async toggleComplete({ commit }, todo) {
            try {
                // Call the function to update the completed status in the database
                const updatedTodo = await api.patch(`/todo/${todo.id}`, { completed: !todo.completed });
                
                // Commit the mutation to update the state
                commit('updateTodo', updatedTodo.data);
            } catch (error) {
                console.error("Error toggling todo completion:", error);
            }
        }
        
    },

    getters: {
        isAuthenticated: state => !!state.accessToken,
        getTodos: state => state.todos,
        getUser: state => state.user
    }
});

export default store;
