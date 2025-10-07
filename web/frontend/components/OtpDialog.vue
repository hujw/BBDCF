<template>
  <v-dialog v-model="_dialogVisible" width="500" persistent>
    <v-card>
      <v-card-title class="d-flex justify-center py-10 text-16"> 請輸入OTP驗證碼 </v-card-title>

      <v-card-text>
        <!-- <slot /> -->
        <!-- tab -->
        <v-tabs v-model="_tab" background-color="transparent" color="basil" grow @change="changeTab(_tab)">
          <!-- 這裡不能用v-if 否則會有bug -->
          <v-tab v-show="isShowMobile" :disabled="isDisabledMobile"> 手機號碼 </v-tab>
          <!-- 這裡不能用v-if 否則會有bug -->
          <v-tab v-show="isShowEmail" :disabled="isDisabledEmail"> 電子信箱 </v-tab>
        </v-tabs>
        <!-- tab item -->
        <v-tabs-items v-model="_tab">
          <!-- 手機號碼 -->
          <v-tab-item>
            <v-card color="basil" flat>
              <v-card-text>
                <!-- 輸入框 -->
                <v-otp-input v-model="mobileOtpCode" length="6" @input="changeMobileCode(mobileOtpCode)"></v-otp-input>
                <!-- 倒數計時 -->
                <p v-if="setMobileDisabled" class="text-center">有效時間剩餘 {{ countDownNumMobile }} 秒</p>
                <!-- 發送按鈕 -->
                <div class="d-flex justify-center">
                  <Btn
                    color="blueDarken"
                    :btn-name="'發送驗證碼'"
                    :disabled="setMobileDisabled"
                    :loading="setMobileLoading"
                    @click="setOtp(_tab)"
                  />
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <!-- 電子信箱 -->
          <v-tab-item>
            <v-card color="basil" flat>
              <v-card-text>
                <!-- 輸入框 -->
                <v-otp-input v-model="emailOtpCode" length="6" @input="changeEmailCode(emailOtpCode)"></v-otp-input>
                <!-- 倒數計時 -->
                <p v-if="setEmailDisabled" class="text-center">有效時間剩餘 {{ countDownNumEmail }} 秒</p>
                <!-- 發送按鈕 -->
                <div class="d-flex justify-center">
                  <Btn
                    color="blueDarken"
                    :btn-name="'發送驗證碼'"
                    :disabled="setEmailDisabled"
                    :loading="setEmailLoading"
                    @click="setOtp(_tab)"
                  />
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <Btn color="primary" outlined :btn-name="'取消'" :disabled="loading" @click="clickCancel" />
        <Btn color="primary" :loading="loading" :btn-name="'送出'" @click="clickConfirm" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Btn from '@/components/base/Btn';
export default {
  name: 'OtpDialog',
  components: {
    Btn
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    tab: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    },
    setMobileLoading: {
      type: Boolean,
      default: false
    },
    setEmailLoading: {
      type: Boolean,
      default: false
    },
    setMobileDisabled: {
      type: Boolean,
      default: false
    },
    setEmailDisabled: {
      type: Boolean,
      default: false
    },
    countDownNumMobile: {
      type: Number,
      default: 0
    },
    countDownNumEmail: {
      type: Number,
      default: 0
    },
    isDisabledMobile: {
      type: Boolean,
      default: false
    },
    isDisabledEmail: {
      type: Boolean,
      default: false
    },
    isShowMobile: {
      type: Boolean,
      default: false
    },
    isShowEmail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mobileOtpCode: '',
      emailOtpCode: ''
    };
  },
  computed: {
    _dialogVisible: {
      get() {
        return this.dialogVisible;
      },
      set() {
        return this.clickCancel();
      }
    },
    _tab: {
      get() {
        return this.tab;
      },
      set(val) {
        return val;
      }
    }
    // // 判斷用戶所在頁面
    // isShowMobile() {
    //   if (this.$route.path !== '/member/settings'){
    //     return true
    //   } else{
    //     return false
    //   }
    // },
    // // 判斷用戶所在頁面 和 是否有設定email
    // isShowEmail() {
    //   if (this.$store.state.user.userInfo.email || this.$route.path !== '/auth/signUp'){
    //     return true
    //   } else{
    //     return false
    //   }
    // },
  },
  methods: {
    clickConfirm() {
      this.$emit('confirmDialog');
    },
    clickCancel() {
      this.$emit('closeDialog', false);
    },
    // 切換tab
    changeTab(_tab) {
      this.$emit('changeTab', _tab);
    },
    // 發送otp
    setOtp(_tab) {
      this.$emit('setOtp', _tab);
    },
    // mobile驗證碼
    changeMobileCode(code) {
      this.$emit('changeMobileCode', code);
    },
    // email驗證碼
    changeEmailCode(code) {
      this.$emit('changeEmailCode', code);
    }
  }
};
</script>
