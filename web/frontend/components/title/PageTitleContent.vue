<template>
  <v-container>
    <v-row>
      <v-col cols="6" :style="{ borderBottom: '2px solid #B88A77' }">
        <h1 class="text-28 primary--text">{{ title }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3 class="text-22 black--text mb-2">{{ content }}</h3>
        <h3 v-if="content2" class="text-22 black--text">{{ content2 }}</h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PageTitleContent',
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    content2: {
      type: String,
      default: ''
    }
  }
};
</script>
