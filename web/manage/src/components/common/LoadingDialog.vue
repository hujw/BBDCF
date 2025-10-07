<template>
  <v-dialog v-model="dialogVisible" :retain-focus="false" persistent scrollable max-width="500">
    <v-card class="py-15">
      <h2 class="text-h3 text-center">{{ content }}</h2>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'LoadingDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style scoped></style>
