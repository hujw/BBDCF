<template>
  <v-container>
    <v-row>
      <v-col cols="6" :style="{ borderBottom: '2px solid #B88A77' }">
        <h1 class="text-28 primary--text">{{ title }}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PageTitle',
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    }
  }
};
</script>
