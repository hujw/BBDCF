<template>
  <v-app>
    <base-app-bar />

    <base-view />

    <footer-view />
  </v-app>
</template>

<script>
export default {
  name: 'BaseLayout',
  components: {
    BaseAppBar: () => import('./base/AppBar'),
    BaseView: () => import('./base/View'),
    FooterView: () => import('./base/Footer')
  }
};
</script>
