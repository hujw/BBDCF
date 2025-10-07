import VuexPersistence from 'vuex-persist';

export default ({ store }) => {
  new VuexPersistence({
    storage: localStorage,
    key: 'bioBank@user',
    reducer(state) {
      return { user: state.user };
    }
  }).plugin(store);
};
