import { createRouter, createWebHistory } from "vue-router"
// import homeView from '../views/homeView.vue'
import signInView from '../views/signInView.vue'
import calendarView from '../views/calendarView.vue'
// import addDataView from '../views/addDataView.vue'
import editDataView from '../views/editDataView.vue'
import listDataView from '../views/listDataView.vue'
import listView from '../views/listView.vue'
import diaryView from '../views/diaryView.vue'
import profileView from '../views/profileView.vue'
const routes = [
    // {
    //     path : '/',
    //     name : 'HomeView',
    //     component : homeView
    // },
    {
        path : '/',
        name : 'signIn-view',
        component : signInView
    },
    {
        path : '/calendar',
        name : 'calendar-view',
        component : calendarView
    },
    // {
    //     path : '/add',
    //     name : 'add-view',
    //     component : addDataView
    // },
    {
        path : '/edit',
        name : 'edit-view',
        component : editDataView
    },
    {
        path : '/list',
        name : 'list-view',
        component : listDataView
    },
    {
        path : '/list2',
        name : 'list2-view',
        component : listView
    },
    {
        path : '/diary',
        name : 'diary-view',
        component : diaryView
    },
    {
        path : '/profile',
        name : 'profile-view',
        component : profileView
    }
]
const router = createRouter({
    history:createWebHistory(),
    routes:routes
});
export default router