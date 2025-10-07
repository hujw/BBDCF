<template>
  <v-app>
    <v-main class="main-content bg-body twoBackgroundImage">
      <v-fade-transition mode="out-in">
        <Nuxt />
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Mobile',
  components: {}
};
</script>
<style lang="scss" scoped>
/* .main-content {} */
.twoBackgroundImage {
  background-image: url('~/assets/images/biobank/background/backgroundBottom.png'),
    url('~/assets/images/biobank/background/backgroundTop.png');
  background-position: left bottom, right 0;
}

.topBackgroundImage {
  background-image: url('~/assets/images/biobank/background/backgroundTop.png');
  background-position: right 50px;
}

.bottomBackgroundImage {
  background-image: url('~/assets/images/biobank/background/backgroundBottom.png');
  background-position: left bottom;
}
</style>
