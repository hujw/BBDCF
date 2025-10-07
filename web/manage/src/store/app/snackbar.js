const state = () => ({
  content: '',
  color: ''
});

const mutations = {
  showMessage(state, payload) {
    state.content = payload.content;
    state.color = payload.color;
  }
};

const actions = {};
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
