import Vue from 'vue';
import Vuex from 'vuex';
import pathify from '@/plugins/vuex-pathify';

// Global vuex
import AppModule from './app';

import snackbar from './app/snackbar';

Vue.use(Vuex);

/**
 * Main Vuex Store
 */
const store = new Vuex.Store({
  modules: {
    app: AppModule,
    snackbar
  },
  plugins: [pathify.plugin]
});

store.subscribe((mutation) => {
  if (!mutation.type.startsWith('user/')) return;

  store.dispatch('user/update', mutation);
});

// store.dispatch('app/init')

export default store;

export const ROOT_DISPATCH = Object.freeze({ root: true });
