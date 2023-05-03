import { createRouter, createWebHistory } from "vue-router"
// import homeView from '../views/homeView.vue'
import calendarView from '../views/calendarView.vue'
// import addDataView from '../views/addDataView.vue'
import editDataView from '../views/editDataView.vue'
import listDataView from '../views/listDataView.vue'
const routes = [
    // {
    //     path : '/',
    //     name : 'HomeView',
    //     component : homeView
    // },
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
    }
]
const router = createRouter({
    history:createWebHistory(),
    routes:routes
});
export default router