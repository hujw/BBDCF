<template>
  <v-main class="main-content bg-body twoBackgroundImage" :style="{ paddingTop: $route.name === 'index' ? '0px' : '72px' }">
    <v-fade-transition mode="out-in">
      <Nuxt />
    </v-fade-transition>
  </v-main>
</template>

<script>
export default {
  name: 'BaseView'
};
</script>
<style lang="scss" scoped>
/* .main-content {} */
.twoBackgroundImage {
  background-image: url('~/assets/images/biobank/background/backgroundBottom.png'),
    url('~/assets/images/biobank/background/backgroundTop.png');
  background-position: left bottom, right 50px;
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
