<template>
  <v-btn :color="color" :width="width" v-bind="$attrs" elevation="0" :class="textColor" v-on="$listeners">
    {{ btnName }}
  </v-btn>
</template>

<script>
export default {
  name: 'Btn',

  props: {
    color: {
      type: String,
      default: 'primary'
    },
    btnName: {
      type: String,
      default: '回上一頁'
    },
    width: {
      type: String,
      default: ''
    },
    textColor: {
      type: String,
      default: 'white--text'
    }
  }
};
</script>
