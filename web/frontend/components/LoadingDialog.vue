<template>
  <v-dialog v-model="_dialogVisible" width="500" persistent>
    <v-card class="py-15 px-10 text-center">
      <v-card-title class="justify-center mb-3">
        <h2>{{ title }}</h2>
      </v-card-title>
      <!-- <v-card-text>
        <v-progress-linear indeterminate color="primary"></v-progress-linear>
      </v-card-text> -->
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
    title: {
      type: String,
      required: true
    }
  },
  computed: {
    _dialogVisible: {
      get() {
        return this.dialogVisible;
      },
      set(val) {
        this.dialogClose();
      }
    }
  }
};
</script>
