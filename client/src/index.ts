import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from '@/App.vue';
import router from '@/router';

Vue.use(VueCompositionApi);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

window.addEventListener('load', () => {
  new Vue({
    router,
    el: '#app',
    components: {
      App,
    },
    render: (h) => h('app'),
  });
});
