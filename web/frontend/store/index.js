import { getTokenByApp } from '~/util/auth';

// state
export const state = () => ({});

// getters
export const getters = {};

// actions
export const actions = {
  nuxtServerInit({ dispatch, commit }, { req }) {
    const token = getTokenByApp(this);
    if (token) {
      dispatch('user/saveToken', token);
    }
  }
};
