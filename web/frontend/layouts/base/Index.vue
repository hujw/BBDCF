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
    BaseAppBar: () => import('./AppBar'),
    BaseView: () => import('./View'),
    FooterView: () => import('./Footer')
  }
};
</script>
