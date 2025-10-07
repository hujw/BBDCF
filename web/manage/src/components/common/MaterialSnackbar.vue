<template>
  <v-snackbars class="text-h1" :objects.sync="objects" shaped>
    <template v-slot:action="{ close }">
      <!-- <v-btn
        icon
        dark
        small
        @click="internalValue = false"
      > -->
      <v-icon class="pr-1" @click="close()"> mdi-close </v-icon>
      <!-- </v-btn> -->
    </template>
  </v-snackbars>
</template>

<script>
import VSnackbars from 'v-snackbars';

export default {
  name: 'MaterialSnackbar',

  components: {
    'v-snackbars': VSnackbars
  },

  props: {
    dismissible: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: ''
    },
    value: Boolean
  },

  data() {
    return {
      internalValue: this.value,
      objects: [],
      icon: '',
      content: [],
      color: ''
    };
  },

  watch: {
    internalValue(val, oldVal) {
      if (val === oldVal) return;

      this.$emit('input', val);
    },
    value(val, oldVal) {
      if (val === oldVal) return;

      this.internalValue = val;
    }
  },

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar/showMessage') {
        switch (state.snackbar.color) {
          case 'info':
            this.icon = 'mdi-information';
            break;
          case 'success':
            this.icon = 'mdi-check-circle';
            break;
          case 'warning':
            this.icon = 'mdi-exclamation';
            break;
          case 'error':
            this.icon = 'mdi-alert';
            break;
          default:
            this.icon = 'help-circle-outline';
            break;
        }

        this.objects.push({
          message: state.snackbar.content,
          color: state.snackbar.color,
          right: true,
          bottom: true,
          timeout: 5000
        });
      }
    });
  }
};
</script>
