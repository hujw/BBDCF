<template>
  <v-btn :color="color" block :class="rounded" v-bind="$attrs" elevation="0" v-on="$listeners">
    {{ btnName }}
  </v-btn>
</template>

<script>
export default {
  name: 'BtnLong',

  props: {
    color: {
      type: String,
      default: 'primary'
    },
    btnName: {
      type: String,
      default: '回上一頁'
    },
    rounded: {
      type: String,
      default: 'rounded-lg'
    }
  }
};
</script>
