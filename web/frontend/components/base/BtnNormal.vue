<template>
  <v-btn :color="color" width="150px" class="rounded-lg" v-bind="$attrs" elevation="0" v-on="$listeners">
    {{ btnName }}
  </v-btn>
</template>

<script>
export default {
  name: 'BtnNormal',

  props: {
    color: {
      type: String,
      default: 'primary'
    },
    btnName: {
      type: String,
      default: '回上一頁'
    }
  }
};
</script>
