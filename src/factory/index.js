import Vue from 'vue';

export function list(params) {
  return Vue.http.get('http://bug.js571.com/log/list', params);
}

export default {
  list
};

