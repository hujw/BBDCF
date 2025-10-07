<template>
  <v-dialog
    v-if="_dialogVisible"
    v-model="_dialogVisible"
    :fullscreen="fullscreen"
    :retain-focus="false"
    persistent
    scrollable
    :max-width="maxWidth"
  >
    <v-card>
      <v-card-title>
        <div class="primary--text">
          {{ title }}
          <!-- <v-btn v-if="isEdit" icon @click="$emit('openEditTitleDialog',true)">
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn> -->
        </div>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation class="black--text">
          <slot />
        </v-form>
      </v-card-text>
      <v-divider v-if="showDivider" />
      <v-card-actions>
        <v-spacer />
        <v-btn v-if="showCloseBtn" :color="closeBtnColor" outlined rounded :disabled="loading" name="close-btn" @click="dialogClose">
          {{ closeBtnName }}
        </v-btn>
        <v-btn
          v-if="showConfirmBtn"
          :color="confirmBtnColor"
          :disabled="(!valid && loading) || (valid && disabled)"
          :loading="loading"
          rounded
          name="confirm-btn"
          @click="dialogConfirm('dialogConfirm')"
        >
          {{ confirmBtnName }}
        </v-btn>
        <v-btn
          v-if="showConfirmBtn2"
          :color="confirmBtnColor2"
          :disabled="!valid && loading"
          :loading="loading"
          rounded
          @click="dialogConfirm('dialogConfirm2')"
        >
          {{ confirmBtnName2 }}
        </v-btn>
        <v-spacer v-if="footerBtnCenter" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    fullscreen: Boolean,
    footerBtnCenter: {
      type: Boolean,
      default: () => false
    },
    dialogVisible: {
      type: Boolean,
      required: true
    },
    maxWidth: {
      type: String,
      default: () => '750px'
    },
    title: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    showCloseBtn: {
      type: Boolean,
      default: () => true
    },
    showConfirmBtn: {
      type: Boolean,
      default: () => true
    },
    showConfirmBtn2: {
      type: Boolean,
      default: () => false
    },
    confirmBtnName: {
      type: String,
      default: () => '確認'
    },
    confirmBtnName2: {
      type: String,
      default: () => '確認2'
    },
    confirmBtnColor: {
      type: String,
      default: () => 'primary'
    },
    confirmBtnColor2: {
      type: String,
      default: () => 'primary'
    },
    closeBtnName: {
      type: String,
      default: () => '取消'
    },
    closeBtnColor: {
      type: String,
      default: () => 'primary'
    },
    showDivider: {
      type: Boolean,
      default: () => true
    },
    useFormValidate: {
      type: Boolean,
      default: () => true
    }
    // isEdit: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      valid: true
    };
  },
  computed: {
    _dialogVisible: {
      get: function () {
        return this.dialogVisible;
      },
      set: function (val) {
        this.dialogClose();
      }
    }
  },
  methods: {
    // 關閉彈窗
    dialogClose() {
      this.$refs.form.resetValidation();
      this.$emit('dialogClose', false);
    },
    // 確認按鈕
    dialogConfirm(confirmName) {
      if (this.useFormValidate) {
        if (!this.$refs.form.validate()) return;
      }

      this.$emit(confirmName, false);
    }
  }
};
</script>

<style scoped></style>
