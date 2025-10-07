<template>
  <v-dialog v-model="_dialogVisible" width="500" persistent>
    <v-card class="py-15 px-10 text-center">
      <v-card-title class="justify-center">
        <span class="text-16">{{ accountError }}</span>
        <span class="text-16">{{ title }}</span>
      </v-card-title>

      <v-card-text>
        <span class="text-14 black--text">{{ content }}</span>
      </v-card-text>
      <v-card-actions class="justify-center">
        <BtnNormal :btn-name="'關閉'" @click="dialogClose" />
        <!-- <v-btn width="150px" color="primary" class="rounded-lg" @click="dialogClose">
          關閉
        </v-btn> -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import BtnNormal from '@/components/base/BtnNormal';
export default {
  name: 'AuthDialog',
  components: {
    BtnNormal
  },
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    accountError: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      required: true
    },
    content: {
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
  },
  methods: {
    // 關閉彈窗
    dialogClose() {
      this.$emit('dialogClose', false);
    }
  }
};
</script>
