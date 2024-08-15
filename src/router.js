
import {createRouter, createWebHistory} from 'vue-router';
import store from './store';
import TodoListView from './views/TodoListView.vue';
import LoginView from './views/LoginView.vue';
import SignupView from './views/SignupView.vue';
import ProfileView from './views/ProfileView.vue';
import LandingView from './views/LandingView.vue';


const routes = [
    {path:'/', redirect:'/login' },

    {path:'/login',name:'Login', component: LoginView},

    {path:'/signup',name:'Signup', component: SignupView},

    { path: '/todo',name:'TodoList', component: TodoListView, meta: { requireAuth: true } },

    { path: '/profile',profile:'Profile', component: ProfileView, meta: { requireAuth: true } },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const authRequiredRoutes = ['todo','profile'];

router.beforeEach((to, from, next)=>{
    const isAuthenticated = !!localStorage.getItem('access_token');
    if(to.matched.some(record=>record.meta.requiresAuth)&& !isAuthenticated && authRequiredRoutes.includes(to.name)){
        if(!store.getters.isAuthenticated){

            next({name:'/login'});
        }
    }else{
        next();
    }
});

export default router;