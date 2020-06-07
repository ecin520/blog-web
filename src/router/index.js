import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import ArticleList from "../components/view/ArticleList"
import Article from "../components/view/Article";
import Archive from "../components/view/Archive";
import Categories from "../components/view/Categories";
import Tag from "../components/view/Tag";
import ControlCenter from "../components/create/ControlCenter";
import Self from "../components/about/Self";


import { getToken } from '../utils/auth'
import Toast from "muse-ui-toast";

import store from "../store";

Vue.use(Router)

const router = new Router({
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            redirect: '/article-list',
            children: [
                {
                    path: '/article-list',
                    name: 'ArticleList',
                    component: ArticleList
                },
                {
                    path: '/article/:id',
                    name: 'Article',
                    component: Article
                },
                {
                    path: '/about',
                    name: 'About',
                    component: Self
                },
                {
                    path: '/archive/:name',
                    name: 'Archive',
                    component: Archive
                },
                {
                    path: '/categories/:name',
                    name: 'Categories',
                    component: Categories
                },
                {
                    path: '/tag/:name',
                    name: 'Tag',
                    component: Tag
                }
            ]
        },
        {
            path: '/control-center',
            name: 'ControlCenter',
            component: ControlCenter,
            meta: {
                requireAuth: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {

    if (window._hmt) {
        if (to.path) {
            window._hmt.push(['_trackPageview', '/#' + to.fullPath])
        }
    }

    if (to.matched.some(record => record.meta.requireAuth)) {
        if (store.state.token) {
            next()
        } else {
            Toast.error('请登录')
            next({ path: '/' })
        }
    } else {
        next()
    }
})

export default router