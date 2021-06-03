import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home';
import Classify from '../views/Classify';
import Shopping from '../views/Shopping';
Vue.use(VueRouter)

const routes = [
    {
        name: "Home",
        path: "/home",
        component: Home,
        children: [
            {
                name: "Classify",
                path: "classify/:id",
                component: Classify,
            },
            {
                name: "Shopping",
                path: "shopping",
                component: Shopping,
            }
        ]
    },
    {
        path: "/search",
        name: "Search",
        component: () => import("@/views/Search")
    },
    {
        path: "/",
        redirect: { name:"Classify"}
    },
    {
        path: "/my",
        name: "My",
        component: () => import("@/views/Search")
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
