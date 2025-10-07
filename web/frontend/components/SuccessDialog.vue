<template>
  <v-dialog v-model="_dialogVisible" width="500" persistent>
    <v-card class="d-flex justify-center align-center py-15">
      <v-icon class="text-h4" color="success">mdi-check-circle-outline</v-icon>
      <span class="text-h4 ml-2">{{ title }}</span>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'SuccessDialog',

  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: '送出成功！'
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
