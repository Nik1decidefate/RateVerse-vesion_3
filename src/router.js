import {createRouter, createWebHashHistory} from "vue-router";
import Game from "./components/page/GamesPage.vue";
import Move from "./components/page/MovePage.vue";
import Profil from "./components/page/ProfilPage.vue";
import Registr from "./components/page/Registration.vue";
import Editus from "./components/page/EIUPage.vue";
import InfoUS from "./components/page/InfoUs.vue";
import Setting from "./components/page/SettingsUserPage.vue";
import Auth from "./components/page/Authorization.vue";
import uscontrol from "./components/Admin/UserControl.vue";
import pcontrol from "./components/Admin/ProjectControl.vue";
import project from "./components/page/ProjectPage.vue";
import commentcont from "./components/Moderator/CommentControl.vue";
import notfound from "./components/page/NotFound.vue";

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/game",
            component: Game,
            alias: "/"
        },
        {
            path: "/move",
            component: Move
        },
        {
            path: "/profil",
            component: Profil
        },
        {
            path: "/registration",
            component: Registr
        },
        {
            path: "/authorization",
            component: Auth
        },
        {
            path: "/edit",
            component: Editus
        },
        {
            path: "/info",
            component: InfoUS,
            alias: '/profil'
        },
        {
            path: "/setting",
            component: Setting
        },
        {
            path: "/uscontrol",
            componet: uscontrol
        },
        {
            path: "/projectcontrol",
            component: pcontrol
        },
        {
            path: "/project",
            component: project
        },
        {
            path: "/comments",
            component: commentcont
        },
        {
            path: '/:pathMatch(.*)*',
            component: notfound
        }
    ]
})