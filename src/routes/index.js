import { createRouter, createWebHashHistory } from "vue-router"
import Description from "../views/Description.vue"
import Home from "../views/Home.vue"

const routes = [
    {
        name: "Description",
        component: Description,
        path: "/task/:id"
    },
    {
        name: "Home",
        component: Home,
        path: "/"
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
   
})

export default router
