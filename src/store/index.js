import {createStore} from 'vuex';
import axios from 'axios';
import api from '../api'

const store = createStore({
    state:{
        todos:[],
        user: null,
        accessToken: localStorage.getItem('access_token') || null
    },

    mutations:{
        setTodos(state, todos){
            state.todos = todos;
        },

        setUser(state, user){
            state.user = user;
        },
        setAccessToken(state, token){
            state.accessToken = token;
            localStorage.setItem('access_token', token);
        },
        logout(state){
            state.isAuthenticated=false;
            state.accessToken = null;
            state.user = null;
            localStorage.removeItem('access_token');
        },
    },
    actions:{
        async fetchTodos({commit}){
            const response = await api.get('/todo');
            commit('setTodos',response.data);
        },

        async addTodo({ dispatch }, todoData) {
            await api.post('/todo', todoData);
            dispatch('fetchTodos');
        },

          async toggleComplete({ dispatch }, todo) {
            await api.patch(`/todo/${todo.id}`, { completed: !todo.completed });
            dispatch('fetchTodos');
        },

          async deleteTodo({ dispatch }, todoId) {
            await api.delete(`/todo/${todoId}`);
            dispatch('fetchTodos');
        },

        async fetchUser({ commit }) {
            const response = await api.get('/user/profile');
            console.log("user data fetched",response.data);
            commit('setUser', response.data);
        },

        async updateUser({commit},userData){
            const response = await api.patch('/user/update',userData);
            commit('setUser',response.data);
        },

        async login({commit,dispatch}, credentials){
           try {
            const response = await api.post('/auth/login',credentials);
            commit('setAccessToken',response.data.access_token);
            await dispatch('fetchUser');
           } catch (error) {
            console.log("login failed",error)
           }
        },

        async signup({ commit }, userData) {
            try {
                const response = await api.post('/auth/signup',userData);
                commit('setAccessToken',response.data.access_token);
                console.log(response)
            } catch (error) {
                console.log('error during signup',error)
            }
        },
        async logout({ commit,state }) {
            try {
                await api.post('/auth/logout',{},{headers:{Authorization: `Bearer ${state.token}`}});
                commit('setToken',null);
                commit('setUser',null);
            } catch (error) {
                console.log('Logout failed',error);
            }
        },
        
         async updateTodo({dispatch},todo){
            try {
                await api.patch(`/todo/${todo.id}`,{title: todo.title, completed: todo.completed});
                dispatch('fetchTodos');
                } catch (error) {
                    console.log("error updating todo:",error);
                }
        },
        
    },
    getters:{
        isAuthenticated: state => !!state.accessToken,
        getTodos: state => state.todos,
        getUser: state => state.user
    }
    
});

export default store;