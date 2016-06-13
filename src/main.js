import Vue from 'vue';
import Router from 'vue-router';
import VueAsyncData from 'vue-async-data';
import VueResource from 'vue-resource';

import app from './App';
import index from './index';
import {date} from './filters';
Vue.use(VueResource);

init();

function init() {
// use globally
// you can also just use `VueAsyncData.mixin` where needed
  Vue.use(VueAsyncData);
  Vue.use(Router);
  Vue.filter('date', date);

  Vue.http.options.emulateJSON = false;
// custom router
  // {history: true, hashbang: false}
  var $router = new Router({history: true});
  $router.mode = 'html5';
  $router.map({
    '/': {
      name: 'index',
      component: index
    }
  });

  $router.beforeEach(function () {

  });

  $router.start(app, 'app');
}

