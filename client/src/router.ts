import axios from 'axios';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requireLogin: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (to.meta && to.meta.requireLogin && !user) {
      next({ name: 'login' });
      return;
    }

    if (to.meta && to.name === 'login' && user) {
      const idToken = await user.getIdToken().catch((e) => {
        return null;
      });

      if (!idToken) {
        next({ name: 'login' });
        return;
      }

      const response = await axios({
        url: '/login',
        method: 'POST',
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
      }).catch((e) => {
        return null;
      });

      if (!response) {
        next({ name: 'login' });
        return;
      }

      next({ name: 'home' });
      return;
    }

    next();
  });
});

export default router;
