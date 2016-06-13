import Vue from 'vue';

export function list(params) {
  return Vue.http.get('http://bug.js571.com/log/list?appKey=160602efa9cba8ecc4ff0c34ac71cb15054a9d8f3e6b9970df6a3927583cdf5f', params);
}

export default {
  list
};

